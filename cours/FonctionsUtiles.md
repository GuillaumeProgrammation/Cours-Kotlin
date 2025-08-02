# Ensemble de fonctions utiles :

## Ensembles :

- map : transforme chaque élément d'une collection en un autre ; renvoie une nouvelle liste des éléments transformés.
- filter : sélectionne les éléments d'une collection qui satisfont une condition ; renvoie une nouvelle liste filtrée.
- fold : accumule les éléments d'une collection en un seul résultat à partir d’une valeur initiale ; renvoie cette valeur finale.
- any : vérifie si au moins un élément d'une collection satisfait une condition ; renvoie un booléen
- all : vérifie si tous les éléments d'une collection satisfont une condition ; renvoie un booléen

## Random :

- list.random() : choisi un elem aléatoire
- Random.nextInt(deb, fin) : int aléatoire entre les bornes (inclus)

## Interaction utilisateur :

- readLine() : interagir avec la console

## Utiles :

- joinToString(" ") : transforme une collection en une chaine des éléments avec " " comme sep
- let : let une fonction d’extension utilisée pour :

    - exécuter du code sur un objet non nul (?.let { ... }),

    - éviter les null checks explicites,

    - limiter la portée d’une variable temporaire (it).

```kotlin
val x: Int? = 5
x?.let {
    println(it * 2)  // s'exécute seulement si x n'est pas null
}
```
- Try et catch :
    
    try{
    
    //code that may throw exception

    }   catch(e: SomeException){

    //code that handles exception
    
    }