# Cours Kotlin : Délégation de Propriétés avec `lazy` et `observable`

## Introduction à la Délégation de Propriétés

La délégation de propriétés est un mécanisme puissant en Kotlin qui permet de déléguer la gestion des getters/setters à un autre objet. Cela permet :

- De réduire le code boilerplate

- D'ajouter des comportements transversaux (logging, validation, etc.)

- De mettre en œuvre des motifs comme l'initialisation paresseuse

## 1. Délégation Personnalisée

### Principe

Créez vos propres délégats en implémentant les opérateurs :

- `getValue()` pour les propriétés en lecture seule (`val`)

- `setValue()` pour les propriétés mutables (`var`)

### Exemple : Logger de Propriété

```kotlin
class LoggerDelegate<T>(private var value: T) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        println("Accès à ${property.name} = $value")
        return value
    }
    
    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: T) {
        println("Modification de ${property.name}: $value → $newValue")
        value = newValue
    }
}

class User {
    var name: String by LoggerDelegate("")
    var age: Int by LoggerDelegate(0)
}

fun main() {
    val user = User()
    user.name = "Alice"  // Modification de name:  → Alice
    user.age = 30        // Modification de age: 0 → 30
    println(user.name)   // Accès à name = Alice \n Alice
}
```

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


