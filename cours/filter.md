## Fonction filter en Kotlin

### But : sélectionner les éléments d’une collection qui satisfont un critère.

- Type : fonction d’ordre supérieur (prend une lambda en paramètre).
- Retour : nouvelle collection contenant uniquement les éléments pour lesquels la condition est vraie.

```kotlin
val listeFiltrée = collection.filter { élément -> condition }
```
- condition est une expression booléenne (retourne true ou false).
- élément représente chaque élément de la collection.

```kt
val nombres = listOf(1, 2, 3, 4, 5)
val pairs = nombres.filter { it % 2 == 0 }
println(pairs)  // [2, 4]
```

### Points importants
- Ne modifie pas la collection d’origine.
- Retourne une nouvelle collection (liste).
- Fonction disponible sur toutes les collections Kotlin (List, Set, Array, etc.).