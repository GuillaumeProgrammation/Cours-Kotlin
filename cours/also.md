## Fonction `also` en Kotlin

### But : Exécute un bloc avec l’objet courant comme argument (`it`) 
- Retourne toujours l’objet original.

### Utile pour :  
- Faire des opérations secondaires ou effets de bord (log, debug, validation) sans interrompre la chaîne d’appel.  
- Garder le flux principal tout en ajoutant des actions annexes.

### Différence avec `let` :  
- `let` retourne la valeur du bloc.  
- `also` retourne toujours l’objet sur lequel il est appelé.

---

### Exemple :

```kotlin
val liDay = listOf<String>("Monday", "Tuesday", "Wednesday")
    val liDayModified = liDay.map {
        it.uppercase()
        }.also { println(it) 
        }.filter { it.length < 8 }


// [MONDAY, TUESDAY, WEDNESDAY]
// [MONDAY, TUESDAY]
```

### Resumé : 
- also sert pour garder l’objet tel quel mais faire quelque chose en plus avec lui.
- Idéal pour : logs, validations, effets de bord dans une chaîne fluide.
