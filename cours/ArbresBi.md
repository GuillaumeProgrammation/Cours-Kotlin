## Arbres binaires

### Définition
Un **arbre binaire** est un type particulier d’arbre où chaque nœud a **au plus deux enfants** :
- Un **enfant gauche**,
- Un **enfant droit**.

### Représentation en Kotlin
```kotlin
class Node(val value : Int
    var left:  Node?  = null
    var right: Node? = null
)
```

### 3. Arbres Binaires de Recherche (ABR ou BST)

### Définition
Un arbre binaire de recherche est un arbre binaire ordonné :

- Tous les nœuds du sous-arbre gauche ont une valeur strictement inférieure à celle du nœud parent.
- Tous les nœuds du sous-arbre droit ont une valeur strictement supérieure.

### Objectifs

Permet des opérations efficaces :

- Insertion,

- Recherche,

- Suppression.

Exemple (structure) :

```md
      8
     / \
    3   10
   / \    \
  1   6    14
```

### Representation d'une classe Node : 

```kotlin
fun main(){
    val tree = Node(10,
        Node(8,
            Node(6),
            Node(9)),
        Node(11)
    )
    println("Arbre initial: $tree")
    println("Taille: ${tree.size()}")
    println("Hauteur: ${tree.high()}")
    println("Profondeur : ${tree.depth(6)}")
    println("PreOrder: ${tree.preOrder()}")
    val newTree = tree.delete(6)
    println("\nAprès suppression de 6: $newTree")
    println(newTree!!.BFS())
}

class Node(val value : Int, val left : Node? = null, val right : Node? = null){

    override fun toString(): String {
        return "(${value}, left : ${left}, right : ${right})"
    }

    fun size(): Int{
        return 1 + (left?.size() ?: 0) + (right?.size() ?: 0)
    }

    fun high(): Int{
        return 1 + maxOf(left?.high() ?: 0, right?.high() ?: 0)
    }

    fun depth(value : Int): Int{
        return depthFun(value, this, 0)
    }

    fun depthFun(value : Int, current : Node?, currentDepth : Int): Int{
        if (current == null) return -1

        if (current.value == value){
            return currentDepth
        }

        var leftDepth = depthFun(value, current.left, currentDepth + 1)
        var rightDepth = depthFun(value, current.right, currentDepth + 1)

        return maxOf(leftDepth, rightDepth)
    }

    fun contains(value : Int): Boolean{
        return when {
            value < this.value -> left?.contains(value) ?: false
            value > this.value -> right?.contains(value) ?: false
            else -> true
        }
    }

    fun delete(value: Int): Node? {
        return when {
            value < this.value -> Node(this.value, left?.delete(value), right)
            value > this.value -> Node(this.value, left, right?.delete(value))
            else -> {
                when {
                    left == null -> right
                    right == null -> left
                    else -> {
                        val minValue = right.findMinValue()
                        Node(minValue, left, right.delete(minValue))
                    }
                }
            }
        }
    }

    private fun findMinValue(): Int = left?.findMinValue() ?: value

    fun insert(value: Int): Node {
        return when{
            value < this.value -> Node(this.value, left?.insert(value) ?: Node(value), right)
            value > this.value -> Node(this.value, left, right?.insert(value) ?: Node(value))
            else -> this
        }
    }

    // ---PARCOURS---

    // racine -> gauche -> droite
    fun preOrder(): List<Int>{
        return listOf(value) + (left?.preOrder() ?: emptyList()) + (right?.preOrder() ?: emptyList())
    }

    // gauche -> racine -> droite
    fun inOrder(): List<Int> {
        return (left?.inOrder() ?: emptyList()) +
                listOf(value) +
                (right?.inOrder() ?: emptyList())
    }

    // gauche -> droite -> racine
    fun postOrder(): List<Int> {
        return (left?.postOrder() ?: emptyList()) +
                (right?.postOrder() ?: emptyList()) +
                listOf(value)
    }
    fun BFS(): List<Int>{
        return BFSfun(this)
    }

    fun DFS(): List<Int>{
        return DFSfun(this)
    }

    private fun BFSfun(root : Node): List<Int>{
        val file = ArrayDeque<Node>()
        val result = mutableListOf<Int>()
        file.add(root)

        while (file.isNotEmpty()){
            var node = file.removeFirst()
            result.add(node.value)
            node.left?.let { file.add(node.left) } // pas de verification de doublons pour un arbre binaire
            node.right?.let { file.add(it) }
        }
        return result
    }

    private fun DFSfun(node : Node?): List<Int>{
        if (node == null) return emptyList()

        var current = listOf(node.value)
        var left = DFSfun(node.left!!)
        var right = DFSfun(node.right!!)

        return current + left + right
    }

}
```