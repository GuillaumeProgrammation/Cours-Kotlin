### Notion de **`sequences`**

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

---

## Comparaison : `List` vs `Sequence`

### Avec des listes (`List`, `Map`, etc.)

Chaque opération (`map`, `filter`, ...) **crée une nouvelle collection** :

```kotlin
val result = list
    .map { it * 2 }          // crée une nouvelle liste
    .filter { it > 10 }      // crée encore une nouvelle liste
    .take(5)                 // crée encore une
```

➡️ **Coût mémoire élevé** si la liste est grande. Toutes les étapes sont **évaluées immédiatement** (eager).

### Avec `Sequence`

Les opérations sont **paresseuses (lazy)** : elles ne s’exécutent **qu’au moment du besoin**, et **une seule fois par élément**.

```kotlin
val result = list
    .asSequence()
    .map { it * 2 }          // rien n’est évalué ici
    .filter { it > 10 }      // toujours rien
    .take(5)                 // toujours rien
    .toList()                // tout est évalué ici, en une seule passe
```

---

### Exemple concret

```kotlin
val bigList = (1..1_000_000).toList()

val result = bigList
    .asSequence()
    .map { it * 2 }
    .filter { it % 5 == 0 }
    .take(10)
    .toList()
```

- Ici, Kotlin **ne traite que les 10 premiers éléments correspondant au filtre**, **sans parcourir toute la liste**, grâce à l'évaluation paresseuse.

---

## Règle pratique

| Situation                            | Utilise               |
| ------------------------------------ | --------------------- |
| Petites collections                  | `List` (plus lisible) |
| Chaînes d’opérations complexes       | `Sequence`            |
| Collections très grandes ou infinies | `Sequence`            |

---

## En résumé

| Critère      | List (eager)                       | Sequence (lazy) |
| ------------ | ---------------------------------- | --------------- |
| Évaluation   | Immédiate                          | Paresseuse      |
| Mémoire      | Plus de collections intermédiaires | Moins           |
| Performances | Moins bon sur gros volumes         | Meilleur        |
| Simplicité   | Plus simple à lire                 | Plus verbeux    |
