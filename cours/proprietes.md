
# Kotlin – Propriétés, `get`, `set`, `field`, `value` et propriétés d'extension

## 1. Propriétés en Kotlin

Une **propriété** en Kotlin est une combinaison d’un champ + des accesseurs (`get` / `set`).

### Exemple simple :
```kotlin
var nom: String = "Gui"
```

Par défaut, cela génère :
```kotlin
get() = field
set(value) { field = value }
```
- Ainsi une variable possède un getter et un setter permettant d'accéder et modifier la variable.
- val ne génère qu’un getter.

### Lecture et accès d'une variable

```kotlin
print(nom) ≈ print(nom.get()) ≈ print("Gui")
nom = "Sami" ≈ nom.set("Sami")
```

- Le get() est appelé automatiquement, je ne peux pas l’appeler comme une méthode.
- Le set(value) est appelé automatiquement également.
- nom.get() et nom.set(...) ne sont pas des syntaxes valides en Kotlin.
Ce sont des opérations internes gérées par le compilateur.
---

## 2. Getter (`get`) et Setter (`set`)

Permettent de **contrôler l’accès** (lecture/écriture) à une propriété.

### Mots-clés :
- `field` : champ interne de stockage. Utilisable uniquement dans `get` et `set`.
- `value` : valeur passée à `set`. Utilisable uniquement dans `set`.

### Exemple avec logique personnalisée :

```kotlin
var age: Int = 0
    get() {
        println("get → $field")
        return field
    }
    set(value) {
        if (value >= 0) field = value
    }
```

---

## 3. Exemple avec `field` et `value` (repris de ton code) :

```kotlin
fun main() {
    var myEmail = Email("exemple@gmail.com", "France")
    myEmail.emailType = "gmail"
    println(myEmail.introduce)
}

class Email(val emailAdress: String, val country: String) {
    var emailType: String = ""
        get() = field
        set(value) {
            field = value.replaceFirstChar { it.uppercase() }
        }
}
```

### Analyse :
- `emailType` est modifiée via `set(value)`, qui capitalise la première lettre.
- `field` contient la valeur réelle.
- Appeler `myEmail.emailType = "gmail"` → `field` devient `"Gmail"`.

---

## 4. Propriétés d'extension

Permettent d’**ajouter des propriétés en lecture seule** à des classes **sans les modifier**.

### Syntaxe :
```kotlin
val Type.nomPropriete: TypeRetour
    get() = ... // logique
```

### Exemple avec ton code :

```kotlin
val Email.introduce: String
    get() = "My email adress is : $emailAdress \nI come from $country"
```

### Utilisation :
```kotlin
println(myEmail.introduce)
```

→ Cela affiche une phrase descriptive construite à partir des propriétés internes.

---

## Comparaison Fonction extension vs Propiete d'extension
| Caractéristique              | Fonction d’extension                    | Propriété d’extension                     |
|-----------------------------|-----------------------------------------|-------------------------------------------|
| Peut avoir des paramètres   | ✅ Oui                                   | ❌ Non                                     |
| Peut être en lecture seule  | ✅ Oui (retour de fonction)              | ✅ Oui (toujours)                          |
| Peut être en écriture       | ✅ Oui (si fonction modifie via set)     | ❌ Non (pas de setter)                     |
| Utilise `get()`             | ❌ Non                                   | ✅ Oui (obligatoire)                       |
| Utilise `field`             | ❌ Non                                   | ❌ Non (pas de backing field)              |
| A une logique de calcul     | ✅ Oui                                   | ✅ Oui                                     |
| Ajoute du **comportement**  | ✅                                        | ✅, mais de manière limitée à la lecture   |


### Exemple : 

```kotlin
class Personne(var nom: String)

fun Personne.renommer(nouveauNom: String) {
    this.nom = nouveauNom  // Modifie l'objet
}

val Personne.presentation: String
    get() = "Bonjour, je m'appelle $nom"  // Lecture seule

```
--- 
## 5. Résumé

| Élément      | Rôle                                           |
|--------------|------------------------------------------------|
| `get()`      | Contrôle la lecture d’une propriété            |
| `set(value)` | Contrôle l’écriture d’une propriété            |
| `field`      | Accès au champ de stockage de la propriété     |
| `value`      | Nouvelle valeur passée au setter               |
| Propriété d’extension | Ajoute une propriété `val` calculée à une classe existante |

---

## 6. Bonnes pratiques

- Utiliser `set` pour valider ou transformer les données.
- Garder `field` uniquement dans les `get`/`set`, jamais ailleurs.
- Utiliser des **propriétés d'extension** pour ajouter des comportements sans modifier la classe.
