## Fonctions d'association (Map)

### `associate { key to value }`

- Construit une `Map` en spécifiant explicitement chaque paire.

```kotlin
val words = listOf("one", "two", "three")
val map = words.associate { it to it.length }
// {one=3, two=3, three=5}---
```

---

### `associateBy { key }`

- Clé = résultat de la lambda

- Valeur = élément original

```kotlin
val users = listOf("alice", "bob", "charlie")
val map = users.associateBy { it.first() }
// {a=alice, b=bob, c=charlie}
```

---

### `associateWith { value }`

- Clé = élément original

- Valeur = résultat de la lambda

```kotlin
val map = users.associateWith { it.length }
// {alice=5, bob=3, charlie=7}
```

---

## `groupBy`

- Regroupe les éléments selon une clé.

```kotlin
val words = listOf("one", "two", "three", "four")
val grouped = words.groupBy { it.length }
// {3=[one, two], 5=[three], 4=[four]}
```

---

## `partition`

Divise une collection en deux selon une condition :

- Première liste = éléments qui satisfont la condition

- Deuxième = les autres

```kotlin
val nums = listOf(1, 2, 3, 4)
val (even, odd) = nums.partition { it % 2 == 0 }
// even = [2, 4], odd = [1, 3]
```

---

**`joinToString(separator: String)`**

- Transforme une collection en une chaîne en concaténant ses éléments avec un séparateur donné.

```kotlin
val fruits = listOf("Pomme", "Banane", "Cerise")
val result = fruits.joinToString(", ")
println(result)  // "Pomme, Banane, Cerise"
```

---
