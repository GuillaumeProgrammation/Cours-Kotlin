## les Classes Abstraites

### Utilité

- **Modéliser des concepts incomplets** qui ne doivent pas être instanciés directement

- Définir un **contrat partiel** que les classes filles doivent implémenter

- Fournir des **implémentations par défaut**

- Contrat pur avec implémentation/état 

- Pas de multi héritage

### Caractéristiques

- Ne peut pas être instanciée (`val a = Animal()` → ❌)

- Peut contenir :
  
  - Méthodes abstraites (sans implémentation)
  
  - Méthodes concrètes (avec implémentation)
  
  - Propriétés abstraites/concrètes

### Exemple détaillé :

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

### Utilisation :

```kotlin
fun main() {
    val animaux = listOf(Chien("Rex"), Chat("Félix"))

    animaux.forEach {
        it.introduce()   // Méthode concrète de Animal
        it.makeSound()   // Implémentation spécifique
    }
}
// Output:
// Hi I'm Rex from France!
// Ouaf !
// Hi I'm Félix from Belgique!
// Meow !
```

### Explications

1. Toutes les classes sont `final` par défaut (non-héritables) → utiliser `open`/`abstract`

2. Le constructeur parent doit être appelé avec `: Parent(param)`

3. Les méthodes à redéfinir nécessitent `override`

---

## Constructor :
