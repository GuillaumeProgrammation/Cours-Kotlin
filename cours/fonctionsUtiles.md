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

**`sequences`**

```kotlin
val seq = listOf(1, 2, 3).asSequence()
// ou
val seq = sequenceOf(1, 2, 3)
```

### Description

- Structure **lazy** (paresseuse) pour traiter des données.

- Les opérations intermédiaires (`map`, `filter`, etc.) ne sont **pas évaluées immédiatement**.

- Optimise les performances en évitant les structures intermédiaires.

### Opérations

#### Intermédiaires (lazy)

- `map`, `filter`, `take`, `distinct`, etc.

#### Terminales (déclenchent l’évaluation)

- `toList()`, `count()`, `first()`, `maxOrNull()`, etc.

```kotlin
val result = listOf(1, 2, 3, 4)
    .asSequence()
    .map { it * 2 }
    .filter { it > 4 }
    .toList()  // [6, 8]
```
