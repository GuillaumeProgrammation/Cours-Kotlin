# Kotlin – Délégation

## Qu’est-ce que la délégation ?

La **délégation** est un mécanisme qui permet à une classe de **déléguer l’implémentation d’une interface** à un autre objet, **sans avoir à réécrire toutes les méthodes**.

👉 Kotlin supporte la **délégation d’interface** de manière native grâce à la syntaxe `by`.

---

## Syntaxe

```kotlin
class MaClasse(val delegate: Interface) : Interface by delegate
```

### Exemple simple :

```kotlin
interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("LOG: $message")
    }
}

class Service(val logger: Logger) : Logger by logger {
    fun doWork() {
        log("Work started")  // ici on utilise log() délégué
        // ... logique métier ...
        log("Work finished")
    }
}

fun main() {
    val consoleLogger = ConsoleLogger()
    val serviceA = Service(consoleLogger) 
    // console logger : instance d'une class qui definit log 
    //-> log utilisable dans Service
    val serviceB = Service(consoleLogger)

    serviceA.doWork()
    serviceB.doWork()
}
```

- Ici, `Service` n’a pas besoin de redéfinir `log()` : il le délègue à `logger`.

- `log()` est une méthode définie dans l’interface `Logger`.

- Pour appeler `log()` dans `Service` sans préfixe (`logger.log()`), la classe `Service` doit soit **implémenter `Logger`** (donc avoir `: Logger` dans la déclaration) et **fournir une implémentation** ou déléguer (`by logger`).

- La délégation `: Logger by logger` permet d’utiliser `log()` directement dans `Service` comme si c’était une méthode native de `Service`.

- C'est grâce à **`ConsoleLogger` qui implémente l’interface `Logger`** et fournit une définition concrète de la méthode `log()` que cette méthode peut être utilisée.

- Sinon, sans délégation ni héritage, tu dois appeler `logger.log()` explicitement.

#### Sans délégation ni héritage, le code devrait ressembler à ça :

```kotlin
class Service(val logger: Logger) {
    fun doWork() {
        logger.log("Work started")  // obligation d'utiliser la référence
        // logique métier
        logger.log("Work finished")
    }
}
```

**Résumé** : la délégation permet d’appeler directement les méthodes de l’interface dans la classe, sans passer par la référence d’objet.

## Exemple complet  : `Coffee`

```kotlin
interface Coffee {
    fun cost(): Double = 2.0
    fun description() {
        println("I'm a coffee")
    }
}
```

- L’interface définit un coût par défaut (2.0) et une description basique.

```kotlin
class SimpleCoffee : Coffee {
    override fun description() {
        println("I'm a simple coffee")
    }
}
```

- `SimpleCoffee` redéfinit seulement la description.

```kotlin
class SimpleMilkCoffee(val coffee: Coffee) : Coffee by coffee {
    override fun description() {
        println("I'm a simple milk coffee")
    }

    override fun cost(): Double {
        return 1.0 + coffee.cost()  // Appel explicite à l'objet délégué
    }
}
```

`MilkCoffee` :

- Délègue tout à `coffee`,

- Surcharge `description()` pour changer le texte,

- Ajoute 1.0 au coût total,

- Appelle explicitement `coffee.cost()` (⚠️ `super.cost()` est interdit ici car il ne s’agit pas d’une superclasse).

### Exemple d'utilisation :

```kotlin
fun main() {
    val simple = SimpleCoffee()
    val simpleMilk = SimpleMilkCoffee(simple)

    println("Coût : ${simpleMilk.cost()}")             
    // 3.0
    simpleMilk.description()                           
    // I'm a simple milk coffee
}
```

## Délégation ≠ Héritage

| Héritage                 | Délégation                            |
| ------------------------ | ------------------------------------- |
| Relation forte "est-un"  | Relation flexible "a-un"              |
| Une seule classe parente | Peut combiner plusieurs comportements |
| Nécessite `open`         | Pas besoin d'ouvrir les classes       |

## Avantages de la délégation

- Évite la duplication de code

- Favorise la composition plutôt que l'héritage

- Permet d’ajouter/modifier le comportement sans toucher à l’objet d’origine

### Exemple typique :

```kotlin
interface Drawable {
    fun draw()
    fun resize()
    val color: String?
}
```

```kotlin
class Circle : Drawable {
    override fun draw() {
        TODO("An example implementation")
    }

    override fun resize() {
        TODO("An example implementation")
    }
   override val color = null
}
```

### Cas pratique — éviter le boilerplate

Sans délégation, redéfinir une classe en composant demande beaucoup de code redondant :

```kotlin
class RedCircle(val circle: Circle) : Circle {

    // Start of boilerplate code
    override fun draw() {
        circle.draw()
    }

    override fun resize() {
        circle.resize()
    }

    // End of boilerplate code
    override val color = "red"
}
```

##### Avec délégation :

```kotlin
class RedCircle(param : Circle) : Drawable by param {
    // No boilerplate code!
    override val color = "red"
}
```

- Pas besoin de redéfinir `draw()` ni `resize()`.
