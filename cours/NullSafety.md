# Cours Kotlin — Types, Casts, Null Safety, Collections

## 1.  `null` et types nullable

- `null` représente l'absence de valeur.

- Pour autoriser une variable à être `null`, on utilise le suffixe `?` dans le type.

```kotlin
var name: String? = "Kotlin"
name = null  // OK, car String nullable

var nonNullableName: String = "Kotlin"
// nonNullableName = null  // Erreur de compilation
```

---

#### Opérateur Elvis `?:` (opérateur de coalescence)

Permet de fournir une valeur par défaut si la variable est `null` :

```kotlin
val name: String? = null
val finalName = name ?: "Inconnu" // Si name == null, finalName = "Inconnu"
println(finalName)  // Affiche : Inconnu
```

---

## Opérateur `?.` (safe call)

Permet d'accéder à une propriété ou d'appeler une fonction **uniquement si l'objet n'est pas null**.

```kotlin
val length = name?.length
// renvoie null si name est null
```

---

## Opérateur `!!` (not-null assertion)

Force une variable nullable à être non-null. ⚠️ Lève une exception si elle est en réalité `null`.

```kotlin
val nonNullName = name!!
```

---

## `let` avec `?.`

Exécute un bloc seulement si la variable n'est pas `null`.

```kotlin
val name: String? = "Kotlin"
name?.let {
    println(it.length)
}
```

---

### 2. Gestion sûre des `null`

Exemples d’utilisation avec `readLine()` qui retourne une chaîne nullable (`String?`).

```kotlin
val input: String? = readLine()
val inputNonNull: String = readLine()!!  
// Forcer la non-nullité, lance une exception si null

println(input?.length)               
// Longueur ou null si input == null
println(input?.length ?: "impossible")  
// Longueur ou "impossible" si null
println(input?.toInt())              
// Conversion nullable, peut lancer exception si mauvaise conversion
println(input?.toIntOrNull())        
// Conversion sûre, renvoie null si échec
// Attention input peut être une String...

println(inputNonNull.length)         
// Non-null, pas besoin de vérification

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

## Fonctions utiles pour le null-safety

| Fonction                            | Description                                                          |
| ----------------------------------- | -------------------------------------------------------------------- |
| `filterNotNull()`                   | Élimine les éléments nulls d’une collection.                         |
| `listOfNotNull()`                   | Crée une liste contenant uniquement les éléments non-nuls donnés.    |
| `maxOrNull()` / `minOrNull()`       | Renvoie la valeur extrême, ou `null` si la liste est vide.           |
| `singleOrNull { predicate }`        | Un seul élément correspondant ou `null`.                             |
| `firstNotNullOfOrNull {}`           | Premier résultat non nul dans une transformation.                    |
| `reduceOrNull { acc, item -> ... }` | Accumule les éléments si la collection n’est pas vide, sinon `null`. |
| `mapNotNull { ... }`                | Applique une transformation, ignore les résultats null.              |

```kotlin
val emails: List<String?> = listOf("a@mail.com", null, "b@mail.com")
val validEmails = emails.filterNotNull() // ["a@mail.com", "b@mail.com"]

val configFiles = listOfNotNull(server["config.json"]) // Si null -> liste vide
```

---

## 2. Opérateurs `is` / `as` / `as?` / `?.` / `?:`

### `is` — Test de type

Permet de vérifier si une variable est d’un certain type.

```kotlin
val obj: Any = "Hello"
if (obj is String) {
    println("C'est une chaîne de caractères, longueur = ${obj.length}")
}
```

---

### `as` — Cast forcé

Permet de forcer la conversion (cast) d’un objet en un autre type.

- Si le cast échoue, une exception `ClassCastException` est levée.

```kotlin
val obj: Any = "Hello"
val str: String = obj as String  // OK si obj est bien une String
```

- `as` ne **convertit pas** le type, il **force** à traiter la variable comme un autre type (cast). Si la variable n’est pas du type attendu, `as` provoque une exception.

---

### `as?` — Cast sûr (cast nullable)

- Tente de caster l’objet vers un type donné.

- Retourne `null` si le cast échoue au lieu de lever une exception.

```kotlin
val obj: Any = 123
val str: String? = obj as? String  // null, pas d'exception
```

- `as?` permet d’éviter cette exception en retournant `null` si le cast est impossible. On utilise souvent `is` pour tester un type avant d’accéder à ses membres.

#### Usage combiné avec retour anticipé

```kotlin
fun process(obj: Any): String {
    val user = obj as? User ?: return "Utilisateur invalide"
    return user.name
}
```

---

## Fonction `takeIf()`

- Retourne l’objet si la condition est vraie, sinon `null`.

- Utile pour filtrer ou appliquer une condition avant un traitement.

```kotlin
val x = 10
val result = x.takeIf { it > 5 }  // result = 10
val result2 = x.takeIf { it < 5 } // result2 = null
```

```kotlin
data class User(val username: String, val isActive: Boolean)

fun getActiveUsernames(users: List<User>): List<String> {
    return users.mapNotNull {user -> user.username.takeIf {user.isActive}}
}
```

---

### Exemple complet :

```kotlin
data class User(val name: String?)

fun getNotificationPreferences(user: Any, emailEnabled: Boolean, smsEnabled: Boolean): List<String> {
    val validUser = user as? User ?: return emptyList()
    val userName = validUser.name ?: "Guest"

    return listOfNotNull(
        "Email Notifications enabled for $userName".takeIf { emailEnabled },
        "SMS Notifications enabled for $userName".takeIf { smsEnabled })
}

fun main() {
    val user1 = User("Alice")
    val user2 = User(null)
    val invalidUser = "NotAUser"

    println(getNotificationPreferences(user1, emailEnabled = true, smsEnabled = false))
    // [Email Notifications enabled for Alice]
    println(getNotificationPreferences(user2, emailEnabled = false, smsEnabled = true))
    // [SMS Notifications enabled for Guest]
    println(getNotificationPreferences(invalidUser, emailEnabled = true, smsEnabled = true))
    // []
}
```
