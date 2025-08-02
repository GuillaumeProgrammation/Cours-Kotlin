## File (Queue)

> Structure **FIFO** — First In, First Out

### Opérations principales avec ArrayDeque :
- `.add(x)` : ajoute en fin
- `.remove(First)` ou `remove()` : retire l’élément en tête
- `.first()` : lit l’élément en tête sans le retirer
- `.isEmpty()` : teste si la file est vide

```kotlin
var file = ArrayDeque<Int>()
    file.add(0)
    file.add(1)
    println(file.first())
    file.removeFirst()
    println(file.first())
```

### Exemple avec `LinkedList` (Java) :
```kotlin
import java.util.LinkedList
import java.util.Queue

val file: Queue<Int> = LinkedList()
file.add(1)
file.add(2)
val x = file.remove() // x = 1
```

### Exemple avec `MutableList` :
```kotlin
val file = mutableListOf<Int>()
file.add(1)            // Enfiler
val x = file.removeAt(0) // Défiler
```

---

## ⚠️ Comparaison

| Aspect        | Pile                         | File                         |
|---------------|------------------------------|------------------------------|
| Ordre         | LIFO (dernier entré, premier sorti) | FIFO (premier entré, premier sorti) |
| Ajout         | `push()`                     | `add()` ou `enqueue()`       |
| Retrait       | `pop()`                      | `remove()` ou `dequeue()`    |
| Observation   | `top()`                      | `peek()`                     |

---

## 🛠️ Cas d'utilisation
---

- **Pile** :
  - Annulation (undo)
  - Analyse syntaxique
  - Parcours en profondeur (DFS)
- **File** :
  - Ordonnancement de tâches
  - Parcours en largeur (BFS)
  - Traitement de files d'attente (ex : impressions, réseaux)