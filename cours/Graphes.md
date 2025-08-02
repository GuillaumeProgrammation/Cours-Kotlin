# Parcours de graphes en Kotlin

# Parcours de graphes en Kotlin

## Qu’est-ce qu’un graphe ?

Un **graphe** est une structure de données composée de :

- **Nœuds (ou sommets)** : éléments représentant des entités.

- **Arêtes (ou liens)** : connexions entre ces nœuds.

Un graphe peut être :

- **Orienté** (arêtes avec une direction)

- **Non orienté** (arêtes sans direction)

Il sert à modéliser de nombreux problèmes : réseaux, relations, chemins, etc.

## Représentation du graphe en Kotlin

On peut représenter un graphe orienté avec une **Map** où :

- Chaque clé est un nœud,

- Chaque valeur est la liste des voisins accessibles depuis ce nœud.

```kotlin
val graph = mapOf(
    "A" to listOf("B", "C"),
    "B" to listOf("D", "E"),
    "C" to listOf("F"),
    "D" to emptyList(),
    "E" to emptyList(),
    "F" to emptyList()
)          
```

Ici, par exemple :

- Le nœud `"A"` pointe vers `"B"` et `"C"`,

- `"B"` pointe vers `"D"` et `"E"`,

- `"C"` pointe vers `"F"`,

- `"D"`, `"E"`, et `"F"` n’ont pas de voisins (feuilles).

## Résumé des parcours

| Parcours             | Structure de données utilisée | Ordre d’exploration typique                  | Description                                                       |
| -------------------- | ----------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| **DFS (profondeur)** | Pile (stack)                  | Explore un chemin jusqu’au bout avant retour | Explore profondément en suivant un chemin, via récursion ou pile. |
| **BFS (largeur)**    | File (queue)                  | Explore niveau par niveau                    | Explore tous les voisins proches avant d’aller plus loin.         |

## Exemple d’ordre d’exploration

| Étape           | BFS                    | DFS                             |
| --------------- | ---------------------- | ------------------------------- |
| 1               | Enfile A               | Empile A                        |
| 2               | Défiler A, enfile B, C | Dépile A, empile C, B (inversé) |
| 3               | Défiler B, enfile D, E | Dépile B, empile E, D           |
| 4               | Défiler C, enfile F    | Dépile D                        |
| 5               | Défiler D              | Dépile E                        |
| 6               | Défiler E              | Dépile C, empile F              |
| 7               | Défiler F              | Dépile F                        |
| **Ordre final** | A - B - C - D - E - F  | A - B - D - E - C - F           |
