# Cours Kotlin : Délégation de Propriétés avec `lazy` et `observable`

---

## Introduction à la Délégation de Propriétés en Kotlin

La délégation de propriétés est un mécanisme puissant qui permet de **déléguer la gestion des accesseurs (`get`/`set`) d’une propriété à un autre objet**. Cela offre plusieurs avantages :

- **Réduction du code boilerplate** : éviter d’écrire à chaque fois des getters/setters similaires.

- **Ajout de comportements transversaux** : logging, validation, synchronisation, lazy initialization, etc.

- **Implémentation simple de patterns complexes** (ex. `lazy`, observable, vetoable).

---

## 1. Délégation personnalisée - sans interface

### Principe

Pour créer un délégat personnalisé, il faut définir une classe qui implémente les opérateurs suivants :

- `operator fun getValue(thisRef: R, property: KProperty<*>): T` pour les propriétés en lecture (val ou var).

- `operator fun setValue(thisRef: R, property: KProperty<*>, value: T)` pour les propriétés mutables (var).

---

### Paramètres importants

- `thisRef` : instance de la classe propriétaire de la propriété (le récepteur).

- `property` : métadonnées sur la propriété (nom, type, annotations).

- `value` (dans `setValue`) : nouvelle valeur assignée.

```kotlin
// value est un attribut !
class LoggerDelegate<T>(private var value: T) {

    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        println("Accès à la propriété '${property.name}' avec la valeur : $value")
        return value
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: T) {
        println("Modification de la propriété '${property.name}': $value → $newValue")
        value = newValue
    }
}

class User {
    var name: String by LoggerDelegate("")
    var age: Int by LoggerDelegate(0)
}

fun main() {
    val user = User()
    user.name = "Alice"  
// Affiche : Modification de la propriété 'name': → Alice
    user.age = 30       
 // Affiche : Modification de la propriété 'age': 0 → 30
    println(user.name)   
// Affiche : Accès à la propriété 'name' avec la valeur : Alice                         
// Puis affiche : Alice
}

```

## Utilisations courantes

- **Lazy initialization** : initialiser une valeur uniquement au premier accès.

- **Validation** : vérifier une valeur avant l’assignation.

- **Logging** : tracer les accès et modifications.

- **Observable** : notifier un changement.

---

### Syntaxe d’usage

```kotlin
class MyClass {
    var prop: Type by DelegateClass()
}
```

Lors de l’accès ou la modification de `prop`, Kotlin appelle respectivement `getValue` et `setValue` du délégat `DelegateClass`.

---

### Exemple 2 : Délégation personnalisée `EffectiveDate` - avec interface

### Objectif

Stocker une propriété `MyDate` mais uniquement sous forme de timestamp (long), en utilisant la délégation.

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int)

fun MyDate.toMillis(): Long {
    val c = java.util.Calendar.getInstance()
    c.set(year, month, dayOfMonth)
    return c.timeInMillis
}

fun Long.toDate(): MyDate {
    val c = java.util.Calendar.getInstance()
    c.timeInMillis = this
    return MyDate(c.get(java.util.Calendar.YEAR), c.get(java.util.Calendar.MONTH), c.get(java.util.Calendar.DATE))
}

```

### Délégué :

```kotlin
class EffectiveDate<R> : ReadWriteProperty<R, MyDate> {
    private var timeInMillis: Long? = null

    override fun getValue(thisRef: R, property: KProperty<*>): MyDate {
        return timeInMillis?.toDate() ?: error("Propriété non initialisée")
    }

    override fun setValue(thisRef: R, property: KProperty<*>, value: MyDate) {
        timeInMillis = value.toMillis()
    }
}

```

- `R` → le type de l’objet qui possède la propriété (ex : `D`)

- `T` → le type de la propriété (ex : `MyDate`)

```kotlin
class D {
    var date: MyDate by EffectiveDate()
}

fun main() {
    val d = D()
    d.date = MyDate(2023, 7, 22)
    println(d.date)  // affiche MyDate(year=2023, month=7, dayOfMonth=22)
}
```

- **Modification `d.date = ...` → convertit `MyDate` → `Long` stocké.**

- **Accès `d.date` → convertit `Long` → `MyDate` retourné.**

À l’appel de `setValue` :

- `thisRef` vaut `d` (l’instance `D`)

- `property` décrit la propriété `date` (nom, type...)

- `value` vaut `MyDate(2025, 7, 15)`, la nouvelle valeur assignée à `date`

---

## `ReadWriteProperty<R, MyDate>` — Définition

C’est **une interface Kotlin générique** qui représente un **délégué de propriété mutable** (donc avec `getValue` **et** `setValue`).

Elle est définie comme ceci :

```kotlin
interface ReadWriteProperty<in R, T> {
    operator fun getValue(thisRef: R, property: KProperty<*>): T
    operator fun setValue(thisRef: R, property: KProperty<*>, value: T)
}
```

### Paramètres génériques

- `R` : le **type du propriétaire de la propriété** (ex : une classe comme `D`)

- `T` : le **type de la propriété** déléguée (ex : `MyDate`)

Donc :

```kotlin
ReadWriteProperty<R, MyDate>
```

- "Je suis un délégué capable de gérer une propriété de type `MyDate` qui appartient à un objet de type `R`."

---

## `ReadOnlyProperty<R, T>` — Définition

C’est **une interface Kotlin générique** qui représente un **délégué de propriété en lecture seule** (donc avec uniquement `getValue`, utilisable avec `val`).

Elle est définie comme ceci :

```kotlin
interface ReadOnlyProperty<in R, out T> {
    operator fun getValue(thisRef: R, property: KProperty<*>): T
}
```

### Paramètres génériques

- `R` : le **type du propriétaire de la propriété** (par ex. une classe comme `User`, `D`, etc.)

- `T` : le **type de la propriété déléguée** (ex : `String`, `Int`, `MyDate`, etc.)

Donc : 

```kotlin
ReadOnlyProperty<R, String>
```

- "Je suis un délégué qui fournit la valeur d’une propriété de type `String` appartenant à un objet de type `R`, mais je ne la modifie pas."

### Exemple

```kotlin
import kotlin.properties.ReadOnlyProperty
import kotlin.reflect.KProperty

class ConstantDelegate<T>(private val value: T) : ReadOnlyProperty<Any?, T> {
    override fun getValue(thisRef: Any?, property: KProperty<*>): T {
        println("Lecture de '${property.name}'")
        return value
    }
}

class Config {
    val version: String by ConstantDelegate("1.0.0")
}

fun main() {
    val c = Config()
    println(c.version) // Affiche "Lecture de 'version'" puis "1.0.0"
}

```

### Utilisation

- Pour encapsuler un comportement de **calcul à la volée**, **cache**, **valeurs constantes**, ou **accès à des données** sans mutation.

- Compatible uniquement avec `val`. Pour `var`, utilisez `ReadWriteProperty`.

---

### Kotlin autorise deux façons d’écrire un délégué :

1. **Implémenter une interface standard** :
   
   - `ReadOnlyProperty<R, T>` → si la propriété est en `val`
   
   - `ReadWriteProperty<R, T>` → si la propriété est en `var`

2. **Fournir directement deux fonctions opérateurs** :
   
   - `operator fun getValue(...)`
   
   - `operator fun setValue(...)`

**C’est ce que fait `LoggerDelegate`** : il fournit **directement** les deux opérateurs, sans implémenter d'interface.

Contrairement à **`EffectiveDate`** qui implémente l'interface de `ReadWriteProperty.`

Si tu veux un **délégué réutilisable dans plusieurs classes avec un typage fort**, alors **implémenter l'interface** est plus adapté.

---



## 2. Délégation `lazy` : Initialisation Paresseuse

### Principe

L'initialisation **paresseuse** (lazy initialization) diffère le calcul d'une valeur jusqu'à son premier accès. Idéal pour :

- Opérations coûteuses

- Valeurs non systématiquement utilisées

- Initialisation de ressources lourdes

### Syntaxe de Base

```kotlin
val propertyName: Type by lazy {
    // Calcul de la valeur initiale
    initialValue
}
```

### Exemple Pratique

```kotlin
fun checkAppServer(): Boolean {
    println("Performing application server health check...")
    return true
}

fun main() {
    val isAppServerHealthy by lazy { checkAppServer() }

    println("Début du programme")
    if (isAppServerHealthy) { // L'initialisation se fait ici
        println("Server healthy")
    }
    println(isAppServerHealthy)
}
```

```kotlin
Début du programme
Performing application server health check...
Server healthy
true
```

**Explication :**

- `isAppServerHealthy` est une propriété `lazy`. Sa valeur est calculée uniquement à la première lecture.

- La première fois qu’on accède à `isAppServerHealthy` (dans le `if`), la fonction `checkAppServer()` est appelée, ce qui affiche le message et retourne `true`.

- La valeur `true` est alors mémorisée.

- Lors du deuxième accès (`println(isAppServerHealthy)`), la valeur mémorisée est renvoyée sans réexécuter la fonction, donc aucun message supplémentaire.

C’est pourquoi le texte "Performing application server health check..." ne s’affiche qu’une fois.

### Exemple sans retour

```kotlin
fun sideEffect() {
    println("Action exécutée")
}

fun main() {
    val trigger by lazy { sideEffect() }

    println("Début du programme")

    trigger  // Premier accès, exécute sideEffect()
    trigger  // Second accès, ne réexécute pas sideEffect()
}
```

```kotlin
Début du programme
Action exécutée
```

**Explication :**

- `sideEffect()` s’exécute une seule fois au premier accès à `trigger`.

- L’accès suivant ne déclenche rien car la valeur est déjà initialisée (ici c’est `Unit`).

- La valeur de `trigger` est en fait `Unit` (type vide), on utilise juste l’initialisation différée pour l’effet.

### Comportement Clé

- **Thread-safe** par défaut

- **Calcul unique** : la valeur est calculée une seule fois

- **Paresseux** : pas d'initialisation avant le premier accès

---

## 3. Délégation `observable` : Observation des Changements

### Principe

Permet d'exécuter du code à chaque modification d'une propriété. Idéal pour :

- Validation de données

- Notifications de changement

- Journalisation (logging)

### Syntaxe de Base

```kotlin
import kotlin.properties.Delegates

var propertyName: Type by observable(initialValue) { 
    prop, old, new ->
    // Code exécuté à chaque modification
}
```

- `propertyName` est une propriété déléguée à `observable`.

- `initialValue` est la valeur initiale de la propriété.

- À chaque modification de la propriété (`setter`), la lambda fournie est appelée.

- Cette lambda reçoit :
  
  - `prop` : la propriété modifiée (son métadonnée, nom, etc.),
  
  - `old` : l'ancienne valeur,
  
  - `new` : la nouvelle valeur.

- Le code dans la lambda s’exécute automatiquement à chaque mise à jour, ce qui permet par exemple d’ajouter des logs, déclencher des validations, ou mettre à jour une UI.

### Exemple Complet

```kotlin
class Budget(val totalBudget: Int) {
    var remainingBudget: Int by observable(totalBudget) { _, oldValue, newValue ->
        when {
            newValue < totalBudget * 0.2 -> 
                println("Warning: Budget bas ($newValue)")

            newValue > oldValue -> 
                println("Budget augmenté: $oldValue → $newValue")

            newValue < oldValue -> 
                println("Budget diminué: $oldValue → $newValue")
        }
    }
}

fun main() {
    val budget = Budget(1000)
    budget.remainingBudget = 800  // Budget diminué: 1000 → 800
    budget.remainingBudget = 300  // Budget diminué: 800 → 300
    budget.remainingBudget = 150  // Warning: Budget bas (150)
    budget.remainingBudget = 200  // Budget augmenté: 150 → 200
}
```

- La classe `Budget` possède une propriété `remainingBudget` observable initialisée à `totalBudget`.

- À chaque modification de `remainingBudget`, la lambda de l’observable est appelée avec l’ancienne et la nouvelle valeur.

- La lambda vérifie :
  
  - Si le budget est inférieur à 20 % du total, affiche un avertissement.
  
  - Si le budget augmente par rapport à avant, affiche un message d’augmentation.
  
  - Si le budget diminue, affiche un message de diminution.

- Dans `main()`, on modifie `remainingBudget` plusieurs fois.

- Chaque modification déclenche l’affichage d’un message pertinent.

### Comportement Clé

- Appelé **après** la modification de la valeur

- Accès à l'ancienne et nouvelle valeur

- Idéal pour du code réactif

---

## Résumé :

| Aspect                    | `lazy`                                                       | `observable`                                                               |
| ------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Type de propriété         | `val` (lecture seule)                                        | `var` (modifiable)                                                         |
| Fonctions générées        | Getter uniquement (`getValue()`)                             | Getter et Setter (`getValue()` et `setValue()`)                            |
| Initialisation            | Retardée : valeur calculée au premier accès                  | Valeur initiale définie immédiatement, notifications à chaque modification |
| Utilité principale        | Optimiser ressources, différer calcul coûteux                | Réagir aux changements de valeur (logging, validation, UI…)                |
| Syntaxe                   | `val prop by lazy { ... }`                                   | `var prop by Delegates.observable(initialValue) { _, old, new -> ... }`    |
| Exécution du code associé | Une seule fois au premier accès                              | À chaque modification de la propriété                                      |
| Thread-safety             | Oui, par défaut                                              | Pas garanti (doit être géré manuellement si besoin)                        |
| Exemple d’usage           | Initialiser une connexion à une base de données à la demande | Afficher un message quand une variable change                              |
| Mécanisme sous-jacent     | Stocke la valeur après calcul                                | Appelle la lambda dans le setter à chaque nouvelle valeur                  |

**Résumé** :

- `lazy` crée un **getter** avec initialisation différée.

- `observable` crée un **getter et setter** qui exécute une action à chaque modification.
