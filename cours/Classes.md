# Les classes en Kotlin

### <u> Syntaxe :</u>

```kotlin
class nom_class(att_1 : type){
    val att_2 : String = ""
    fun foo(){
        ...
    }
}
```

### Méthodes spéciales :

```kotlin
operator fun plus()    // +

operator fun minus() // -

operator fun times() // *

operator fun div() // /

operator fun compareTo() // < <=, > >=    

override fun equals() // ==
```

## `operator` — Surcharge d’opérateurs

Kotlin permet de redéfinir le comportement des opérateurs (`+`, `-`, `<`, `[]`, `()`, etc.) avec `operator fun`.

### Exemple : `+`

```kotlin

data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point {
        return Point(x + other.x, y + other.y)
    }
}

val a = Point(1, 2)
val b = Point(3, 4)
val c = a + b  // Appelle a.plus(b)
```

### Exemple : `[]`

- #### Définition de `operator fun get()` / `set()` en Kotlin :
  
  > Ce sont des **fonctions d'opérateur** qui permettent à un objet de définir son propre comportement lorsque tu utilises la **syntaxe des crochets `[]`**.
  > 
  > Autrement dit, elles rendent possible l’accès ou la modification d’un **élément indexé ou identifié** dans un objet, comme dans :

```kotlin
val x = monObjet[cle]      // appel implicite à get(cle)
monObjet[cle] = valeur     // appel implicite à set(cle, valeur)
```

```kotlin
class Exemple {
    private val data = mutableMapOf<String, Int>()

    operator fun get(key: String): Int? = data[key]
    operator fun set(key: String, value: Int) { data[key] = value }
}
```

## Les Caractéristiques clés :

- `get(...)` est appelée pour **lire** une valeur : `obj[x]`

- `set(...)` est appelée pour **écrire** une valeur : `obj[x] = y`

- Tu peux utiliser **n’importe quel type de paramètre** (pas juste `Int` ou `String`)

- Tu peux aussi avoir **plusieurs paramètres** : `obj[x, y]`

- Tu peux redéfinir cette logique pour **tout type d'objet** (pas juste dictionnaire ou liste)férents types de class :

#### Exemple complet :

```kotlin
fun main(){
    var obj = Exemple()
    obj["first"] = 1
    println(obj["first"]) // 1
    println(obj[0]) // 10
}

class Exemple{
    private val map = mutableMapOf<String, Int>()
    private val li = mutableListOf<Int>(10, 20, 30)

    operator fun get(key: String): Int = map[key] ?: error("$key doesn't find")
    operator fun set(key: String, value: Int){
        map[key] = value
    }

    operator fun get(value: Int) = li[value]
}
```

---

## Data classes (pour représenter des données)

```kotlin
data class Personne(val nom: String, val age: Int)
```

Génère automatiquement : toString(), equals(), hashCode() et copy().

---

## `Comparable<T>` — Comparaison naturelle

Permet de définir un ordre entre objets (ex. pour trier ou comparer).

### Signature :

```kotlin
interface Comparable<T> {
    operator fun compareTo(other: T): Int
}

```

```kotlin
data class MyDate(val year: Int, val month: Int, val day: Int) : Comparable<MyDate> {
    override fun compareTo(other: MyDate): Int {
        return when {
            year != other.year -> year - other.year
            month != other.month -> month - other.month
            else -> day - other.day
        }
    }
}

val d1 = MyDate(2025, 8, 1)
val d2 = MyDate(2025, 8, 4)
println(d1 < d2)  // true

```

---

## `Iterator<T>` & `Iterable<T>`

Permet de rendre une classe **itérable** avec `for (x in y)`.

### Interfaces :

```kotlin
interface Iterator<T> {
    fun hasNext(): Boolean
    fun next(): T
}

interface Iterable<T> {
    operator fun iterator(): Iterator<T>
}

```

```kotlin
class Countdown(val start: Int) : Iterable<Int> {
    override fun iterator(): Iterator<Int> {
        var current = start
        return object : Iterator<Int> {
            override fun hasNext() = current >= 0
            override fun next() = current--
        }
    }
}

for (i in Countdown(3)) {
    println(i)  // Affiche : 3, 2, 1, 0
}

```

---

## `invoke()` — Objet appelable comme une fonction

`operator fun invoke()` permet d’appeler un objet comme une fonction : `obj()` ⟶ `obj.invoke()`.

### Exemple :

```kotlin
class Greeter(val name: String) {
    operator fun invoke() {
        println("Bonjour $name")
    }
}

val g = Greeter("Gui")
g()  // Appelle g.invoke()
```

```kotlin
class Counter {
    var count = 0
        private set

    operator fun invoke(): Counter {
        count++
        return this // renvoie un objet Counter
    }
}

val c = Counter()
c()()()  // count = 3
```

## Résumé :

| Concept         | Objectif                            | Syntaxe clé    | Exemple                 |
| --------------- | ----------------------------------- | -------------- | ----------------------- |
| `operator`      | Redéfinir les opérateurs            | `operator fun` | `a + b`, `obj()`        |
| `Comparable<T>` | Comparaison (`<`, `>`, tri)         | `override fun` | `a < b`, `sorted()`     |
| `Iterable<T>`   | Parcourir avec `for (x in y)`       | `iterator()`   | `for (x in myObject)`   |
| `invoke()`      | Appeler un objet comme une fonction | `operator fun` | `myObject()`, `obj()()` |

---

# Notions sur les classes

## Attributs

Variable attachée à une classe ou un objet.

- **Attribut d’instance** : propre à chaque objet.
- **Attribut de classe** : partagé entre toutes les instances de la classe.

```kotlin
class Voiture(val couleur: String) {
    // Attribut de classe (équivalent : companion object)
    companion object {
        const val nbRoues = 4
    }
}

fun main() {
    val v1 = Voiture("rouge")
    val v2 = Voiture("bleu")

    println(Voiture.nbRoues)  // 4 (classe)
    println(v1.couleur)       // rouge (instance)
}
```

## Méthode statique

- Ne dépend ni de l'objet (`self`) ni de la classe (`cls`).
- Fonction utilitaire définie dans une classe.
- Peut être appelée via la classe ou une instance.
- En Python : décorée avec `@staticmethod`.
- En Kotlin : définie dans un `companion object`, qui sert à déclarer des membres statiques associés à la classe elle-même, c’est-à-dire des variables et fonctions accessibles sans créer d’instance.
- La méthode peut tout de même avoir des paramètres.

```kotlin
class Outils {
    companion object {
        fun addition(a: Int, b: Int): Int {
            return a + b
        }
    }
}
```

## Méthode de class

- Méthode liée à la classe elle-même, et non à une instance (utile pour les héritages).
- Reçoit la classe (`cls`) en premier argument (Python).
- Utilisée pour accéder ou modifier des attributs de classe ou pour des factory methods.
- En Python : décorée avec `@classmethod`.
- En Kotlin : absence de distinction, on utilise `companion object` pour ce comportement, les méthodes `cls` n'existent pas.
  - Kotlin ne fait pas d’héritage dynamique du companion object. Donc les "méthodes de classe" ne sont pas polymorphes comme en Python sauf si on les redéfinit dans chaque sous-classe.

```kotlin
class Jeu(var nom : String, var age : Int) {
    companion object {
        fun creerJoueur(chaine: String): Jeu{
            var (nom, age) = chaine.split(",")
            return Jeu(nom, age.toInt())
        }
    }
}
```

```python
class Grille:
    def __init__(self, taille):
        self.taille = taille

    @classmethod
    def creer(cls, taille):
        return cls(taille)

class Grille3D(Grille):
    def __init__(self, taille):
        super().__init__(taille)
        self.profondeur = 3

g = Grille3D.creer(5)
print(type(g))  # <class '__main__.Grille3D'>
```

### Comparaison avec python :

```python
class Grille:
    def __init__(self, taille):
        self.taille = taille
        self.plateau = [["." for _ in range(taille)] for _ in range(taille)]

    def est_vide(self, x, y):
        return self.plateau[x][y] == 0

    @staticmethod
    def symbole_vide():
        return 0

    @classmethod # utile pour l'heritage
    def creer_grille_vide(cls, taille):
        return cls(taille)
```

```kotlin
class Grille(val taille: Int) {
    val plateau = Array(taille) { Array(taille) { 0 } }

    fun estVide(x: Int, y: Int): Boolean {
        return plateau[x][y] == 0
    }

    companion object {
        // Méthode statique équivalente
        fun symboleVide(): Int {
            return 0
        }

        // Méthode de "classe" équivalente
        fun creerGrilleVide(taille: Int): Grille {
            return Grille(taille)
        }
    }
}
```