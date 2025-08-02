# Cours sur les Lambdas et Lambdas avec Receveur en Kotlin

---

## 1. Les Lambdas en Kotlin

### 1.1 Utilité

Une **lambda** est une fonction anonyme, c’est-à-dire une fonction sans nom, que l’on peut stocker dans une variable ou passer en argument à une fonction.  
Les lambdas permettent d’écrire du code plus concis, notamment pour définir des comportements à exécuter, comme des opérations sur des collections, des callbacks, etc.

---

### 1.2 Syntaxe

```kotlin
val lambdaName: (TypeParam1, TypeParam2, ...) -> ReturnType = { param1, param2, ... -> 
    // Corps de la lambda
}
```

- La partie avant le = définit le type de la lambda.

- La partie entre {} est la lambda elle-même.

- Les paramètres sont listés avant la flèche ->.

- Le corps peut être une expression ou un bloc d’instructions

### 1.3 Exemple simple

```kotlin
val add: (Int, Int) -> Int = { a, b -> a + b }
println(add(3, 4))  // Affiche 7
```

### 1.4 Exemple 

```kotlin
fun onClick(callback: () -> Unit) {
    callback()
}

onClick { println("Clicked!") }
```

Transformation à la compilation :

```kotlin
onClick( 
    fun() {
        println("Clicked!")
    }
)
```

- À l’intérieur de onClick, l’appel callback() exécute la lambda fournie, donc le message "Clicked!" est affiché sur la console.


## 2. Les Lambdas avec Receveur

### 2.1 Utilité

Une lambda avec receveur est une lambda qui agit comme une fonction membre d’un objet spécifique (le receveur).
Cela permet d’écrire un bloc d’instructions qui manipule directement l’objet, sans avoir à le référencer explicitement à chaque fois.

Cette construction est utilisée pour créer des DSL (Domain Specific Languages) internes très lisibles, pour configurer ou construire des objets de façon fluide.

### 2.2 Syntaxe

```kotlin
val lambdaWithReceiver: ReceiverType.() -> ReturnType = {
    // Corps de la lambda, `this` représente le receveur
}
```

- Le type est ReceiverType.() -> ReturnType (note le point avant les parenthèses).

- À l’intérieur de la lambda, this fait référence au receveur.

- La lambda peut être appelée sur un objet de type ReceiverType avec la syntaxe objet.lambdaWithReceiver().

### Exemple scope functions

```kotlin
val person = Person().apply {
    name = "Marie"
    age = 30
}
```
### 2.3 Exemple concret

- Définition d’une classe Person et d’une fonction qui crée un objet Person configuré via une lambda avec receveur :

```kotlin
class Person {
    var name: String = ""
    var age: Int = 0

    fun introduce() {
        println("Hi I'm $name and I'm $age years old")
    }
}

fun createPerson(init: Person.() -> Unit): Person {
    val person = Person()
    person.init()  // Appel de la lambda avec `person` comme receveur
    return person
}

```
Person.() est une syntaxe Kotlin qui indique une lambda avec receveur, c’est-à-dire une fonction qui s’exécute dans le contexte d’un objet Person.
Person.() -> Unit

#### Cela signifie :

Une fonction sans nom, sans paramètre explicite, mais qui peut accéder directement aux membres (val, var, fonctions) d’un objet de type Person via this.

Autrement dit :

- Person est le type receveur.

- () signifie aucun paramètre (à ne pas confondre avec les membres).

- -> Unit indique que la fonction ne retourne rien.

“Ceci est une fonction qui s’exécute dans un objet Person, avec this pointant sur cet objet.”

Cela permet d'écrire des blocs de configuration ou d'initialisation plus lisibles et naturels.

```kotlin
fun main() {
    val person = createPerson {
        name = "Alice"  // Accès direct à `name` via le receveur (this)
        age = 25
    }
    person.introduce()  // Affiche: Hi I'm Alice and I'm 25 years old
}

```

- Dans ce cas init vaut : 

```kotlin
init = { 
    this.name = "Alice"
    this.age = 25
}
```

### 2.4 Comparaison avec une lambda classique

Avec une lambda classique (Person) -> Unit :

```kotlin
fun createPerson2(init: (Person) -> Unit): Person {
    val person = Person()
    init(person)  // Passage explicite de `person` en argument
    return person
}

fun main() {
    val person2 = createPerson2 {
        it.name = "Bob"  // Accès via `it` (paramètre implicite)
        it.age = 30
    }
    person2.introduce()
}
```

### 3. Conclusion

- Les lambdas simplifient la gestion des fonctions anonymes et facilitent la programmation fonctionnelle.

- Les lambdas avec receveur offrent une syntaxe plus naturelle et concise pour configurer des objets, en évitant de répéter la référence à l’objet.

- Cette technique est largement utilisée dans les API Kotlin idiomatiques et dans la création de DSLs