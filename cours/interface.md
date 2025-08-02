# Les Interfaces

### Utilité

- Définir un **contrat de comportement** sans implémentation

- Permettre l'**héritage multiple** (une classe peut implémenter plusieurs interfaces mais pas plusieurs classes abstraites)

### Exemple : 

- Une classe SmartPhone doit implémenter à la fois Camera et GPS :

```kotlin
interface Camera {
    fun takePhoto()
}

interface GPS {
    fun getLocation(): String
}

class SmartPhone : Camera, GPS {
    override fun takePhoto() { /* ... */ }
    override fun getLocation() = "Latitude, Longitude"
}
```

- Établir des capacités transversales (`Refundable`, `Loggable`, etc.)

- Utiliser le polymorphisme, capacité à traiter des objets différents via une interface commune tout en invoquant leurs comportements spécifiques.

- Contrat pur sans implémentation/état 


### Différences avec les classes abstraites

| Caractéristique    | Interface               | Classe Abstraite |
| ------------------ | ----------------------- | ---------------- |
| État (propriétés)  | ❌ (sauf via accesseurs) | ✅                |
| Constructeur       | ❌                       | ✅                |
| Héritage multiple  | ✅                       | ❌                |
| Méthodes concrètes | ✅                       | ✅                |



### Exemple :

```kotlin
interface Media {
    val title: String
    fun play()
}

class Audio(override val title: String, val composer: String) : Media {
    override fun play() {
        println("Playing audio: $title, composed by $composer")
    }
}

fun main() {
    val audio = Audio("Symphony No. 5", "Beethoven")
    audio.play()
   // Playing audio: Symphony No. 5, composed by Beethoven
}
```

### Exemple complet :

```kotlin
interface Refundable {
    fun refund(amount: Int)  // Méthode abstraite par défaut
}

abstract class PaymentMethod(val name: String) {
    fun authorize(amount: Int) = println("Authorizing payment of $$amount")
    abstract fun processPayment(amount: Int)
}

class CreditCard(name: String) : PaymentMethod(name), Refundable {
    override fun processPayment(amount: Int) = println("Processing credit card payment of $$amount")
    
    override fun refund(amount: Int) = println("Refunding $$amount to the credit card")
}
```

### Utilisation :

```kotlin
fun main() {
    val visa = CreditCard("Visa")
    
    visa.authorize(100)     // Hérité de PaymentMethod
    visa.processPayment(100) // Implémentation abstraite
    visa.refund(50)         // Implémentation d'interface
}
// Output:
// Authorizing payment of $100
// Processing credit card payment of $100
// Refunding $50 to the credit card
```

## Synthèse Comparative

| Concept              | Quand l'utiliser ?                            | Exemple                            |
| -------------------- | --------------------------------------------- | ---------------------------------- |
| **Héritage**         | Relation "est-un" avec réutilisation de code  | `Chien` est un `Animal`            |
| **Classe Abstraite** | Partage d'état + implémentations partielles   | `PaymentMethod` avec `authorize()` |
| **Interface**        | Capacités multiples/comportements transverses | `Refundable`, `Serializable`       |
