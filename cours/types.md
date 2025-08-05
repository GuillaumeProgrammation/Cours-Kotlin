## Les différents types spéciaux en Kotlin

### 1. `null` et types nullable

- `null` représente l'absence de valeur.

- Pour autoriser une variable à être `null`, on utilise le suffixe `?` dans le type (ex. : `String?`).

```kotlin
var name: String? = "Kotlin"
name = null  // OK, car String nullable

var nonNullableName: String = "Kotlin"
// nonNullableName = null  // Erreur de compilation
```

#### Opérateur Elvis `?:` (opérateur de coalescence)

Permet de fournir une valeur par défaut si la variable est `null` :

```kotlin
val name: String? = null
val finalName = name ?: "Inconnu"  // Si name == null, finalName = "Inconnu"
println(finalName)  // Affiche : Inconnu
```

---

### 2. Gestion sûre des `null`

Exemples d’utilisation avec `readLine()` qui retourne une chaîne nullable (`String?`).

```kotlin
val input: String? = readLine()
val inputNonNull: String = readLine()!!  // Forcer la non-nullité, lance une exception si null

println(input?.length)               // Longueur ou null si input == null
println(input?.length ?: "impossible")  // Longueur ou "impossible" si null
println(input?.toInt())              // Conversion nullable, peut lancer exception si mauvaise conversion
println(input?.toIntOrNull())        // Conversion sûre, renvoie null si échec

println(inputNonNull.length)         // Non-null, pas besoin de vérification

fun inputInt(): Int {
    while(true) {
        val input = readLine()
        val number = input?.toIntOrNull()
        if (number != null) return number
        println("Entrée invalide. Veuillez entrer un entier.")
    }
}
```

---

### 3. Exemple pratique avec types nullable

```kotlin
data class Employee(val name: String, var salary: Int)

fun employeeById(id: Int): Employee? = when(id) {
    1 -> Employee("Mary", 20)
    2 -> null
    3 -> Employee("John", 21)
    4 -> Employee("Ann", 23)
    else -> null
}

fun salaryById(id: Int): Int = employeeById(id)?.salary ?: 0
```

---

### 4. `Any` — Type racine

- Tout type hérite de `Any`.

- Peut contenir n'importe quelle valeur.

- Utilise l’opérateur `is` pour vérifier le type au runtime.

```kotlin
val value: Any = "Hello"

if (value is String) {
    println("Value is a String with length ${value.length}")
} else if (value is Int) {
    println("Value is an Int: $value")
} else {
    println("Value is of another type")
}
```

---

### 5. `Unit` — Type équivalent à `void`

- Représente l’absence de valeur significative.

- Utilisé pour les fonctions qui ne retournent rien.

```kotlin
fun printMessage(): Unit {
    println("Hello, Kotlin!")
}
```

---

#### 6. `Nothing`

`Nothing` est un type spécial en Kotlin qui n’a **aucune valeur**. Il est utilisé pour indiquer qu’une fonction **ne retourne jamais normalement** (par exemple, elle lance une exception ou boucle infiniment).

## Exemple d’utilisation

```kotlin
fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}
```

### Exemple avec `Nothing` dans une expression

```kotlin
val value: String = getValue() ?: fail("Valeur manquante")
```

------

### Exemple complet résumé

```kotlin
fun main() {
    // Nullable String
    val name: String? = "Kotlin"
    println(name?.length)  // 6

    // Any
    var value: Any = 42
    value = "Hello"
    if (value is String) {
        println("Value is a String: $value")
    }

    // Unit
    fun printMessage() {
        println("Hello, Kotlin!")
    }
    printMessage()

    // Nothing
    fun throwError(): Nothing {
        throw IllegalStateException("Erreur fatale")
    }
    // throwError()  // Décommente pour tester l’exception
}
```
