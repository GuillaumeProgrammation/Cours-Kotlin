## Fonctions de recherche

### `find { condition }` ou `firstOrNull { condition }`

Retourne le **premier élément** qui satisfait une condition, ou `null` sinon.

```kotlin
val names = listOf("Alice", "Bob", "Charlie")
val result = names.find { it.startsWith("B") } // "Bob"
```

---

### `lastOrNull { condition }`

- Retourne le **dernier élément** qui satisfait une condition, ou `null` sinon.

```kotlin
val result = names.lastOrNull { it.length > 3 } // "Charlie"
```

---

### Min et max

`maxOrNull()` : retourne le plus grand élément ou `null` si la collection est vide.

`minOrNull()` : retourne le plus petit élément ou `null` si la collection est vide

```kotlin
val numbers = listOf(5, 3, 9, 1)
val max = numbers.maxOrNull() // 9
val min = numbers.minOrNull() // 1
```

---

### Min et max avec critère

`maxByOrNull { ... }` : retourne l’élément qui maximise l'expression fournie.

`minByOrNull { ... }` : retourne l’élément qui minimise l'expression fournie.

```kotlin
data class Person(val name: String, val age: Int)

val people = listOf(Person("Alice", 25), Person("Bob", 30), Person("Charlie", 20))

val oldest = people.maxByOrNull { it.age } // Person(name=Bob, age=30)
val youngest = people.minByOrNull { it.age } // Person(name=Charlie, age=20)

```

- Ces fonctions sont null-safe : elles renvoient `null` si la collection est vide.
