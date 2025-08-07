## Map (Collections Associées)

### **Création & Accès**

| **Kotlin**                        | **Java**                         |
| --------------------------------- | -------------------------------- |
| `mapOf(1 to "Alice", 2 to "Bob")` | `Map.of(1, "Alice", 2, "Bob")`   |
| `mutableMapOf<Int, String>()`     | `new HashMap<Integer, String>()` |
| `map[1]`                          | `map.get(1)`                     |
| `map[key] = value`                | `map.put(key, value)`            |

---

## Points clés

### **Immutable vs Mutable**

- **Kotlin** : `mapOf` = immutable, `mutableMapOf` = modifiable
- **Java** : `Map.of()` = immutable, `HashMap` = modifiable

### **Syntaxe d'accès**

- **Kotlin** : `map[key]` (opérateur surchargé) + `1 to "Alice"`
- **Java** : `map.get(key)` + `map.put(1, "Alice")`

---

### **Méthodes courantes**

```java
// Java
map.put(key, value)         // Ajouter/Modifier
map.get(key)                // Accéder
map.remove(key)             // Supprimer
map.size()                  // Taille
map.containsKey(key)        // Contient la clé
map.keySet()                // Ensemble des clés
map.values()                // Collection des valeurs
```

---

### Exemple :

```java
public class DataStructuresExample {
    public static void main(String[] args) {
        System.out.println("=== STRUCTURES DE DONNÉES JAVA ===\n");

        // =====================================
        // 6. MAP - Collections Associées (équivalent Map<K,V> Kotlin)
        // =====================================
        System.out.println("\n6. Map (Collections clé-valeur) :");

        // Map IMMUTABLE (équivalent mapOf Kotlin)
        Map<Integer, String> immutableMap = Map.of(1, "Alice", 2, "Bob");
        System.out.println("Map immutable : " + immutableMap);
        System.out.println("Accès par clé map.get(1) : " + immutableMap.get(1));

        // immutableMap.put(3, "Charlie"); // ERREUR : modification interdite
        System.out.println("✅ Lecture autorisée, ❌ Modification interdite\n");

        // Map MUTABLE (équivalent mutableMapOf Kotlin)
        Map<Integer, String> students = new HashMap<>();
        students.put(1, "Alice");  // Ajouter
        students.put(2, "Bob");

        // Ajouter un élément
        students.put(3, "Charlie");

        // Modifier un élément
        students.put(2, "Robert");

        // Supprimer un élément
        students.remove(1);

        System.out.println("Map après modifications : " + students);
        System.out.println("✅ Lecture ET modification autorisées\n");

        System.out.println("\n=== MÉTHODES PRINCIPALES ===");
        demonstrateMapMethods();
    }
```

```java
public static void demonstrateMapMethods() {
        Map<String, Integer> mutableMap = new HashMap<>();
        mutableMap.put("a", 1);
        mutableMap.put("b", 2);

        System.out.println("\nMéthodes Map principales :");

        // put() - Ajouter/Modifier
        mutableMap.put("c", 3);  // Ajoute
        mutableMap.put("b", 10); // Modifie (remplace la valeur)
        System.out.println("Après put() : " + mutableMap);

        // putIfAbsent() - Ajouter seulement si clé n'existe pas
        mutableMap.putIfAbsent("b", 5);  // Ne modifie pas (clé existe)
        mutableMap.putIfAbsent("d", 4);  // Ajoute (clé n'existe pas)
        System.out.println("Après putIfAbsent() : " + mutableMap);

        // replace() - Remplacer si clé existe
        mutableMap.replace("b", 20);  // Remplace
        mutableMap.replace("z", 100); // Ne fait rien (clé n'existe pas)
        System.out.println("Après replace() : " + mutableMap);

        // Accès aux éléments
        System.out.println("\nAccès aux éléments :");
        System.out.println("get('a') : " + mutableMap.get("a"));
        System.out.println("getOrDefault('z', 0) : " + mutableMap.getOrDefault("z", 0));

        // Vérifications
        System.out.println("\nVérifications :");
        System.out.println("containsKey('b') : " + mutableMap.containsKey("b"));
        System.out.println("containsValue(20) : " + mutableMap.containsValue(20));
        System.out.println("size() : " + mutableMap.size());
        System.out.println("isEmpty() : " + mutableMap.isEmpty());

        // Suppression
        mutableMap.remove("a");
        System.out.println("Après remove('a') : " + mutableMap);

        // Itération sur Map
        System.out.println("\nItération sur Map :");
        for (Map.Entry<String, Integer> entry : mutableMap.entrySet()) {
            System.out.println("Clé: " + entry.getKey() + ", Valeur: " + entry.getValue());
        }

        // Itération sur les clés uniquement
        System.out.println("\nItération sur les clés :");
        for (String key : mutableMap.keySet()) {
            System.out.println("Clé: " + key);
        }

        // Itération sur les valeurs uniquement
        System.out.println("\nItération sur les valeurs :");
        for (Integer value : mutableMap.values()) {
            System.out.println("Valeur: " + value);
        }
    }
}
```
