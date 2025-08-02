## Manipulation de fichier

### Ecriture :

- f.writeText("exemple") : ecrit / ecrase
- f.appendText("exemple") : ajouter du texte 
 
### Lecture : 

- File("fichier.extension").readText()  : String, lit tout le contenu du fichier en une seule String.
- File("fichier.extension").readLines() : List<String>, Lit le fichier et retourne une List<String>, une ligne par élément.