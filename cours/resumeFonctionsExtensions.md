![ImageResume](/images/funExtensions.png)

---

## Utilisation des fonctions lambda
f(a, b)             // tous les arguments entre ()

f(a) { ... }        // lambda finale déplacée en dehors des ()

f { ... }           // si lambda est le seul argument, pas besoin de ()


## Exemple : 

```kotlin
fun main(){
    var res = User().apply {
        age = 18
        nom = "Gui"
    }.also {
        println("New user: $it") // lecture via it
    }.run {
        "$nom a $age ans" // transformation
    }

    println(res)
}

data class User(var nom : String = "", var age : Int = 0) 
```

### Renvoie : 

- Affiche : New user : User(nom=Gui, age=18)
- res : Gui a 18 ans