## `enum class` - Énumérations Typées

### Utilité

- Représenter un ensemble fixe de constantes

- Alternative plus puissante qu'en Java

- Peuvent contenir des méthodes et propriétés

### Syntaxe de Base :

```kotlin
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}
```

### Exemple complet :

```kotlin
enum class LogLevel(val priority: Int, val color: String){
    DEBUG(1, "Gray"),
    INFO(2, "Blue"),
    WARNING(3, "Orange"),
    ERROR(4, "Red"),
    CRITICAL(5, "Purple");

    // système de filtrage automatique des messages selon leur importance
    fun shouldLog(minLevel: LogLevel): Boolean{
        return minLevel.priority <= this.priority
    }
}
```

### Avantages Clés

- **Sécurité** : Ensemble de valeurs connu à la compilation

- **Fonctionnalités** : Peuvent implémenter des interfaces

- **Pattern Matching** : Utilisation optimale avec `when`

### Methode sur les enum :

### **`.ordinal`** → Position dans la déclaration

```kotlin
enum class Priority {
    LOW, MEDIUM, HIGH // Index: 0, 1, 2
}

fun main() {
    println(Priority.MEDIUM.ordinal) // Affiche: 1
}
```

**Usage** :

- Accéder à l'index de la constante (commence à 0)

- Attention : Fragile si l'ordre change dans le code

### **`.name`** → Nom textuel de la constante

```kotlin
enum class HttpStatus { OK, NOT_FOUND }

fun main() {
    println(HttpStatus.OK.name) // Affiche: "OK"

    // Conversion String → enum
    val status = enumValueOf<HttpStatus>("NOT_FOUND")
    println(status.name) // Affiche: "NOT_FOUND"
}
```

### `.entries` → Toutes les valeurs

```kotlin
enum class Color { RED, GREEN, BLUE }

fun main() {
    // Ancienne méthode (pré-Kotlin 1.9)
    Color.values().forEach { println(it) } 

    // Nouvelle méthode optimisée (Kotlin 1.9+)
    Color.entries.forEach { println(it) }
}
```

### **Récapitulatif des Méthodes**

| Méthode/Propriété | Type de retour | Exemple d'usage            | Kotlin 1.9+ Alternative |
| ----------------- | -------------- | -------------------------- | ----------------------- |
| `.ordinal`        | `Int`          | `Priority.LOW.ordinal` → 0 | -                       |
| `.name`           | `String`       | `Color.RED.name` → "RED"   | -                       |
| `.values()`       | `Array<Enum>`  | `HttpStatus.values()`      | `.entries` (préférable) |

---

## Bonnes Pratiques

**Pour les enum :**

```kotlin
enum class Direction(val degrees: Int) {
    NORTH(0), EAST(90), SOUTH(180), WEST(270);

    fun opposite() = when(this) {
        NORTH -> SOUTH
        EAST -> WEST
        SOUTH -> NORTH
        WEST -> EAST
    }
}
```

- ✅ Garder les valeurs simples

- ✅ Utiliser des méthodes pour la logique associée
