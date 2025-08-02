## <u>Les différents types None : </u>

- **`null`** : Représente l'absence de valeur. Utilise `?` pour déclarer des types nullables.

```kotlin
var name: String? = "Kotlin"
name = null // Valide, car le type est String?
```

```kotlin
var name: String = "Kotlin"
name = null // Erreur de compilation : Null can not be a value of a non-null type String
```

```kotlin
val name: String? = null
val finalName = name ?: "Inconnu" (la valeur doit être du même type)

println(finalName)  // Affiche : Inconnu

```

```kotlin
var input = readLine()            // input: String? (nullable)
var inputNonNull = readLine()!!  // inputNonNull: String (non-null, exception si null)

println(input?.length)            // Si input == null → null, sinon longueur
println(input?.length ?: "impossible") // Si input == null → "impossible", sinon longueur
println(input?.toInt())           // Si input == null → null, sinon conversion (peut lever exception si non convertible)
println(input?.toIntOrNull())     // Si input == null → null, sinon conversion sûre (null si échec)

println(inputNonNull.length)      // inputNonNull garanti non-null, donc longueur sans test

fun inputInt(): Int {
    while (true) {
        val input = readLine()
        val number = input?.toIntOrNull()
        if (number != null) {
            return number
        } else {
            println("Entrée invalide. Veuillez entrer un entier.")
        }
    }
}
```

```kotlin
data class Employee (val name: String, var salary: Int)

fun employeeById(id: Int) = when(id) {
    1 -> Employee("Mary", 20)
    2 -> null
    3 -> Employee("John", 21)
    4 -> Employee("Ann", 23)
    else -> null
}

fun salaryById(id: Int) = employeeById(id)?.salary ?: 0
```
- **`Any`** : Le type racine en Kotlin. Peut contenir n'importe quelle valeur. Pour vérifier le type d'une valeur stockée dans une variable de type `Any`, utilise l'opérateur `is`.

```kotlin
val value: Any = "Hello"

if (value is String) {
    println("Value is a String: ${value.length}")
} else if (value is Int) {
    println("Value is an Int: $value")
} else {
    println("Value is of another type")
}
```

- **`Unit`** : Représente une valeur sans signification (similaire à `void`).

- **`Nothing`** : Représente une valeur qui n'existe jamais (utilisé pour les fonctions qui ne retournent jamais).



### Exemple :

```kotlin
fun main() {
    // Nullable String
    val name: String? = "Kotlin"
    println(name?.length) // 6

    // Any
    var value: Any = 42
    value = "Hello"
    if (value is String) {
        println("Value is a String: $value")
    }

    // Unit
    fun printMessage(): Unit {
        println("Hello, Kotlin!")
    }
    printMessage()

    // Nothing
    fun throwError(): Nothing {
        throw IllegalStateException("Error!")
    }
    // throwError() // Décommente pour voir l'exception
}
```


