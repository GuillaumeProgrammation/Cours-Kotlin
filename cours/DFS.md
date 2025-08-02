## Parcours en profondeur (DFS - Depth First Search)

### Principe

- Explore le plus loin possible le long d’un chemin avant de revenir en arrière.

- Utilise une pile (stack), souvent de manière implicite via récursion.

### Graphe utilisé :

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

### Implémentation récursive en Kotlin

```kotlin
fun DFSexplore(graph : Map<String, List<String>>, start: String, dejaVu : MutableList<String>) {
    if (dejaVu.contains(start)) {
        return
    }

    dejaVu.add(start)
    var listeNoeuds = graph[start] ?: emptyList()
    for (noeud in listeNoeuds) {
        DFSexplore(graph, noeud, dejaVu)

    }
}

fun DFS(graph: Map<String, List<String>>, start: String): MutableList<String> {
    val dejaVu = mutableListOf<String>()
    DFSexplore(graph, start, dejaVu)
    return dejaVu
}
```

### Implémentation itérative en Kotlin

```kotlin
fun <T> DFSexploreIteratif(graph: Map<T, List<T>>, start: T): List<T> {
    val result = mutableListOf<T>()
    val stack = Pile<T>()
    val visited = mutableSetOf<T>()

    stack.push(start)
    visited.add(start)

    while (!stack.estVide()) {
        val node = stack.pop()!!
        result.add(node)

        // Parcours des voisins dans l'ordre inverse pour respecter l'ordre DFS standard
        var listeNoeud = graph[node] ?: emptyList()
        for (voisin in listeNoeud.asReversed()){
            if (voisin !in visited) {
                visited.add(voisin)
                stack.push(voisin)
            }
        }
    }
    return result
}
```

### Resultat attendu :

- Ordre de visite  :  
  `A → B → D → E → C → F`

### Résumé :

- DFS : empile A - depile A - empile B C (on inverse pour avoir C B, B en haut) - depile B - empile (D E, inversion) - depile D - depile E - depile C - empile F - depile F
  - A - B - D - E - C - F

### Processus :

- Empiler A → Pile : [A]

- Dépiler A → Traiter A → Empiler B, C (inversés → C, B) → Pile : [C, B]

- Dépiler B → Traiter B → Empiler D, E (inversés → E, D) → Pile : [C, E, D]

- Dépiler D → Traiter D (pas de voisins) → Pile : [C, E]

- Dépiler E → Traiter E (pas de voisins) → Pile : [C]

- Dépiler C → Traiter C → Empiler F → Pile : [F]

- Dépiler F → Traiter F → Pile vide → Fin.