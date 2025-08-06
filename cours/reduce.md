## Fonction `reduce`

```kotlin
val result = collection.reduce { acc, element -> ... }
```

### Description

- Comme `fold`, mais **sans valeur initiale**.

- Le premier élément est utilisé comme point de départ (`acc`).

- **Erreur si la collection est vide**.

```kotlin
val product = listOf(2, 3, 4).reduce { acc, n -> acc * n }  // 24
```

## Fonctionnement étape par étape

1. `numbers = [2, 3, 4]`

2. Appel à `reduce { acc, n -> acc * n }`

### tapes internes :

| Étape | `acc` | `n` | Calcul  | Résultat |
| ----- | ----- | --- | ------- | -------- |
| 1     | 2     | 3   | `2 * 3` | 6        |
| 2     | 6     | 4   | `6 * 4` | 24       |

## Comparaison avec `fold`

Avec `fold`, on peut définir une valeur de départ :

```kotlin
val result = listOf(2, 3, 4).fold(1) { acc, n -> acc * n } // 24
```

```kotlin
val result = listOf(2, 3, 4).fold(0) { acc, n -> acc * n } // 0
```

➡️ La **valeur initiale influence** le résultat.
