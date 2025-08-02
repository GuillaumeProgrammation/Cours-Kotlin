### **Value Classes en Kotlin**

*Typage fort sans surcharge mémoire*

#### **Définition :**

Une `value class` encapsule une seule valeur, avec un **type fort**, mais **sans coût mémoire** : elle est **inlinée** par le compilateur.

## Syntaxe

```kotlin
@JvmInline
value class TypeName(val property: Type)
```

- Un seul champ `val`

- Pas de `var`, pas de plusieurs propriétés

- Peut avoir des fonctions membres

### Exemple :

```kotlin
@JvmInline
value class Email(val value: String){ // Compilé comme `String` à l'exécution
    fun sendEmail(adress: Email){
        // ...
    }
}
```

- En mémoire, `Email("a@b.com")` est compilé comme `"a@b.com"`.

## Buts principaux

| Objectif          | Exemple                                      |
| ----------------- | -------------------------------------------- |
| Typage fort       | `UserId(val: Int)` ≠ `ProductId(val: Int)`   |
| Zéro coût mémoire | Pas d'objet alloué                           |
| API plus sûre     | Tu ne passes pas un simple `String` ou `Int` |

### **Limites Techniques**

#### ❌ **Interdits**

```kotlin
// 1. Plusieurs propriétés
@JvmInline
value class Coord(val x: Int, val y: Int)  // ❌ Erreur

// 2. Propriété mutable
@JvmInline
value class Mutable(var value: Int)  // ❌ Erreur

// 3. Constructeurs secondaires
@JvmInline
value class Money(val amount: Double) {
    constructor(euros: Int) : this(euros.toDouble())  // ❌ Erreur
}

@JvmInline
value class Wrapper(val a: Int) {
    val b: Int = a * 2 // ❌ Erreur : propriétés secondaires interdites
}
```

#### ⚠️ **Déconseillés**

```kotlin
// 1. Nullable (perd l'inlining)
val email: Email? = null  // ⚠️ Allocation mémoire

// 2. Collections (boxing possible)
val ids: List<UserId> = listOf(UserId(1), UserId(2))  // ⚠️ Performance

// 3. Init
@JvmInline
value class Temperature(val celsius: Double) {
    init {
        require(celsius > -273.15) // ❌ Erreur à l'exécution → évite init
    }
}

```

### **Résumé**

- **Pour** : Typage fort, sécurité, zéro overhead.

- **Contre** : Pas de multi-champs, nullable coûteux.

- **À retenir** :
  
  > *"Une `value class` est un wrapper single-field qui disparaît à l'exécution."*
  > 
  > wrapper  : boîte autour d’une valeur pour mieux la contrôler.



Un **wrapper** (ou *"enveloppeur"* en français) est un concept qui consiste à **encapsuler une valeur ou un objet** dans un autre type pour :

1. **Ajouter du sens** (sémantique)
   
   - Exemple : `Email("test@mail.com")` au lieu d’utiliser directement `String`.
   
   - → Plus clair qu’un simple `String` ou `Int`.

2. **Contrôler l’usage** (sécurité)
   
   - Exemple : `Password("123")` ne peut pas être utilisé comme un `String` classique.

3. **Modifier/compléter le comportement**
   
   - Exemple : Ajouter des méthodes comme `.isValid()`.
