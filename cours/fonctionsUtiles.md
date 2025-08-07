# Kotlin – Fonctions Utiles

---

## Récapitulatif des propriétés de longueur

| Type                          | Propriété  |
| ----------------------------- | ---------- |
| `String`                      | `.length`  |
| `List`, `Set`, `Map`, `Array` | `.size`    |
| `Range`                       | `.count()` |

---

## 1. `trimIndent()`

- Supprime l'indentation commune minimale de toutes les lignes d’une chaîne multilignes. Pratique pour garder un code lisible tout en nettoyant les espaces superflus dans la chaîne.

### Syntaxe

```kotlin
val tripleQuotedString = """
    #question = "$question"
    #answer = $answer
""".trimIndent()
```

```kotlin
val question = "Quelle est la capitale de la France ?"
val answer = "Paris"

val tripleQuotedString = """
    #question = "$question"
    #answer = $answer
""".trimIndent()

println(tripleQuotedString)
// Résultat :
// #question = "Quelle est la capitale de la France ?"
// #answer = Paris
```

---

## 2. `trimMargin()`

- Supprime l'indentation définie par un caractère de marge (par défaut `|` ou ici `#`).

### Syntaxe

```kotlin
val tripleQuotedString = """
    #question = "$question"
    #answer = $answer
""".trimMargin("#")
```

```kotlin
val question = "Quelle est la capitale de la France ?"
val answer = "Paris"

val tripleQuotedString = """
    #question = "$question"
    #answer = $answer
""".trimMargin("#")

println(tripleQuotedString)
// Résultat :
// question = "Quelle est la capitale de la France ?"
// answer = Paris
```

---

## Génération aléatoire (`Random`)

- `list.random()`  
  Choisit un élément aléatoire dans une liste.

- `Random.nextInt(from, until)`  
  Génère un entier aléatoire dans l’intervalle `[from, until)`, c’est-à-dire inclusif sur la borne basse et exclusif sur la borne haute.

---

## Gestion des exceptions : `try` / `catch`

Permet de capturer et gérer des erreurs lors de l’exécution d’un bloc de code.

```kotlin
try {
    val result = 10 / 0  // Peut lancer une ArithmeticException
} catch (e: ArithmeticException) {
    println("Erreur : division par zéro")
}
```

---
