## Kotlin - Les fonctions de tris

## 1. Fonctions de tri

### `sorted()`

- Trie une liste d’éléments comparables (ordre naturel croissant).

```kotlin
val nums = listOf(3, 1, 2)
val sortedNums = nums.sorted() // [1, 2, 3]
```

---

### `sortedDescending()`

- Tri décroissant.

```kotlin
val sortedDesc = nums.sortedDescending() // [3, 2, 1]
```

---

### `sortedBy { ... }`

- Trie en fonction d'une propriété.

```kotlin
data class Person(val name: String, val age: Int)
val people = listOf(Person("Alice", 30), Person("Bob", 25))
val sortedByAge = people.sortedBy { it.age }
// [Bob, Alice]
```

---

### `sortedWith(comparator)`

- Trie avec un comparateur personnalisé.

```kotlin
val sorted = people.sortedWith(compareByDescending { it.name.length })
// trie par longueur de nom décroissante
```

---

### Tri **mutant** (modifie la liste existante)

- `sort()` : trie la liste mutable en place (ordre naturel)

- `sortDescending()` : trie en place en ordre décroissant

- `sortBy { ... }` : trie en place selon la lambda

- `sortWith(comparator)` : trie en place avec un comparateur

```kotlin
val mutableNums = mutableListOf(3, 1, 2)
mutableNums.sort()  // mutableNums = [1, 2, 3]
```

---

## `intersect`

```kotlin
val result = set1.intersect(set2)
setOf(1, 2, 3).intersect(setOf(2, 3, 4))  // [2, 3]
```

- Retourne les **éléments communs** aux deux ensembles.

---

**`union`**

```kotlin
val result = set1.union(set2)
setOf(1, 2).union(setOf(2, 3))  // [1, 2, 3]
```

- Retourne tous les éléments des deux ensembles, **sans doublons**.

---

**`subtract`**

```kotlin
val result = set1.subtract(set2)
setOf(1, 2, 3).subtract(setOf(2))  // [1, 3]
```

- Retourne les éléments de `set1` **absents de** `set2`.
