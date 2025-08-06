# Kotlin – Références de fonctions (`::`)

---

## 1. Qu’est-ce qu’une référence de fonction ?

- Une **référence de fonction** permet de **passer une fonction comme valeur**.

- En Kotlin, on utilise l’opérateur `::` pour obtenir cette référence.

- Cela permet de transmettre une fonction à une autre fonction, par exemple dans les fonctions d’ordre supérieur (`map`, `filter`, `forEach`, etc.).

---

## Syntaxe de base

### Référence à une fonction nommée

```kotlin
fun isEven(x: Int): Boolean = x % 2 == 0

val predicate: (Int) -> Boolean = ::isEven

val numbers = listOf(1, 2, 3, 4)
val evens = numbers.filter(::isEven)  // Utilisation directe
// <=> numbers.filter {isEven(it)}, lambda équivalente
```

---

### Référence à une fonction membre (instance)

Pour une fonction membre d’une classe :

```kotlin
class Person(val name: String) {
    fun greet() = "Hello, $name"
}

val greeter: Person.() -> String = Person::greet
// greeter est une fonction qu'on peut appeler sur une instance de Person

val alice = Person("Alice")
println(greeter(alice))  // "Hello, Alice"
println(alice.greeter())     // aussi valide, renvoie "Hello, Alice"
```

- f est une fonction qui **s'attend à être appelée avec une instance de `Person` comme receveur implicite** et qui renvoie un `String`.

- `f` correspond à une fonction que tu peux appeler de deux façons équivalentes :
  
  - ```kotlin
    val alice = Person("Alice")
    
    // 1. En appel d’extension (receveur implicite)
    val result1 = alice.f()
    
    // 2. En invocation explicite en passant l’instance
    val result2 = f(alice)
    
    println(result1)  // "Hello, Alice"
    println(result2)  // "Hello, Alice"
    ```

### Type `Person.() -> String`

- C’est un **type de fonction avec receveur** (appelé *fonction d’extension* ou *fonction membre avec receveur implicite*).

- Cette fonction attend une instance de `Person` comme **receveur implicite** (comme si on appelait une méthode sur un objet).

- Elle ne prend **aucun argument explicite**, et retourne un `String`.

### `Person::greet`

- C’est la **référence à la fonction membre** `greet` de la classe `Person`.

- Cela crée une fonction qui peut être appelée **sur une instance de `Person`**.

---

## Références aux propriétés

### Référence à une propriété d’une instance

```kotlin
val lengthFunc: (String) -> Int = String::length

println(lengthFunc("Kotlin"))  // 6
```

---

## Différence entre appel direct et référence

- Appel direct :

```kotlin
val result = isEven(4)   // true
```

- Référence de fonction (sans exécution) :

```kotlin
val ref = ::isEven       // référence à la fonction, pas encore appelée
val result = ref(4)      // maintenant la fonction est appelée
```

---

## Utilisation courante avec les collections

Exemple avec `map` et `filter` :

```kotlin
val names = listOf("Anna", "Bob", "Cindy")

// Utiliser une lambda
val lengths1 = names.map { it.length }

// Utiliser une référence de fonction
val lengths2 = names.map(String::length)
```

---

### Références partielles (fonction membre avec instance)

```kotlin
class Calculator {
    fun add(a: Int, b: Int) = a + b
}

val calculator = Calculator()

// Référence à la fonction membre
val addRef: (Int, Int) -> Int = calculator::add
val addRef2 = { a: Int, b: Int -> calculator.add(a, b) }
println(addRef(2, 3))  // 5
```

- `calculator::add` signifie **« la fonction `add` liée à l’instance `calculator` »**.

- `calculator::add` crée une **référence à la méthode `add` de l’instance `calculator`**.

- Cela produit un objet fonction (lambda sous le capot) qui capture l’instance `calculator`.

- `addRef` a donc le type `(Int, Int) -> Int`, c’est une fonction prenant deux `Int` et renvoyant un `Int`.

- Quand on appelle `addRef(2, 3)`, Kotlin va invoquer **`add` sur l’instance `calculator`** avec arguments `2` et `3`.
