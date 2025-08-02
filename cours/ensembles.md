## Map (Collections Associées)

**`Map<K, V>` (Dictionnaire clé-valeur)**

Une `Map` stocke **des associations clé-valeur**.

Il existe deux types principaux de `Map` en Kotlin :

- **`mapOf` (Immutable)** → Une `Map` qui ne peut pas être modifiée.
- **`mutableMapOf` (Mutable)** → Une `Map` où on peut ajouter, modifier et supprimer des éléments.

```kotlin
val map = mapOf(1 to "Alice", 2 to "Bob")
println(map[1])  // Affiche : Alice
```

**Clé-Valeur** sont définis avec `to`. 
Accès via `map[key]` ou `map.get(key)`. 
🚫 **Pas de modification possible** (Ajout/Suppression).

```kotlin
val students = mutableMapOf(1 to "Alice", 2 to "Bob")

// Ajouter un élément
students[3] = "Charlie"

// Modifier un élément
students[2] = "Robert"

// Supprimer un élément
students.remove(1)

println(students)  // Affiche: {2=Robert, 3=Charlie}
```

**Modification possible** (ajout, suppression, mise à jour).

### **2. Ajouter/Modifier des éléments dans une `mutableMap`**

- **`put`** : Ajoute ou modifie un élément dans une `mutableMap` (modifie la valeur pour une clé existante ou ajoute une nouvelle paire clé-valeur).

```kotlin
val mutableMap = mutableMapOf("a" to 1, "b" to 2)
mutableMap.put("c", 3)  // Ajoute ou modifie l'élément
println(mutableMap)  // {a=1, b=2, c=3}
```

- **`putIfAbsent`** : Ajoute une paire clé-valeur seulement si la clé n'existe pas déjà dans la `Map`.

```kotlin
mutableMap.putIfAbsent("b", 5)  // Ne modifie pas, car "b" existe déjà
mutableMap.putIfAbsent("d", 4)  // Ajoute "d"=4
println(mutableMap)  // {a=1, b=2, c=3, d=4}
```

- **`replace`** : Remplace la valeur d'une clé spécifique si elle existe.

```kotlin
mutableMap.replace("b", 10)  // Remplace "b"=2 par "b"=10
println(mutableMap)  // {a=1, b=10, c=3, d=4}
```

- **`remove`** : Supprime un élément en fonction de sa clé.

```kotlin
mutableMap.remove("a")
println(mutableMap)  // {b=10, c=3, d=4}
```

### 3. Accéder aux éléments de la `Map`

- **`get`** : Récupère la valeur associée à une clé.

```kotlin
val value = map["a"]  // Retourne 1
println(value)
```

- **`containsKey(k)`** : Vérifie si une clé existe dans la `Map`

- **`containsValue(v)`** : Vérifie si une valeur existe dans la `Map`.


