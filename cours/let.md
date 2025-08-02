## Fonction let en kotlin 

### But : Exécute un bloc avec l’objet courant comme argument (it par défaut).

### Utile pour :

- éviter les null 
- faire des appels chaînés
- structurer du code, pour eviter : if (x != null) ...

### Différence avec `also` :  
- `let` retourne la valeur du bloc.  
- `also` retourne toujours l’objet sur lequel il est appelé.

---

### Exemple : 

```kotlin
val motDePasse: String? = "securite123"
    motDePasse?.let{
        if (it.length >= 8) println("Mp valide !")
}
```

### Resumé : 

- let sert à appliquer une fonction sur un objet