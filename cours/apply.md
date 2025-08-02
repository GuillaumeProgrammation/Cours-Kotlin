## Fonction `apply` en Kotlin

### But : Exécute un bloc avec l’objet courant comme **référence (`this`)**.  
- Retourne **l’objet lui-même**, utile pour configurer des objets.

Utile pour :

- Initialiser des objets proprement
- Éviter des réécritures de variable
- Enchaîner des appels de configuration

---

### Exemple : 

```kotlin
val sb = StringBuilder().apply {
    append("Bonjour ")
    append("le monde")
}
println(sb.toString())  // Bonjour le monde

class Voiture {
    var couleur: String = ""
    var vitesseMax: Int = 0
}

val voiture = Voiture().apply {
    couleur = "rouge"
    vitesseMax = 220
}

```

### Quand utiliser apply ?
- Quand tu veux initialiser un objet sans l’écrire en plusieurs lignes séparées.
- Quand tu veux modifier plusieurs propriétés d’un objet en une seule fois.

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