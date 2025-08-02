# Guide de Choix Kotlin : Types de Classes

| Critère de Choix                           | Solution Recommandée              | Alternatives                |
| ------------------------------------------ | --------------------------------- | --------------------------- |
| **Besoin de plusieurs instances**          | `class` ou `data class`           | -                           |
| **Besoin d'une seule instance**            | `object` ou `data object`         | -                           |
| **Stockage de données simples**            | `data class`                      | `class` si logique complexe |
| **Logique métier complexe**                | `class`                           | -                           |
| **Base commune partiellement implémentée** | `abstract class`                  | `interface` si pas d'état   |
| **Définir un contrat/comportement**        | `interface`                       | `abstract class` si état    |
| **Relation "est-un" (héritage)**           | `open class` + `override`         | Composition si possible     |
| **Éviter la duplication de code**          | Délégation (`by`)                 | -                           |
| **Propriété calculée/observable**          | Délégation de propriété           | -                           |
| **Singleton avec toString() lisible**      | `data object`                     | `object` si pas besoin      |
| **Singleton utilitaire**                   | `object`                          | -                           |
| **Valeurs constantes typées**              | `enum class`                      | -                           |
| **Hiérarchie fermée de types**             | `sealed class`/`sealed interface` | -                           |

## Exemple complet :

```kotlin
// Étape 1 : Simple data class
data class User(val name: String)

// Étape 2 : Ajout validation
data class User(val name: String) {
    init { require(name.isNotBlank()) }
}

// Étape 3 : Hierarchie sealed
sealed interface UserResult {
    data class Success(val user: User) : UserResult
    data class Error(val message: String) : UserResult
}
```

```kotlin
// Interface + Delegation
interface Logger { fun log(message: String) }

class ConsoleLogger : Logger { /*...*/ }

class Service(logger: Logger = ConsoleLogger()) : Logger by logger {
    // Peut surcharger des méthodes
}
```

```kotlin
// Sealed + Data Object
sealed class Payment {
    data class Card(val number: String) : Payment()
    data object Cash : Payment()
}

fun process(payment: Payment) = when(payment) {
    is Payment.Card -> "Paiement carte ${payment.number.takeLast(4)}"
    Payment.Cash -> "Paiement espèces"
}
```

## Vocabulaire et syntaxe :

- | Terme              | Définition                                                                                           | Exemple Kotlin                | Erreur Fréquente                                   |
  | ------------------ | ---------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------------------- |
  | **Implémentation** | Réalisation concrète d'un contrat (interface/classe abstraite) ou code d'une fonctionnalité          | `override fun draw() { ... }` | Confondre avec l'héritage de classe                |
  | **Héritage**       | Mécanisme permettant à une classe d'acquérir les caractéristiques d'une autre classe **avec `open`** | `class Child : Parent()`      | Oublier `open` avant la classe parent              |
  | **Implémenter**    | Respecter le contrat d'une **interface** (toujours avec `:`)                                         | `class Button : Clickable`    | `class Button : View()` (✖ si View est une classe) |

**Bonnes Pratiques** :

1. **Différence clé** :

```kotlin
// ✅ Correct
class A : B()       // Héritage (B doit être open)
class C : D         // Implémentation (D est une interface)

// ❌ Incorrect
class E : F()       // Erreur si F n'est pas open
```

1. **Terminologie précise** :
   
   - "La classe `FileLogger` **implémente** l'interface `Logger`"
   
   - "La classe `Dog` **hérite** de la classe `Animal`"

2. **Contexte multiple** :
   
   - *Implémentation* peut désigner :
     
     - L'action d'`override` (méthode concrète)
     
     - Le code source d'une fonctionnalité

**ASTUCE** : Pensez à la relation :

- **Héritage** = "EST UN" (is-a)

- **Implémentation** = "PEUT FAIRE" (can-do)

**En résumé :**

- **`:` + classe (abstraite ou non)** → "Hériter de"

- **`:` + interface** → "Implémenter"

- Le terme ne dépend pas du contenu (abstrait/concret) mais du type (class/interface).
