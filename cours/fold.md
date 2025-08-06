# **Fonction `fold` en Kotlin**

### But

La fonction **`fold`** sert à **réduire une liste en un seul résultat** (somme, multiplication, etc.).  
Elle **cumule progressivement** les valeurs d'une collection.

**Attention** : Contrairement à `map`, **`fold` ne retourne pas une liste**, mais **une seule valeur**.

### Exemple : Somme des éléments

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sum = numbers.fold(0) { acc, num -> acc + num }

println(sum)  // 15
```

`acc` est **l'accumulateur** (valeur intermédiaire). 
`num` est **l'élément actuel**.

### **Visualisation sous forme d'une pile d'appels :**

- **Initial** : `acc = 1` (premier élément de la liste)
- **1er appel** : `acc = 1`, `num = 2` → `acc = 3`
- **2e appel** : `acc = 3`, `num = 3` → `acc = 6`
- **3e appel** : `acc = 6`, `num = 4` → `acc = 10`
- **4e appel** : `acc = 10`, `num = 5` → `acc = 15`

Finalement, `fold` retourne la valeur **15**.

La fonction **`fold`** commence avec le premier élément de la liste, puis elle applique la fonction binaire (ici, l'addition) à cet élément et au suivant. Ce processus se répète jusqu'à ce que tous les éléments aient été traités. À chaque itération, l'**accumulateur (`acc`)** reçoit la somme des valeurs traitées jusqu'à ce point.

### Comparaison avec reduce :

#### reduce :

- Pas de valeur initiale : utilise le premier élément de la collection comme accumulateur initial
- Lance une exception (NoSuchElementException) si la collection est vide
- Plus simple quand la collection n’est jamais vide et que le calcul commence avec le 1er élément

```kotlin
val sum2 = numbers.reduce { acc, num -> acc + num }
println(sum2)  // 15
```