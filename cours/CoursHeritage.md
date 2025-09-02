# Héritage en kotlin

### Utilité

L'héritage permet à une classe (enfant) d'**hériter des propriétés et méthodes** d'une autre classe (parent). Cela favorise :

- La réutilisation du code
- La création de hiérarchies logiques
- Le polymorphisme

### Syntaxe

```kotlin
open class Parent(val propriete: Type)

class Enfant(val paramEnfant: Type) : Parent(paramParent) {
    // Spécificités de la classe enfant
```

### Exemple simple:

```kotlin
open class Vehicule(val name: String){
    init {
        println("Hi I'm the super class !")
    }

    fun introduce(){
        println("Hi I'm a ${name}")
    }
}

class Voiture(val color: String, var speed: Int, nom: String): Vehicule(nom){
    var maxSpeed = 130

    fun acc(value: Int){
        when {
            speed + value < maxSpeed -> speed += value
            else -> println("Impossible, MaxSpeed : ${maxSpeed}km/h")
        }
    }
}
```

---

## Relation type :

### 1. IS-A.

- Une classe **est un type de** l’autre → on utilise l’**héritage** (`:` en Kotlin).

```kotlin
// Un Smartphone EST un SmartDevice
open class SmartDevice(val name: String, val category: String) {
    var deviceStatus: String = "online"
}

class SmartPhone(name: String, category: String, val os: String) : SmartDevice(name, category)
```

```kotlin
fun main() {
    val phone = SmartPhone("Pixel", "Mobile", "Android")
    println("${phone.name} est un SmartDevice et tourne sous ${phone.os}")
}
```

- Ici `SmartPhone` **est un** `SmartDevice`.  
  C’est une **spécialisation**.

## 2. **has-a** (composition / agrégation)

Une classe **possède un** objet d’une autre → on met l’objet comme **propriété**.

```kotlin
class SmartDevice(val name: String, val category: String) {
    var deviceStatus: String = "online"
}

class SmartHome(val homeName: String) {
    // Un SmartHome POSSEDE un SmartDevice
    val device = SmartDevice("Smart Lamp", "Lighting")
}
```

```kotlin
fun main() {
    val home = SmartHome("Maison principale")
    println("${home.homeName} a un appareil : ${home.device.name} (${home.device.category})")
}
```

- Ici `SmartHome` **a un** `SmartDevice`.  
  C’est une **composition** (ou agrégation selon si l’objet vit indépendamment ou pas).

---

### Résumé visuel

- **is-a** → héritage :
  
  - `Chien` **est un** `Animal`.
  
  - `SmartPhone` **est un** `SmartDevice`.

- **has-a** → composition :
  
  - `Voiture` **a un** `Moteur`.
  
  - `SmartHome` **a un** `SmartDevice`.