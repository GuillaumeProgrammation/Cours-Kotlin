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
operator fun plus()	// +

operator fun minus() // -

operator fun times() // *

operator fun div() // /

operator fun compareTo() // < <=, > >=	

override fun equals() // ==
```

## Les différents types de class : 

1. Data classes (pour représenter des données)

```kotlin
data class Personne(val nom: String, val age: Int)
```

Génère automatiquement : toString(), equals(), hashCode() et copy().

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