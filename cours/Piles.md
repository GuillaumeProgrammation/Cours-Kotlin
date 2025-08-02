## Pile (Stack)

> Structure **LIFO** — Last In, First Out

### Opérations principales via ArrayDeque:
- `.add(x)` : empile un élément
- `.removeLast()` : dépile (retire) le dernier élément ajouté
- `.last()` : lit le sommet sans le retirer
- `.isEmpty()` : teste si la pile est vide

```kotlin
var pile = ArrayDeque<Int>()
    pile.add(0)
    pile.add(1)
    pile.removeLast() // 1
    pile // [0]
    pile.last() // 0
```
### Exemple Kotlin d'implementation :
```kotlin
class Pile<T> {
    private val elements = mutableListOf<T>()

    fun push(elem: T) = elements.add(elem)
    fun pop(): T? = if (!isEmpty()) elements.removeLast() else null
    fun top(): T? = elements.lastOrNull()
    fun isEmpty() = elements.isEmpty()
}
```

## 🛠️ Cas d'utilisation

- **Pile** :
  - Annulation (undo)
  - Analyse syntaxique
  - Parcours en profondeur (DFS)

- **File** :
  - Ordonnancement de tâches
  - Parcours en largeur (BFS)
  - Traitement de files d'attente (ex : impressions, réseaux)
