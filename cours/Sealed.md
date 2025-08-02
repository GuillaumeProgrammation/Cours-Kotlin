## `sealed class` - Hiérarchies Fermées

### Utilité

- Représenter des hiérarchies de classes limitées

- Alternative aux unions algébriques

- Tous les sous-types connus à la compilation

- Besoin de modéliser des états ou des hiérarchies avec des données variées

### Syntaxe de Base

```kotlin
sealed class Result<out T>
data class Success<T>(val data: T) : Result<T>()
data class Error(val message: String) : Result<Nothing>()
object Loading : Result<Nothing>()
```

### Exemple Complet

```kotlin
sealed class PaymentMethod {
    abstract val maxAmount: Double

    data class CreditCard(
        val number: String,
        val expiry: String
    ) : PaymentMethod() {
        override val maxAmount = 10000.0
    }

    data class PayPal(
        val email: String
    ) : PaymentMethod() {
        override val maxAmount = 5000.0
    }

    object Cash : PaymentMethod() {
        override val maxAmount = 2000.0
    }
}

fun processPayment(method: PaymentMethod) = when(method) {
    is PaymentMethod.CreditCard -> println("Processing card ${method.number}")
    is PaymentMethod.PayPal -> println("Processing PayPal ${method.email}")
    PaymentMethod.Cash -> println("Accepting cash")
    // Pas besoin de 'else' grâce au sealed
}
```

### Avantages Clés

- **Extensibilité** : Chaque sous-classe peut avoir ses propres propriétés

- **Exhaustivité** : Le compilateur vérifie tous les cas dans les `when`

- **Polymorphisme** : Vraie hiérarchie orientée objet

---

## Bonnes Pratiques :

### Pour les `sealed class` :

1. Modélisez des états complexes, pattern matching

```kotlin
sealed class Expression {
    data class Number(val value: Int) : Expression()
    data class Sum(val left: Expression, val right: Expression) : Expression()
    data class Multiply(val left: Expression, val right: Expression) : Expression()

    fun eval(): Int = when(this) {
        is Number -> value
        is Sum -> left.eval() + right.eval()
        is Multiply -> left.eval() * right.eval()
    }
}
```
