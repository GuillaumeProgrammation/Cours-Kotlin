# Kotlin – Fonctions Utiles

---

## 1. `trimIndent()`

### Utilité

Supprime l'indentation commune minimale de toutes les lignes d’une chaîne multilignes. Pratique pour garder un code lisible tout en nettoyant les espaces superflus dans la chaîne.

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

### Utilité

Supprime l'indentation définie par un caractère de marge (par défaut `|` ou ici `#`).

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

# Le type `Nothing` en Kotlin

---

## Utilité

`Nothing` est un type spécial en Kotlin qui n’a **aucune valeur**. Il est utilisé pour indiquer qu’une fonction **ne retourne jamais normalement** (par exemple, elle lance une exception ou boucle infiniment).

## Exemple d’utilisation

```kotlin
fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}
```

### Exemple avec `Nothing` dans une expression

```kotlin
val value: String = getValue() ?: fail("Valeur manquante")
```

---

## Génération aléatoire (`Random`)

- `list.random()`  
  Choisit un élément aléatoire dans une liste.

- `Random.nextInt(from, until)`  
  Génère un entier aléatoire dans l’intervalle `[from, until)`, c’est-à-dire inclusif sur la borne basse et exclusif sur la borne haute.

---

## Fonctions utilitaires utiles

- `joinToString(separator: String)`  
  Transforme une collection en une chaîne en concaténant ses éléments avec un séparateur donné.

```kotlin
val fruits = listOf("Pomme", "Banane", "Cerise")
val result = fruits.joinToString(", ")
println(result)  // "Pomme, Banane, Cerise"
```

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
