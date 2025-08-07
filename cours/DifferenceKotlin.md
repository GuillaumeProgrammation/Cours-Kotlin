# Récap Complet : Kotlin → Java - Bases du langage

## Équivalences principales

| **Concept**                  | **Kotlin**                                     | **Java**                                                |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| **Point d'entrée**           | `fun main() { ... }`                           | `public static void main(String[] args) { ... }`        |
| **Variables immutables**     | `val x = 10`                                   | `final int x = 10;`                                     |
| **Variables mutables**       | `var y = 20`                                   | `int y = 20;`                                           |
| **Fonctions**                | `fun add(a: Int, b: Int): Int = a + b`         | `public static int add(int a, int b) { return a + b; }` |
| **Classes**                  | `class Person(val name: String, var age: Int)` | Classe complète avec constructeur + getters/setters     |
| **Conditions**               | `val result = if (x > y) x else y`             | `int result = (x > y) ? x : y;` (ternaire)              |
| **Boucles**                  | `for (i in 0..5) { ... }`                      | `for (int i = 0; i <= 5; i++) { ... }`                  |
| **Null safety**              | `var name: String? = null`                     | `String name = null;` (gestion manuelle)                |
| **Collections**              | `listOf(1, 2, 3)`                              | `Arrays.asList(1, 2, 3)` ou `List.of(1, 2, 3)`          |
| **Lambdas**                  | `list.map { it * 2 }`                          | `list.stream().map(n -> n * 2).collect(...)`            |
| **Imports**               | `import kotlin.collections.*` (souvent auto)   | `import java.util.*;` **OBLIGATOIRE**                   |
| **Point-virgule**         | `val x = 5` (optionnel)                        | `int x = 5;` **OBLIGATOIRE**                            |
| **Types primitifs**       | `Int`, `Double`, `Boolean`                     | `int`/`Integer`, `double`/`Double`, `boolean`/`Boolean` |
| **String templates**      | `"Hello $name"`                                | `"Hello " + name` (ou `String.format`)                  |
| **Visibilité par défaut** | `internal` (module)                            | `package-private` (package)                             |
| **Propriétés**            | `person.name` (syntaxe directe)                | `person.getName()` (méthodes)                           |
| **Extension functions**   | `fun String.isEmail() = ...`                   | **IMPOSSIBLE** (décorer ou utilitaires)                 |
| **Data classes**          | `data class User(...)`                         | `record User(...)` (Java 14+) ou classe complète        |
| **When expression**       | `when(x) { 1 -> "one" ... }`                   | `switch(x) { case 1: return "one"; ... }`               |
| **Smart casts**           | `if (x is String) x.length`                    | `if (x instanceof String) ((String)x).length()`         |

---

## Différences clés à retenir

### **1. Verbosité**

- **Java** est plus verbeux que Kotlin
- **Tout doit être dans une classe** en Java
- **Getters/Setters** explicites (ou Records Java 14+)

### **2. Types**

- **Java** : types primitifs (`int`, `double`) + objets (`Integer`, `Double`)
- **Kotlin** : types unifiés (`Int`, `Double`)
- **Inférence de type limitée** en Java (sauf `var` Java 10+)

### **3. Null Safety**

- **Java** : **pas de null safety native**, vérifications manuelles
- **Optional** recommandé pour gérer les valeurs nulles
- **NullPointerException** possible partout

### **4. Fonctions**

- **Java** : pas de fonctions de haut niveau, tout dans des classes
- **`static`** nécessaire pour appeler sans instance
- **Pas d'expressions** comme `if` ou `when` en Kotlin

### **5. Collections**

- **Java** : API plus verbeuse, utilise `java.util`
- **Streams** nécessaires pour les opérations fonctionnelles
- **Pas de ranges natifs** (`0..5`)

---

### Exemple

```java
import java.util.*;
import java.util.stream.Collectors;

// =====================================
// 1. DÉCLARATION CLASSE ET MAIN
// =====================================
public class JavaBasicsComplete {
    // Équivalent Kotlin: fun main() { println("Hello, Kotlin") }
    public static void main(String[] args) {
        System.out.println("Hello, Java");
        System.out.println("\n=== BASES JAVA COMPLÈTES ===\n");

        // Appel des autres démonstrations
        demonstrateVariables();
        demonstrateFunctions();
        demonstrateClasses();
        demonstrateConditions();
        demonstrateLoops();
        demonstrateNullSafety();
        demonstrateCollections();
        demonstrateInterfacesInheritance();
        demonstrateLambdas();
        demonstrateAdvancedFeatures();
    }

    // =====================================
    // 2. VARIABLES
    // =====================================
    public static void demonstrateVariables() {
        System.out.println("2. Variables :");

        // Kotlin: val x = 10 (immuable)
        final int x = 10;  // immuable avec final

        // Kotlin: var y = 20 (mutable)
        int y = 20;  // mutable

        // Types primitifs Java
        byte byteVar = 127;
        short shortVar = 32000;
        int intVar = 2147483647;
        long longVar = 9223372036854775807L;  // L pour long
        float floatVar = 3.14f;  // f pour float
        double doubleVar = 3.14159;
        char charVar = 'A';
        boolean boolVar = true;

        // Types objets (wrappers)
        Integer integerObj = 42;
        String stringVar = "Hello Java";

        System.out.println("x (final) = " + x);
        System.out.println("y (mutable) = " + y);
        System.out.println("String = " + stringVar);

        // Inférence limitée avec var (Java 10+)
        var autoType = "Inférence de type"; // Type déduit : String
        System.out.println("Auto-type : " + autoType + "\n");
    }

    // =====================================
    // 3. FONCTIONS/MÉTHODES
    // =====================================
    // Kotlin: fun add(a: Int, b: Int): Int = a + b
    public static int add(int a, int b) {
        return a + b;
    }

    // Méthode avec valeur par défaut (simulée par surcharge)
    public static String greet(String name) {
        return greet(name, "Hello");  // Appel avec valeur par défaut
    }

    public static String greet(String name, String greeting) {
        return greeting + ", " + name + "!";
    }

    // Méthode avec nombre variable d'arguments (varargs)
    public static int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }

    public static void demonstrateFunctions() {
        System.out.println("3. Fonctions/Méthodes :");
        System.out.println("add(5, 3) = " + add(5, 3));
        System.out.println("greet(\"Alice\") = " + greet("Alice"));
        System.out.println("greet(\"Bob\", \"Hi\") = " + greet("Bob", "Hi"));
        System.out.println("sum(1, 2, 3, 4, 5) = " + sum(1, 2, 3, 4, 5));
        System.out.println();
    }

    // =====================================
    // 4. CLASSES ET CONSTRUCTEURS
    // =====================================
    public static void demonstrateClasses() {
        System.out.println("4. Classes et Constructeurs :");

        Person person = new Person("Alice", 25);
        System.out.println("Person créée : " + person.getName() + ", " + person.getAge() + " ans");

        person.setAge(26);
        System.out.println("Après setAge(26) : " + person.getName() + ", " + person.getAge() + " ans");

        // Record (Java 14+) - équivalent plus proche des data classes Kotlin
        PersonRecord record = new PersonRecord("Bob", 30);
        System.out.println("PersonRecord : " + record.name() + ", " + record.age() + " ans");
        System.out.println();
    }

    // =====================================
    // 5. CONDITIONS
    // =====================================
    public static void demonstrateConditions() {
        System.out.println("5. Conditions :");

        int x = 10, y = 5;

        // if classique
        int result;
        if (x > y) {
            result = x;
        } else {
            result = y;
        }
        System.out.println("Max avec if : " + result);

        // Opérateur ternaire (plus proche du if Kotlin)
        int maxTernary = (x > y) ? x : y;
        System.out.println("Max avec ternaire : " + maxTernary);

        // Switch expression (Java 14+)
        String day = "MONDAY";
        String dayType = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Unknown";
        };
        System.out.println("Day type : " + dayType);
        System.out.println();
    }

    // =====================================
    // 6. BOUCLES
    // =====================================
    public static void demonstrateLoops() {
        System.out.println("6. Boucles :");

        // Kotlin: for (i in 0..5) { println(i) }
        System.out.println("Boucle for classique (0 à 5) :");
        for (int i = 0; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // For-each sur collection
        List<String> languages = Arrays.asList("Java", "Kotlin", "Python");
        System.out.println("For-each sur collection :");
        for (String lang : languages) {
            System.out.print(lang + " ");
        }
        System.out.println();

        // While loop
        System.out.println("While loop (5 à 1) :");
        int count = 5;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println("\n");
    }

    // =====================================
    // 7. NULL SAFETY (Gestion manuelle)
    // =====================================
    public static void demonstrateNullSafety() {
        System.out.println("7. Null Safety (gestion manuelle) :");

        String name = null;  // Peut être null

        // Vérification manuelle (équivalent de ?. en Kotlin)
        if (name != null) {
            System.out.println("Longueur du nom : " + name.length());
        } else {
            System.out.println("Nom est null");
        }

        // Avec Optional (Java 8+) - meilleure pratique
        Optional<String> optionalName = Optional.ofNullable(name);
        String result = optionalName.orElse("Nom par défaut");
        System.out.println("Avec Optional : " + result);

        // Optional avec traitement
        optionalName.ifPresentOrElse(
            n -> System.out.println("Nom présent : " + n),
            () -> System.out.println("Nom absent")
        );
        System.out.println();
    }

    // =====================================
    // 8. COLLECTIONS
    // =====================================
    public static void demonstrateCollections() {
        System.out.println("8. Collections :");

        // Kotlin: val list = listOf(1, 2, 3)
        List<Integer> list = Arrays.asList(1, 2, 3);
        System.out.println("Liste : " + list);

        // Collections modernes (Java 9+)
        List<String> modernList = List.of("Java", "Kotlin", "Python");
        Map<Integer, String> modernMap = Map.of(1, "One", 2, "Two", 3, "Three");

        System.out.println("Liste moderne : " + modernList);
        System.out.println("Map moderne : " + modernMap);
        System.out.println();
    }

    // =====================================
    // 9. INTERFACES ET HÉRITAGE
    // =====================================
    public static void demonstrateInterfacesInheritance() {
        System.out.println("9. Interfaces et Héritage :");

        Animal dog = new Dog();
        dog.makeSound();
        dog.defaultMethod();  // Méthode par défaut (Java 8+)

        System.out.println();
    }

    // =====================================
    // 10. LAMBDAS ET STREAMS
    // =====================================
    public static void demonstrateLambdas() {
        System.out.println("10. Lambdas et Streams :");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Kotlin: val doubled = list.map { it * 2 }
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("Doublés : " + doubled);

        // Filtrage et transformation
        List<String> result = numbers.stream()
            .filter(n -> n % 2 == 0)  // Pairs seulement
            .map(n -> "Number: " + n)
            .collect(Collectors.toList());
        System.out.println("Pairs transformés : " + result);

        // forEach
        System.out.println("ForEach avec lambda :");
        numbers.forEach(n -> System.out.print(n + " "));
        System.out.println("\n");
    }

    // =====================================
    // FONCTIONNALITÉS AVANCÉES
    // =====================================
    public static void demonstrateAdvancedFeatures() {
        System.out.println("Fonctionnalités avancées :");

        // Try-with-resources
        System.out.println("Try-with-resources (gestion automatique ressources)");

        // Multi-catch
        try {
            int result = 10 / 0;
        } catch (ArithmeticException | NumberFormatException e) {
            System.out.println("Erreur mathématique ou de format : " + e.getMessage());
        }

        // Text blocks (Java 15+)
        String json = """
            {
                "name": "Java",
                "version": "17+",
                "features": ["Records", "Pattern Matching", "Text Blocks"]
            }
            """;
        System.out.println("Text block JSON :");
        System.out.println(json);
    }
}

// =====================================
// CLASSES AUXILIAIRES
// =====================================

// Classe traditionnelle (équivalent class Person(val name: String, var age: Int))
class Person {
    private final String name;  // final = val Kotlin
    private int age;           // var Kotlin

    // Constructeur
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getters
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    // Setter (seulement pour age car name est final)
    public void setAge(int age) {
        this.age = age;
    }
}

// Record (Java 14+) - plus proche des data classes Kotlin
record PersonRecord(String name, int age) {
    // Constructeur, getters, equals, hashCode, toString générés automatiquement
}

// Interface avec méthode par défaut
interface Animal {
    void makeSound();  // Méthode abstraite

    // Méthode par défaut (Java 8+)
    default void defaultMethod() {
        System.out.println("Méthode par défaut dans interface");
    }
}

// Implémentation d'interface
class Dog implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```
