## Fonction `with` en Kotlin

### But : Exécute un bloc de code avec un objet comme **référent (`this`)**
- Retourne **la valeur du bloc**.

- Utile pour **éviter les répétitions** quand on travaille plusieurs fois sur le même objet.

---

### Exemple : 

```kotlin
val mess = "bonjour"
    val res = with(mess){
        this.uppercase().take(3)
    }
```
