# Mémo Kotlin : Classes, Objects & Interfaces

## `class` - Classe classique

**Utilisation :** Logique métier, comportements complexes, plusieurs instances

```kotlin
class Voiture(val couleur: String) {
    // Attribut de classe (équivalent : companion object)
    companion object {
        const val nbRoues = 4
    }
}

fun main() {
    val v1 = Voiture("rouge")
    val v2 = Voiture("bleu")

    println(Voiture.nbRoues)  // 4 (classe)
    println(v1.couleur)       // rouge (instance)
}
```

**Quand utiliser :**

- Logique métier complexe
- Gestion d'état mutable
- Pas besoin des méthodes auto-générées (equals, hashCode, toString)
- Plusieurs instances nécessaires

---

## `data class` - Classe de données

**Utilisation :** Modèles de données, DTOs, entités

```kotlin
data class Media(
    val title: String,
    val composer: String,
    val duration: Int
)

// Méthodes auto-générées :
val media1 = Media("Symphony No. 5", "Beethoven", 45)
val media2 = media1.copy(title = "Symphony No. 9") // copy()
println(media1) // toString() automatique
println(media1 == media2) // equals() automatique
```

**Quand utiliser :**

- Stockage de données
- Modèles/DTOs
- Besoin d'equals, hashCode, toString, copy
- Plusieurs instances nécessaires

---

## Héritage (`open` / `:`) - Étendre une classe

**Utilisation :** Réutiliser et étendre le comportement d'une classe existante

```kotlin
open class Vehicule(val name: String) {
    init {
        println("Hi I'm the super class !")
    }

    fun introduce() {
        println("Hi I'm a ${name}")
    }
}

class Voiture(val color: String, var speed: Int, nom: String) : Vehicule(nom) {
    var maxSpeed = 130

    fun acc(value: Int) {
        when {
            speed + value < maxSpeed -> speed += value
            else -> println("Impossible, MaxSpeed : ${maxSpeed}km/h")
        }
    }
}

// Utilisation
val voiture = Voiture("rouge", 80, "Peugeot")
// Affiche: "Hi I'm the super class !"
voiture.introduce() // Héritée de Vehicule
// Affiche: "Hi I'm a Peugeot"
voiture.acc(30) // Méthode propre à Voiture
```

**Règles de l'héritage :**

- La classe parent doit être marquée `open`
- Seules les méthodes/propriétés `open` peuvent être redéfinies
- Utilisez `override` pour redéfinir
- `super` pour accéder à la classe parent

```kotlin
open class Animal(val name: String) {
    open fun makeSound() {
        println("Some generic sound")
    }
}

class Dog(name: String) : Animal(name) {
    override fun makeSound() {
        super.makeSound() // Appel à la méthode parent
        println("Woof!")
    }
}
```

**Quand utiliser l'héritage :**

- Relation "est-un" claire (Voiture est un Vehicule)
- Réutiliser du code commun
- Polymorphisme (traiter les sous-classes comme le type parent)
- Évitez l'héritage profond (préférez la composition)

---

## `abstract class` - Classe abstraite

**Utilisation :** Base commune avec implémentation partielle

```kotlin
abstract class Animal(var name: String) {
    abstract var origin: String  // Propriété abstraite → doit être implémentée

    abstract fun makeSound()     // Méthode abstraite → doit être implémentée

    fun introduce() {            // Méthode concrète → héritée directement
        println("Hi I'm $name from $origin!")
    }
}

class Chien(name: String) : Animal(name) {
    override var origin = "France"  // Implémentation de la propriété abstraite
    override fun makeSound() = println("Ouaf !")
}

class Chat(name: String) : Animal(name) {
    override var origin = "Belgique"
    override fun makeSound() = println("Meow !")
}
```

**Quand utiliser :**

- Code commun entre plusieurs classes
- Certaines méthodes ont une implémentation, d'autres non
- Héritage avec comportement partagé
- Ne peut pas être instanciée directement

---

## `interface` - Interface

**Utilisation :** Contrat, définition de comportements

```kotlin
interface Coffee {
    fun cost(): Double = 2.0     // Implémentation par défaut
    fun description() {          // Implémentation par défaut
        println("I'm a coffee")
    }
}

class SimpleCoffee : Coffee {
    override fun description() {
        println("I'm a simple coffee")
    }
    // cost() hérite de l'implémentation par défaut (2.0)
}

interface Media {
    val title: String
    fun play()
}

class Audio(override val title: String, val composer: String) : Media {
    override fun play() {
        println("Playing audio: $title, composed by $composer")
    }
}
```

**Quand utiliser :**

- Définir des contrats
- Implémentation multiple
- Découplage du code
- Polymorphisme

---

## Délégation (`by`) - Déléguer l'implémentation

**Utilisation :** Éviter la duplication de code, composition over inheritance

### Délégation de classe

```kotlin
interface Coffee {
    fun cost(): Double
    fun description()
}

class SimpleCoffee : Coffee {
    override fun cost() = 2.0
    override fun description() {
        println("I'm a simple coffee")
    }
}

// Délégation : SimpleMilkCoffee délègue à l'objet coffee
class SimpleMilkCoffee(val coffee: Coffee) : Coffee by coffee {
    override fun description() {
        println("I'm a simple milk coffee")
    }

    override fun cost(): Double {
        return 1.0 + coffee.cost()  // Appel explicite à l'objet délégué
    }

    // Les autres méthodes sont automatiquement déléguées
}
```

### Délégation de propriété

```kotlin
class ConfigManager {
    // Lazy - calculé une seule fois au premier accès
    val config: Properties by lazy { 
        println("Loading config...")
        loadConfigFromFile() 
    }

    // Observable - notifié des changements
    var currentTheme: String by Delegates.observable("light") { _, old, new ->
        println("Theme changed from $old to $new")
    }

    private fun loadConfigFromFile(): Properties = Properties()
}
```

**Quand utiliser la délégation :**

**Délégation de classe :**

- Éviter la duplication de code
- Composition plutôt qu'héritage
- Proxy/Wrapper patterns
- Décorateur patterns

**Délégation de propriété :**

- Lazy loading
- Validation automatique
- Observation des changements
- Cache/mémoïsation

---

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

---

## `data object` - Singleton avec toString() propre

**Utilisation :** États, constantes, singletons avec debug facile

```kotlin
sealed class ApiResult
data class Success(val data: String) : ApiResult()
data class Error(val message: String) : ApiResult()
data object Loading : ApiResult()
data object NotStarted : ApiResult()

// Configuration
data object AppConfig {
    const val API_BASE_URL = "https://api.example.com"
    const val TIMEOUT = 5000
    val features = setOf("feature1", "feature2")
}

// Debug facile
println(Loading) // Affiche: "Loading" (propre)
```

**Quand utiliser :**

- États dans sealed classes
- Configuration/constantes
- Singleton avec toString() lisible
- Debug et logging faciles

---

## Combinaisons courantes

```kotlin
// Héritage + interface
interface Coffee {
    fun cost(): Double
}

open class BasicCoffee : Coffee {
    override fun cost() = 2.0
}

class PremiumCoffee : BasicCoffee() {
    override fun cost() = super.cost() + 1.0 // 3.0
}

// Abstract class + héritage
abstract class Animal(val name: String) {
    abstract fun makeSound()
}

class Chien(name: String) : Animal(name) {
    override fun makeSound() = println("Ouaf !")
}

// Délégation + héritage
class SimpleMilkCoffee(val coffee: Coffee) : Coffee by coffee {
    override fun cost(): Double = 1.0 + coffee.cost()
}
```

--- 

# Sealed Classes et Enum Classes

## `enum class` - Ensemble de constantes typées

**Utilisation :** Valeurs fixes, états simples, alternatives aux constantes

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

**Quand utiliser :**

- Liste fixe de valeurs connues à la compilation

- Besoin de méthodes communes ou spécifiques

- Remplacement des constantes "magiques"

- Logique conditionnelle simple (when exhaustif)

## `sealed class` - Hiérarchie fermée de classes

**Utilisation :** États complexes, arborescences de données, résultats d'opérations

```kotlin
sealed class ApiState<T> {
    data object Idle : ApiState<Nothing>()
    data object Loading : ApiState<Nothing>()
    data class Success<T>(val data: T) : ApiState<T>()
    data class Error<T>(val message: String, val code: Int? = null) : ApiState<T>()
}

fun handleState(state: ApiState<String>) {
    when (state) {
        is ApiState.Idle -> println("Idle")
        is ApiState.Loading -> println("Loading")
        is ApiState.Success -> println("Success: ${state.data}")
        is ApiState.Error -> println("Error: ${state.message} (code: ${state.code})")
    }
}
```

## `enum class` vs `sealed class`

**Utilisation comparative :**

```kotlin
// Solution enum
enum class HttpMethod {
    GET, POST, PUT, DELETE
}

// Solution sealed
sealed class HttpRequest {
    data class Get(val url: String) : HttpRequest()
    data class Post(val url: String, val body: String) : HttpRequest()
    data class Delete(val url: String, val reason: String) : HttpRequest()
}

// Choix guide :
val method = HttpMethod.GET // Simple
val request = HttpRequest.Post("/api", "{data}") // Complexe
// Principe utilisation d'un when pour ce genre de cas
```

**Quand choisir enum :**

- Valeurs simples sans données associées

- Besoin de performances optimales

- Méthodes communes implémentables

**Quand choisir sealed :**

- Données complexes associées à chaque type

- Hiérarchie de classes nécessaire

- Extensibilité contrôlée

 