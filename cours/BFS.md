## Parcours en largeur (BFS - Breadth First Search)

### Principe

- Explore **d’abord tous les voisins directs** d’un nœud avant de descendre plus loin dans le graphe.

- Utilise une **file (queue)** pour gérer l’ordre des visites.

- Idéal pour trouver le chemin le plus court dans un graphe non pondéré.

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

### Implémentation en Kotlin

```kotlin
fun BFS(graph : Map<String, List<String>>, start : String): MutableList<String>{
    var dejaVu = mutableListOf<String>()
    var file : Queue<String> = LinkedList()

    dejaVu.add(start)
    file.add(start)

    while (!file.isEmpty()){
        var noeud = file.remove()
        var listeNoeud = graph[noeud]
        for (voisin in listeNoeud ?: emptyList()){
            if (voisin !in dejaVu){
                dejaVu.add(voisin)
                file.add(voisin)
            }
        }
    }
    return dejaVu
}
```

### Résultat attendu

- Ordre de visite :  
  `A → B → C → D → E → F`

### Résumé :

- BFS : enfile A - defile A - enfile B C - defile B - enfile D E - defile C - enfile F - defile D - defile E - defile F
  - A - B - C - D - E - F

#### Processus (sommet à droite) :

- Enfiler A → File : [A]

- Défiler A → Traiter A → Enfiler B, C → File : [B, C]

- Défiler B → Traiter B → Enfiler D, E → File : [C, D, E]

- Défiler C → Traiter C → Enfiler F → File : [D, E, F]

- Défiler D → Traiter D (pas de voisins) → File : [E, F]

- Défiler E → Traiter E (pas de voisins) → File : [F]

- Défiler F → Traiter F → File vide → Fin.
