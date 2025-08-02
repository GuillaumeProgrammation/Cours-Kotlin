## `object` - Singleton classique

**Utilisation :** Singleton, utilitaires, gestionnaires

```kotlin
object DatabaseManager {
    private var isConnected = false

    fun connect() {
        if (!isConnected) {
            println("Connecting to database...")
            isConnected = true
        }
    }

    fun disconnect() {
        if (isConnected) {
            println("Disconnecting from database...")
            isConnected = false
        }
    }
}

// Utilisation - une seule instance
DatabaseManager.connect()
```

**Quand utiliser :**

- Une seule instance nécessaire (Singleton)
- Gestionnaires de ressources
- Utilitaires sans état
- toString() n'est pas important

### Utilisation :

```kotlin
fun main() {
    DatabaseManager.connect()  // Output: Connecting to database...
    // Attention on ne peut pas accéder à isConnected et le modifier.
}
```

---

## `data object` - Singleton avec toString() propre

**Utilisation :** États, constantes, singletons avec debug facile

```kotlin
data object MonDataObject {
    private var count = 0

    fun direBonjour() {
        count++
        println("Hello #$count")
    }

    // 'toString()' est automatiquement fourni
    // Équivaut à: override fun toString() = "MonDataObject"
}
```

**Quand utiliser :**

- États dans sealed classes
- Configuration/constantes
- Singleton avec toString() lisible
- Debug et logging faciles

### Utilisation :

```kotlin
fun main() {
    MonDataObject.direBonjour()  // Hello #1
    MonDataObject.direBonjour()  // Hello #2
    println(MonDataObject)       // MonDataObject (grace à data object)
}
```

---

## 3. `companion object` - Factory Pattern intégré

**Utilisation :** réaliser des méthodes / propriétés statiques

### 1. **Méthodes statiques**

Fonctions appelables via le nom de la classe, sans créer d’instance.

```kotlin
class Exemple {
    companion object {
        fun statique() = println("Appel statique")
    }
}

// Utilisation
Exemple.statique()
```

### 2. **Propriétés statiques**

```kotlin
class Exemple {
    companion object {
        val CONSTANTE = 42
    }
}

// Utilisation
val x = Exemple.CONSTANTE
```

--- 

## Comparaison Technique

## Tableau Synthétique

| Caractéristique  | `object`             | `data object`           | `companion object`        |
| ---------------- | -------------------- | ----------------------- | ------------------------- |
| **Instance**     | Globale unique       | Globale unique          | Unique par classe         |
| **Héritage**     | Interfaces seulement | Interfaces seulement    | Interfaces + extension    |
| **toString()**   | Par défaut           | Auto-implémenté         | Par défaut                |
| **Accès**        | Direct               | Direct                  | Via classe parente        |
| **État mutable** | Déconseillé          | Déconseillé             | Possible avec précautions |
| **Cas typique**  | Services globaux     | États dans sealed class | Factories/constantes      |

### Exemple complet :

```kotlin
// Configuration d'application
data object AppConfig {
    const val VERSION = "1.0.0"

    val environments = mapOf(
        "dev" to "https://dev.api.com",
        "prod" to "https://api.com"
    )

    fun currentEnv() = environments["prod"]!!
}

// Gestion de base de données
object Database {
    private var connection: Connection? = null

    fun connect() {
        if (connection == null) {
            connection = createConnection()
        }
    }

    private fun createConnection(): Connection {
        println("Creating new DB connection to ${AppConfig.currentEnv()}")
        return MockConnection()
    }
}

// Factory de modèles
class User private constructor(val id: String) {
    companion object {
        fun from(name: String): User {
            require(name.isNotBlank()) { "Name cannot be blank" }
            return User(name.lowercase().replace(" ", "_"))
        }
    }
}

fun main() {
    Database.connect()
    val user = User.from("John Doe")
    println("App version: ${AppConfig.VERSION}")
}
```