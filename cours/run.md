## Fonction `run` en Kotlin

### But : Exécute un bloc avec l’objet courant comme **référence (`this`)**,  
- Retourne le résultat du bloc (valeur finale).

### Utile pour :  
- faire un calcul ou une opération sur un objet et récupérer une valeur  
- regrouper plusieurs opérations avec `this` sans répéter le nom de l’objet  
- éviter une variable temporaire  

---

### Exemple : 
```kotlin
val longueur = "Bonjour".run {
    println(this)  // affiche "Bonjour"
    length         // valeur retournée
}
println(longueur)  // 7

var user = User()
    var description = user.run {
        this.nom = "Alice"
        this.age = 20
        "Nom : $nom, Age : $age"
    }
    println(description)
```

| Aspect                   | `run`                                                     | `apply`                                             |
| ------------------------ | --------------------------------------------------------- | --------------------------------------------------- |
| **Référence de l’objet** | `this` (implicite dans le bloc)                           | `this` (implicite dans le bloc)                     |
| **Valeur retournée**     | Le **résultat du bloc** (n’importe quel type)             | Toujours l’**objet original** (le receiver)         |
| **Usage typique**        | Faire des calculs ou opérations qui retournent une valeur | Initialiser ou configurer un objet (side effects)   |
| **Chaine possible**      | Oui, pour récupérer un résultat                           | Oui, pour enchaîner la configuration                |
| **Exemple**              | `val len = "abc".run { length }`                          | `val str = StringBuilder().apply { append("abc") }` |

### Résumé : 

- run sert à exécuter un bloc sur un objet et récupérer un résultat.
- apply sert à configurer un objet et retourne toujours cet objet.