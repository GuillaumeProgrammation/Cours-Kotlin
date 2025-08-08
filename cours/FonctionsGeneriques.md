# Cours : Fonctions Génériques (Polymorphiques) en Kotlin

## Introduction

Les **fonctions génériques** permettent d'écrire du code qui fonctionne avec **plusieurs types différents** tout en conservant la **sécurité de type**. Au lieu d'écrire une fonction pour chaque type, on écrit une fonction "paramétrable" par type.

---

## Syntaxe de base

### Déclaration simple

```kotlin
fun <T> identite(valeur: T): T {
    return valeur
}

// Utilisation
val nombre = identite(42)        // T = Int
val texte = identite("Hello")    // T = String
val liste = identite(listOf(1, 2, 3)) // T = List<Int>
```

- `<T>` = **paramètre de type** (nom libre, souvent `T`, `R`, `K`, `V`…). 

- `<T>` : signifie, je déclare un type que je nomme `T`.

- `T` peut représenter n'importe quel type (`Int`, `String`, `MyDate`, etc.).

- L'appel `identite(42)` va déduire que `T` = `Int`.

### Paramètres de type multiples

```kotlin
fun <K, V> creerPaire(cle: K, valeur: V): Pair<K, V> {
    return Pair(cle, valeur)
}

// Utilisation
val paire1 = creerPaire("nom", "Alice")     // Pair<String, String>
val paire2 = creerPaire(1, "premier")       // Pair<Int, String>
val paire3 = creerPaire("age", 25)          // Pair<String, Int>
```

- `K` et `V` sont indépendants. Cela déclare des types K et V, que je peux utiliser comme types dans ma fonction

- L’appel `paire("Nom", 42)` donne un `Pair<String, Int>`.

---

## Contraintes de type

### Contrainte simple avec `:`

```kotlin
fun <T : Number> additionner(a: T, b: T): Double {
    return a.toDouble() + b.toDouble()
}

// Utilisation valide
val resultat1 = additionner(5, 10)           // Int : Number 
val resultat2 = additionner(3.14, 2.71)     // Double : Number val resultat3 = additionner(5L, 10L)        // Long : Number // Erreur de compilation
// val erreur = additionner("5", "10")       // String ≠ Number 
```

- `T : Number` signifie que `T` doit être un sous-type de `Number`.

- Tu ne peux pas appeler `addition("abc", "def")`, car `String` ne dérive pas de `Number`.

### Contraintes multiples avec `where`

```kotlin
fun <T> afficherInfo(obj: T) where T : CharSequence, T : Appendable {
    println("Longueur: ${obj.length}")
    obj.append(" [traité]")
}

// StringBuilder implémente CharSequence ET Appendable
val sb = StringBuilder("Hello")
afficherInfo(sb)  // 
// String implémente CharSequence mais PAS Appendable
// afficherInfo("Hello")  // Erreur de compilation
```

- `T` doit être **à la fois** un `CharSequence` **et** un `Appendable`.

---

## Fonctions d'extension génériques

### Extension sur types génériques

On peut combiner **généricité** + **extension** :

```kotlin
fun <T> List<T>.premierOuDefaut(defaut: T): T {
    return if (isEmpty()) defaut else first()
}

// Utilisation
val nombres = listOf(1, 2, 3)
val vide = emptyList<String>()

println(nombres.premierOuDefaut(0))      // 1
println(vide.premierOuDefaut("aucun"))   // "aucun"
```

### Extension avec transformation de type

```kotlin
fun <T, R> List<T>.mapperSiNonNull(transform: (T) -> R?): List<R> {
    val resultat = mutableListOf<R>()
    for (element in this) {
        val transformed = transform(element)
        if (transformed != null) {
            resultat.add(transformed)
        }
    }
    return resultat
}

// Utilisation
val textes = listOf("1", "abc", "2", "def", "3")
val nombres = textes.mapperSiNonNull { it.toIntOrNull() }
println(nombres) // [1, 2, 3]
```

---

### Fonction de tri générique personnalisée

```kotlin
fun <T> List<T>.trierPar(selector: (T) -> Comparable<*>): List<T> {
    return this.sortedBy(selector)
}

data class Personne(val nom: String, val age: Int)

val personnes = listOf(
    Personne("Alice", 25),
    Personne("Bob", 30),
    Personne("Charlie", 20)
)

val parAge = personnes.trierPar { it.age }
val parNom = personnes.trierPar { it.nom }
```

- `Comparable<T>` est une interface qui permet de comparer des objets.

- `selector` est une fonction de type `<T>` et renvoie un objet qui implémente l'interface Comparable. 
  
  - exemple : Int, String...
  
  - Cela signifie que la valeur renvoyée par `selector` peut être comparée (triée) selon l’ordre naturel défini par `Comparable`.

---

## Qu'est-ce que `Comparable` ?

`Comparable<T>` est une interface qui permet de comparer des objets de type `T` :

```kotlin
interface Comparable<T> {
    fun compareTo(other: T): Int
}
```

Cette méthode doit retourner :

- un entier négatif si l’objet courant est « inférieur » à `other`,

- zéro s’ils sont « égaux »,

- un entier positif si l’objet courant est « supérieur » à `other`.

```kotlin
// Exemple d'implémentation
class Age(val valeur: Int) : Comparable<Age> {
    override fun compareTo(other: Age): Int {
        return this.valeur.compareTo(other.valeur)
    }
}
```

- `Comparable<Age>` signifie que la classe `Age` peut être comparée avec une autre instance d’`Age`, grâce à la méthode `compareTo` que nous avons définie (car la classe `Age` implémente l'interface `Comparable`).

---

## Le problème sans `*`

```kotlin
fun trier(liste: List<Any>) {
    // Comment faire ? Any n'implémente pas Comparable
    // liste.sortedBy { ??? }
}
```

Si on essaie `Comparable<Any>`, ça ne marche pas car :

- `String` implémente `Comparable<String>` (pas `Comparable<Any>`)
- `Int` implémente `Comparable<Int>` (pas `Comparable<Any>`)

---

## La solution : `Comparable<*>`

`Comparable<*>` signifie : **"Comparable de quelque chose"**

```kotlin
fun <T> List<T>.trierPar(selector: (T) -> Comparable<*>): List<T> {
    return this.sortedBy(selector)
}

data class Personne(val nom: String, val age: Int)

val personnes = listOf(
    Personne("Alice", 25),
    Personne("Bob", 30),
    Personne("Charlie", 20)
)

// Ça marche !
val parAge = personnes.trierPar { it.age }        // Int : Comparable<Int>
val parNom = personnes.trierPar { it.nom }        // String : Comparable<String>
```

## Comparaison des approches

```kotlin
// Trop restrictif
fun tri1(selector: (T) -> Comparable<String>) {
    // Marche seulement avec String
}

// possible
fun tri2(selector: (T) -> Comparable<Any>) {
    // String n'implémente pas Comparable<Any>
}

// Parfait !
fun tri3(selector: (T) -> Comparable<*>) {
    // Marche avec tout ce qui implémente Comparable<quelque_chose>
}
```

---

## Qu'est-ce que `*` représente ?

`*` est une **projection étoile** qui signifie :

- **"Je ne sais pas quel est le type exact"**
- **"Mais je sais que c'est un Comparable de quelque chose"**

```kotlin
val nombre: Comparable<*> = 42           // 42 est Comparable<Int>
val texte: Comparable<*> = "Hello"       // "Hello" est Comparable<String>

// Je peux les traiter de manière uniforme
println(nombre.javaClass)  // class java.lang.Integer
println(texte.javaClass)   // class java.lang.String
```

## Autres exemples avec `*`

```kotlin
// List de quelque chose
val liste: List<*> = listOf("a", "b", "c")  // List<String>
val autre: List<*> = listOf(1, 2, 3)        // List<Int>

// Function qui retourne quelque chose
val fonction: () -> Any? = { "Hello" }
val generic: () -> * // Syntaxe incorrecte
val correct: Function0<*> = fonction  // 
```

---

## En pratique avec les collections Kotlin

```kotlin
// Dans la stdlib Kotlin
public inline fun <T, R : Comparable<R>> Iterable<T>.sortedBy(
    crossinline selector: (T) -> R?
): List<T>

// R : Comparable<R> signifie que R peut se comparer à lui-même
// Mais parfois on veut plus de flexibilité avec Comparable<*>
```

---

### Fonction de partition générique

```kotlin
fun <T, C : MutableCollection<T>> Collection<T>.partitionTo(
    first: C,
    second: C,
    predicate: (T) -> Boolean
): Pair<C, C> {
    for (element in this) {
        if (predicate(element)) first.add(element) else second.add(element)
    }
    return Pair(first, second)
}


// Utilisation
val nombres = listOf(1, 2, 3, 4, 5, 6)
val pairs = mutableListOf<Int>()
val impairs = mutableListOf<Int>()

nombres.partitionTo(pairs, impairs) { it % 2 == 0 }
println("Pairs: $pairs")     // [2, 4, 6]
println("Impairs: $impairs") // [1, 3, 5]
```

---

### Contrainte avec type auto-référentiel

```kotlin
fun <T : Comparable<T>> List<T>.estTrie(): Boolean {
    for (i in 1 until size) {
        if (this[i-1] > this[i]) return false
    }
    return true
}

val nombres = listOf(1, 2, 3, 4, 5)
val lettres = listOf("a", "b", "c")
println(nombres.estTrie()) // true
println(lettres.estTrie()) // true
```

### Contrainte avec plusieurs types liés

```kotlin
fun <K, V, M> M.ajouterTous(elements: Map<K, V>): M 
where M : MutableMap<K, V> {
    for ((cle, valeur) in elements) {
        this[cle] = valeur
    }
    return this
}

val map1 = mutableMapOf("a" to 1)
val map2 = mapOf("b" to 2, "c" to 3)
map1.ajouterTous(map2)
println(map1) // {a=1, b=2, c=3}
```

---

## Fonctions avec types de retour génériques

### Builder pattern générique

```kotlin
class Builder<T> {
    private val elements = mutableListOf<T>()

    fun ajouter(element: T): Builder<T> {
        elements.add(element)
        return this
    }

    fun construire(): List<T> = elements.toList()
}

fun <T> construire(init: Builder<T>.() -> Unit): List<T> {
    return Builder<T>().apply(init).construire()
}

// Utilisation
val nombres = construire<Int> {
    ajouter(1)
    ajouter(2)
    ajouter(3)
}

val textes = construire<String> {
    ajouter("Hello")
    ajouter("World")
}
```

---

## Tableau récapitulatif des notations

| Notation              | Signification                    | Exemple                          |
| --------------------- | -------------------------------- | -------------------------------- |
| `<T>`                 | Type générique simple            | `fun <T> process(item: T)`       |
| `<T, R>`              | Deux types génériques            | `fun <T, R> map(item: T): R`     |
| `<T : Parent>`        | T hérite de Parent               | `fun <T : Number> calc(x: T)`    |
| `<T> List<T>.ext()`   | Extension générique              | `fun <T> List<T>.first(): T`     |
| `where T : A, T : B`  | Contraintes multiples            | `fun <T> f() where T : A, T : B` |
| `(T) -> R`            | Fonction prenant T, retournant R | `transform: (T) -> R`            |
| `<T : Comparable<T>>` | T peut se comparer à lui-même    | `fun <T : Comparable<T>> sort()` |
| `<in T>`              | Contravariance (consommateur)    | `interface Consumer<in T>`       |
| `<out T>`             | Covariance (producteur)          | `interface Producer<out T>`      |

- `<T : Parent>`, on impose que le type générique `T` doit **hériter de** (ou être un sous-type de) la classe `Parent`.
  
  - Autrement dit, `T` est **contraint** à être soit `Parent` lui-même, soit une classe dérivée de `Parent`.

```kotlin
open class Parent
class Child : Parent()

fun <T : Parent> process(item: T) {
    // Ici, on peut utiliser les membres de Parent sur item
}
```

Ici, `process` accepte uniquement des objets qui sont au moins des `Parent` (donc `Parent` ou ses sous-classes comme `Child`).

Cette contrainte garantit que `T` possède au moins l’API définie dans `Parent`, ce qui permet d’utiliser ses propriétés ou méthodes dans la fonction générique.

**C’est pour ça qu’on parle d’héritage** : la contrainte `: Parent` repose sur la relation d’héritage/sous-typage en Kotlin.

---

#### Exemple :

```kotlin
fun <T, C : MutableCollection<T>> List<T>.foo(destination: C): C {
    for (item in this) {
        destination.add(item)
    }
    return destination
}


fun usage() {
    val list = listOf(1, 2, 3)
    val result = list.foo(ArrayList())  // result est un ArrayList<Int> avec les éléments
}
```

- `<T, C : MutableCollection<T>>` :
  
  - `T` est un type générique quelconque.
  
  - `C` est un type générique contraint à être une **collection mutable contenant des éléments de type `T`** (par exemple `ArrayList<T>`, `HashSet<T>`).
  
  - `C` doit être un type qui **hérite de** `MutableCollection<T>`, donc une collection mutable contenant des éléments de type `T`.

- `List<T>.foo(...)` :
  
  - `foo` est une fonction d’extension sur `List<T>`.
  
  - Elle agit donc sur une liste d’éléments de type `T`.

- `: C` :
  
  - La fonction retourne une instance de type `C`, c’est-à-dire une collection mutable contenant des éléments `T`.

Ici on passe en paramètre une collection mutable `destination` de type `C`, la fonction y ajoute les éléments de la liste et retourne cette collection.

---

### Bonnes pratiques

- **Conventions de nommage :**
  - **T** = Type générique principal
  - **K** = Key (clé)
  - **V** = Value (valeur)
  - **R** = Result/Return (résultat)
  - **E** = Element (élément)
- **Contraintes** : Ajoutez des contraintes quand vous utilisez des méthodes spécifiques
- **Inférence** : Laissez Kotlin déduire les types quand possible
- **Extensions** : Préférez les extensions génériques pour enrichir les types existants

### Pièges à éviter

- Ne pas mettre trop de paramètres de type (max 3-4)
- Ne pas oublier les contraintes quand nécessaire
- Ne pas rendre générique ce qui n'a pas besoin de l'être

---

## Exercices pratiques

### Exercice 1 : Fonction de cache

```kotlin
// Implémentez une fonction générique de cache
fun <K, V> cache(compute: (K) -> V): (K) -> V {
    val cache = mutableMapOf<K, V>()
    return { key ->
        cache.getOrPut(key) { compute(key) }
    }
}

// Test
val fibonacci = cache<Int, Long> { n ->
    if (n <= 1) n.toLong() else fibonacci(n-1) + fibonacci(n-2)
}
```

### Exercice 2 : Fonction de groupe

```kotlin
// Implémentez une fonction qui groupe par critère
fun <T, K> List<T>.grouperPar(keySelector: (T) -> K): Map<K, List<T>> {
    val groupes = mutableMapOf<K, MutableList<T>>()
    for (element in this) {
        val cle = keySelector(element)
        groupes.getOrPut(cle) { mutableListOf() }.add(element)
    }
    return groupes
}

// Test
data class Etudiant(val nom: String, val classe: String)
val etudiants = listOf(
    Etudiant("Alice", "A"),
    Etudiant("Bob", "B"), 
    Etudiant("Charlie", "A")
)
val parClasse = etudiants.grouperPar { it.classe }
```

---

## Conclusion

Les fonctions génériques sont essentielles pour écrire du code :

- **Réutilisable** : une fonction, plusieurs types
- **Type-safe** : pas de cast dangereux
- **Expressif** : le code dit ce qu'il fait
- **Performant** : pas de boxing/unboxing inutile


