# **Fonction `map` en Kotlin**

### But

La fonction **`map`** est utilisée pour **transformer chaque élément** d'une collection en appliquant une fonction. Elle retourne une **nouvelle liste** avec les éléments transformés.

### **Exemples de base**

```kotlin
val numbers = listOf(1, 2, 3, 4)
val squaredNumbers = numbers.map { it * it }

println(squaredNumbers)  // [1, 4, 9, 16]
```

- **`it`** représente chaque élément de la liste.  
  **Retourne une nouvelle liste transformée.**

```kotlin
val names = listOf("alice", "bob", "charlie")
val uppercasedNames = names.map { it.uppercase() }

println(uppercasedNames)  // [ALICE, BOB, CHARLIE]
```

---

## `flatMap`

- Transforme chaque élément en une collection, puis **aplatit** les résultats.

```kotlin
val input = listOf("abc", "de")
val result = input.flatMap { it.toList() }
// ['a', 'b', 'c', 'd', 'e']
```

- Autre exemple avec objets :

```kotlin
data class Person(val name: String, val phones: List<String>)
val people = listOf(
    Person("Alice", listOf("123", "456")),
    Person("Bob", listOf("789"))
)
val allPhones = people.flatMap { it.phones }
// ["123", "456", "789"]
```
