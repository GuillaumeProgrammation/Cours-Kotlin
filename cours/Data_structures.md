# Java - Structures de données

## Équivalences principales

| **Kotlin**               | **Java**                                   | **Comportement**             |
| ------------------------ | ------------------------------------------ | ---------------------------- |
| `listOf(1, 2, 3)`        | `List.of(1, 2, 3)`                         | Liste **immutable**          |
| `mutableListOf(1, 2, 3)` | `new ArrayList<>(Arrays.asList(1, 2, 3))`  | Liste **modifiable**         |
| `arrayListOf(1, 2, 3)`   | `new ArrayList<>(Arrays.asList(1, 2, 3))`  | ArrayList **dynamique**      |
| `arrayOf(1, 2, 3)`       | `Integer[] array = {1, 2, 3}`              | Tableau **taille fixe**      |
| `setOf(1, 2, 2, 3)`      | `new HashSet<>(Arrays.asList(1, 2, 2, 3))` | Collection **sans doublons** |

---

## Points clés

### **Immutable vs Mutable**

- **Kotlin** : `List` = immutable, `MutableList` = modifiable
- **Java** : `List.of()` = immutable, `ArrayList` = modifiable

### **Syntaxe d'accès**

- **Kotlin** : `list[0]` (opérateur surchargé)
- **Java** : `list.get(0)` (méthode explicite)

### **Méthodes courantes**

```java
// Java
list.add(item)          // Ajouter
list.remove(item)       // Supprimer  
list.get(index)         // Accéder
list.set(index, value)  // Modifier
list.size()             // Taille
list.contains(item)     // Contient
```

### Exemple complet en Java :

```java
public class DataStructuresExample {
    public static void main(String[] args) {
        System.out.println("=== STRUCTURES DE DONNÉES JAVA ===\n");

        // =====================================
        // 1. List IMMUTABLE (équivalent List<T> Kotlin)
        // =====================================
        System.out.println("1. Liste Immutable :");
        List<Integer> immutableList = List.of(1, 2, 3);  // Java 9+
        // Alternative pour versions antérieures :
        // List<Integer> immutableList = Arrays.asList(1, 2, 3);

        System.out.println("Liste immutable : " + immutableList);
        System.out.println("Premier élément : " + immutableList.get(0));

        // immutableList.add(4); // ERREUR : UnsupportedOperationException
        // immutableList.set(0, 10); // ERREUR : modification interdite

        System.out.println("Lecture autorisée, Modification interdite\n");

        // =====================================
        // 2. List MUTABLE (équivalent MutableList<T> Kotlin)
        // =====================================
        System.out.println("2. Liste Mutable :");
        List<Integer> mutableList = new ArrayList<>(Arrays.asList(1, 2, 3));

        mutableList.add(4);           // Ajouter un élément
        mutableList.set(0, 10);       // Modifier le premier élément
        mutableList.remove(Integer.valueOf(2)); // Supprimer l'élément 2

        System.out.println("Liste après modifications : " + mutableList);
        System.out.println("Lecture ET modification autorisées\n");

        // =====================================
        // 3. ArrayList (équivalent ArrayList Kotlin)
        // =====================================
        System.out.println("3. ArrayList :");
        ArrayList<Integer> arrayList = new ArrayList<>(Arrays.asList(1, 2, 3));
        arrayList.add(4);

        System.out.println("ArrayList : " + arrayList);
        System.out.println("Taille dynamique, optimisé pour ajouts en fin\n");

        // =====================================
        // 4. Array (équivalent Array<T> Kotlin)
        // =====================================
        System.out.println("4. Tableau (Array) :");
        Integer[] array = {1, 2, 3};  // Taille fixe
        array[0] = 10;  // Modification OK

        System.out.println("Tableau : " + Arrays.toString(array));
        System.out.println("Taille fixe : " + array.length + " éléments");

        // Pas possible d'ajouter des éléments (taille fixe)
        // Pour redimensionner, il faut créer un nouveau tableau
        System.out.println("Impossible d'ajouter des éléments (taille fixe)\n");

        // =====================================
        // 5. Set (équivalent Set<T> Kotlin)
        // =====================================
        System.out.println("5. Set (sans doublons) :");
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 2, 3));

        System.out.println("Set avec doublons supprimés : " + set);

        // Set mutable
        Set<Integer> mutableSet = new HashSet<>(Arrays.asList(1, 2, 3));
        mutableSet.add(4);
        mutableSet.remove(2);
        System.out.println("Set après modifications : " + mutableSet);

        // Set immutable
        Set<Integer> immutableSet = Set.of(1, 2, 3);  // Java 9+
        System.out.println("Set immutable : " + immutableSet);

        System.out.println("\n=== MÉTHODES PRINCIPALES ===");
        demonstrateMethods();

    }
```

```java
    public static void demonstrateMethods() {
        List<String> list = new ArrayList<>(Arrays.asList("Java", "Kotlin", "Python"));

        System.out.println("\nMéthodes List/ArrayList :");
        System.out.println("size() : " + list.size());
        System.out.println("get(index) : " + list.get(0));
        System.out.println("contains() : " + list.contains("Java"));
        System.out.println("indexOf() : " + list.indexOf("Kotlin"));
        System.out.println("isEmpty() : " + list.isEmpty());

        // Itération (équivalent forEach Kotlin)
        System.out.println("\nItération :");
        for (String item : list) {
            System.out.println("- " + item);
        }

        // Avec stream (Java 8+, équivalent map/filter Kotlin)
        System.out.println("\nFiltre avec Stream :");
        list.stream()
            .filter(s -> s.length() > 4)
            .forEach(s -> System.out.println("- " + s));
    }
}
```
