# **Fonction `map` en Kotlin**

### But

La fonction **`map`** est utilisée pour **transformer chaque élément** d'une collection en appliquant une fonction. Elle retourne une **nouvelle liste** avec les éléments transformés.

### **Exemples de base**

```kotlin
val numbers = listOf(1, 2, 3, 4)
val squaredNumbers = numbers.map { it * it }

println(squaredNumbers)  // [1, 4, 9, 16]
```

**`it`** représente chaque élément de la liste.  
**Retourne une nouvelle liste transformée.**

```kotlin
val names = listOf("alice", "bob", "charlie")
val uppercasedNames = names.map { it.uppercase() }

println(uppercasedNames)  // [ALICE, BOB, CHARLIE]
```
