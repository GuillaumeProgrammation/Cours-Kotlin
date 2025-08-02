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