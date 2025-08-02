# <u>Les structures de données en Kotlin :</u>

## **1. List vs MutableList**

### **`List<T>` (Immutable)**

Une `List` est **immutable**, ce qui signifie que tu ne peux **pas modifier** son contenu après sa création.

```kotlin
val list = listOf(1, 2, 3)  // Liste fixe
// list.add(4) // Erreur : Impossible d'ajouter un élément
println(list[0])  // OK : Accès en lecture
```

✅ **Lecture autorisée (`list[index]`, `forEach`, etc.)** 
🚫 **Pas de modification (`add()`, `remove()`, etc. interdits)**

### **`MutableList<T>` (Modifiable)**

Une `MutableList` est une `List` **modifiable**, ce qui signifie que tu peux **ajouter, supprimer ou modifier** des éléments.

```kotlin
val mutableList = mutableListOf(1, 2, 3)
mutableList.add(4)  // OK : Ajoute 4
mutableList[0] = 10  // OK : Modifie le premier élément
mutableList.remove(2)  // OK : Supprime l'élément 2
println(mutableList)  // Affiche : [10, 3, 4]
```

✅ **Lecture ET modification autorisées**

**💡 Astuce :** Toujours utiliser `List<T>` si la liste ne doit pas être modifiée (meilleure sécurité et optimisation).

---

## **2. ArrayList**

`ArrayList` est une implémentation spécifique de `MutableList`, similaire à une `MutableList`, mais qui **stocke les éléments sous forme de tableau dynamique**.

```kotlin
val arrayList = arrayListOf(1, 2, 3)
arrayList.add(4)  // OK
println(arrayList)  // Affiche : [1, 2, 3, 4]
```

🔹 `ArrayList` et `MutableList` ont des comportements très similaires.  
🔹 `ArrayList` peut être plus performant pour **ajouter des éléments** à la fin.

---

## **3. Array vs List**

- **`Array<T>`** : Taille **fixe**, accessible via `array[i]`.
- **`List<T>`** : Taille **variable** (sauf `listOf()` qui est immutable).

```kotlin
val array = arrayOf(1, 2, 3)  // Tableau
array[0] = 1  // OK
// array.add(4) // Erreur : Impossible d'ajouter un élément (taille fixe)
```

💡 **Utiliser `Array` quand la taille est connue à l'avance, sinon `List` ou `MutableList`**.

---

## **4. Set**

### **`Set<T>` (Liste sans doublons)**

Un `Set` est une collection **sans doublons**.

```kotlin
val set = setOf(1, 2, 2, 3)  
println(set)  // Affiche : [1, 2, 3]
```
