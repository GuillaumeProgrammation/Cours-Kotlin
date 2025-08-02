

## Vocabulaire de la Programmation Orientée Objet (POO) en Kotlin/Java

## Classe

Modèle ou plan définissant les attributs (données) et méthodes (comportements) d'un objet.

```java
class Personne {
    String nom;
    int age;
    
    void sePresenter() {
        System.out.println("Je m'appelle " + nom);
    }
}
```

```kotlin
class Personne {
    var nom: String = ""
    var age: Int = 0
    
    fun sePresenter() {
        println("Je m'appelle $nom")
    }
}
```

## Instance

Objet concret créé à partir d'une classe. Chaque instance possède ses propres valeurs d'attributs.

```java
Personne p = new Personne();
p.nom = "Alice";
p.age = 25;
```

```kotlin
val p = Personne()
p.nom = "Alice"
p.age = 25
```

## Méthode

Fonction définie dans une classe, représentant un comportement que ses instances peuvent exécuter.

```java
void sePresenter() {
    System.out.println("Je m'appelle " + nom);
}
```

```kotlin
fun sePresenter() {
    println("Je m'appelle $nom")
}
```

## Attribut

Variable membre d'une classe représentant une caractéristique ou un état d'un objet.

```java
String nom;
int age;
```

```kotlin
var nom: String = ""
var age: Int = 0
```

## Interface

Contrat déclarant un ensemble de méthodes sans implémentation, que les classes doivent implémenter.

```java
interface Volant {
    void voler();
}

class Avion implements Volant {
    public void voler() {
        System.out.println("L'avion vole");
    }
}
```

```kotlin
interface Volant {
    fun voler()
}

class Avion : Volant {
    override fun voler() {
        println("L'avion vole")
    }
}
```

## Constructeur

Méthode spéciale d'une classe utilisée pour initialiser une nouvelle instance.

```java
class Personne {
    String nom;
    int age;
    
    Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }
}
```

```kotlin
class Personne(val nom: String, var age: Int) {
    // Le constructeur est déclaré directement dans la signature de la classe
}
```

## Encapsulation

Principe de protection des données internes d'un objet en limitant leur accès direct.

```java
class Personne {
    private int age = 0
    
    public int getAge() {
        System.out.println("get → " + age);
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;  // Empêche d'assigner un âge négatif
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Personne p = new Personne();
        p.setAge(25);        // setter accepte la valeur
        System.out.println(p.getAge());  // get affiche et retourne 25

        p.setAge(-5);        // setter ignore la valeur négative
        System.out.println(p.getAge());  // get affiche et retourne toujours 25
    }
}
```

```kotlin
class Personne {
    var age: Int = 0
        get() {
            println("get → $field")
            return field
        }
        set(value) {
            if (value >= 0) field = value  // Empêche d'assigner un âge négatif
        }
}

fun main() {
    val p = Personne()
    p.age = 25        // setter accepte la valeur
    println(p.age)    // get affiche et retourne 25

    p.age = -5        // setter ignore la valeur négative
    println(p.age)    // get affiche et retourne toujours 25
}

```

## Héritage

Mécanisme permettant à une classe d'hériter des attributs et méthodes d'une autre classe.

```java
class Animal {
    void manger() {
        System.out.println("L'animal mange");
    }
}

class Chat extends Animal {
    void miauler() {
        System.out.println("Le chat miaule");
    }
}
```

```kotlin
open class Animal {
    fun manger() {
        println("L'animal mange")
    }
}

class Chat : Animal() {
    fun miauler() {
        println("Le chat miaule")
    }
}
```

## Polymorphisme

Capacité d'un objet à adopter plusieurs formes via la redéfinition de méthodes.

```java
class Animal {
    void parler() {
        System.out.println("L'animal fait un son");
    }
}

class Chien extends Animal {
    void parler() {
        System.out.println("Le chien aboie");
    }
}
```

```kotlin
open class Animal {
    open fun parler() {
        println("L'animal fait un son")
    }
}

class Chien : Animal() {
    override fun parler() {
        println("Le chien aboie")
    }
}
```

## **Lookup (Recherche de méthode)**

Processus effectué à l’exécution par la JVM ou le runtime pour déterminer quelle méthode doit être appelée selon le type réel (dynamique) de l’objet référencé, et non selon son type statique (déclaré).

## Late-binding (Liaison tardive)

Mécanisme d’exécution où la résolution de l’appel d’une méthode est différée jusqu’au moment de l’exécution, permettant d’invoquer la version correcte de la méthode redéfinie dans la classe concrète de l’objet. Le late-binding s’appuie sur le lookup pour choisir dynamiquement la méthode à exécuter.

- **Late-binding** est le fait que la méthode à appeler est choisie **au moment de l’exécution** (et non à la compilation).

- Cela permet à un objet d’exécuter la version de la méthode qui correspond vraiment à son type réel.

- C’est ce qui permet au polymorphisme de fonctionner correctement.

Exemple simple :  
Si une variable de type `Animal` référence un objet `Chien`, l’appel `parler()` exécutera la méthode `parler()` de `Chien` grâce au late-binding.

### Différences clés Kotlin / Java

| Aspect                                  | Kotlin                                                                   | Java                                               |
| --------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| **Syntaxe héritage/implémentation**     | `:` (ex : `class Chat : Animal()`)                                       | `extends` / `implements`                           |
| **Propriétés**                          | Champs + accesseurs combinés (getter/setter implicites ou personnalisés) | Champs + méthodes getter/setter distinctes         |
| **Classes et méthodes redéfinissables** | Doivent être marquées `open` explicitement                               | Sont redéfinissables par défaut (sauf `final`)     |
| **Constructeur principal**              | Intégré dans la déclaration de la classe                                 | Constructeurs définis dans le corps de la classe   |
| **Déclaration des variables**           | `val` (immutable), `var` (mutable)                                       | Pas de distinction native, final pour immutabilité |
| **Interopérabilité**                    | 100% compatible Java, mais syntaxe plus concise                          | Syntaxe plus verbeuse, modèle historique           |
