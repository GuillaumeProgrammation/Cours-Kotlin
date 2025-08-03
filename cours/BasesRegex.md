## Qu’est-ce qu’une expression régulière (regex) ?

Une regex est une chaîne de caractères spéciale qui décrit un **motif** (pattern) pour chercher ou manipuler du texte. Par exemple, chercher tous les chiffres, vérifier si un texte commence par une lettre, etc.

## Langages rationnels et expressions régulières :

- **Langages rationnels** (ou réguliers) sont des ensembles de chaînes construits à partir d’un alphabet selon des règles simples : union, concaténation, et étoile de Kleene (répétition).

- **Expressions régulières** (regex) sont une façon formelle d'exprimer ces langages rationnels. Elles décrivent des motifs pour reconnaître ou générer des chaînes.

**Note** : Cette définition justifie pourquoi on utilise les regex : elles formalisent les langages simples qu’on peut reconnaître ou générer.

---

#### Bases des Expressions Régulières (Regex)

## 1. Alphabet et chaînes

- **Alphabet (Σ)** : ensemble fini de symboles, ex. {a,b,c}

- **Chaîne** : suite finie de symboles de Σ, ex. `"abc"`

- **Chaîne vide** : notée ϵ, sans symbole

Ici, on entre dans la théorie des langages : on manipule des mots formés sur un alphabet.

---

## 1. Symboles de base

| Symbole | Signification            | Exemple regex | Correspond à        |
| ------- | ------------------------ | ------------- | ------------------- |
| `.`     | N’importe quel caractère | `a.b`         | `aab`, `acb`, `a1b` |
| `\d`    | Un chiffre (0-9)         | `\d+`         | `1`, `12`, `123`    |
| `\w`    | Lettre, chiffre, _       | `\w+`         | `abc`, `a1_b`       |
| `\s`    | Espace ou tabulation     | `\s`          | (espace), tab       |

---

### 2. Quantificateurs

| Quantificateur | Signification       | Exemple | Correspond à     |
| -------------- | ------------------- | ------- | ---------------- |
| `*`            | 0 ou plusieurs fois | `a*`    | ``, `a`, `aa`    |
| `+`            | 1 ou plusieurs fois | `a+`    | `a`, `aa`, `aaa` |
| `?`            | 0 ou 1 fois         | `a?`    | ``, `a`          |

**Étoile de Kleene (`*`)** : ce quantificateur est inspiré directement de la théorie des langages rationnels, où la répétition 0 ou plusieurs fois est un opérateur fondamental.

---

### 3. Classes de caractères

| Syntaxe  | Description       | Exemple  | Correspond à    |
| -------- | ----------------- | -------- | --------------- |
| `[abc]`  | a ou b ou c       | `[abc]`  | `a`, `b` ou `c` |
| `[0-9]`  | Chiffres de 0 à 9 | `[0-9]+` | `123`, `5`, `9` |
| `[^abc]` | Tout sauf a, b, c | `[^abc]` | `d`, `1`, `!`   |

---

### 4. Ancrages

| Symbole | Signification      | Exemple | Correspond à |
| ------- | ------------------ | ------- | ------------ |
| `^`     | Début de la chaîne | `^a`    | `a` au début |
| `$`     | Fin de la chaîne   | `a$`    | `a` à la fin |

---

### 5. Groupes et alternance

| Syntaxe | Description      | Exemple | Correspond à |
| ------- | ---------------- | ------- | ------------ |
| `(abc)` | Groupe capturant | `(abc)` | `abc`        |
| `(a     | b                | c)`     | a ou b ou c  |

---

Un **automate** est un modèle mathématique abstrait utilisé pour représenter et analyser des systèmes qui traitent des séquences d'éléments (comme des chaînes de caractères).

### Description simple :

- Un automate est constitué de **états** (situations possibles).

- Il commence dans un état initial.

- Il lit des symboles un par un (issus d’un alphabet).

- En fonction du symbole lu et de l’état courant, il passe à un autre état (transition).

- Certains états sont dits **états finaux** ou **acceptants**.

- Si après avoir lu toute la chaîne, l’automate se trouve dans un état final, la chaîne est **acceptée** (reconnue).

---

### Usage

- Les automates servent à **reconnaître** des langages formels (ensembles de chaînes) : ils disent si une chaîne appartient ou non au langage.

- Ils sont fondamentaux pour comprendre les expressions régulières, car chaque regex correspond à un automate fini qui reconnaît exactement le même langage.

---

### Types principaux

- **Automate fini déterministe (AFD)** : à chaque état et symbole correspond une seule transition possible.

- **Automate fini non déterministe (AFN)** : plusieurs transitions possibles, voire sans lire de symbole (ε-transition).

---

### Exemple simple

Alphabet = {a,b}

Automate qui accepte toutes les chaînes finissant par `ab` :

- États : q0 (initial), q1, q2 (final)

- Transitions :
  
  - q0 —a→ q1
  
  - q1 —b→ q2
  
  - q2 —a→ q1
  
  - q2 —b→ q0

- Une chaîne est acceptée si l'automate termine en q2.

En résumé, un automate est une machine abstraite pour lire des chaînes et décider si elles respectent un certain motif.

---

## Langages reconnaissables et automates finis

- Un **langage reconnaissable** est un langage pour lequel il existe un automate fini capable de décider si une chaîne appartient ou non au langage.

- Un **automate fini déterministe (AFD)** a un état unique à chaque étape pour chaque symbole.

- Un **automate fini non déterministe (AFN)** peut avoir plusieurs transitions possibles pour un même état et symbole.

> Les regex et les langages rationnels correspondent exactement aux langages reconnus par ces automates finis.

---

## Déterminisation et minimalisation

- **Déterminisation** : conversion d’un AFN en AFD équivalent.

- **Minimalisation** : réduction de l’AFD en un automate avec le nombre minimum d’états.

---

## Théorème de Kleene

- Ce théorème établit l’équivalence entre :
  
  - les langages exprimables par des expressions régulières
  
  - les langages reconnus par des automates finis.

- Donc toute regex décrit un langage reconnaissable par un automate fini.

---

# Exemples :

### Exemple 1 : `^\d{4}$`

- **Regex** : `^\d{4}$`

- **Signification** :
  
  - `^` = début de la chaîne
  
  - `\d{4}` = exactement 4 chiffres (0-9)
  
  - `$` = fin de la chaîne

- **Exemple valide** : `"2025"`

- **Exemple non valide** : `"123"`, `"20256"`, `"20a5"`

- **Utilité** : Vérifier qu'une chaîne est **strictement composée de 4 chiffres**.

---

### Exemple 2 : `^[a-zA-Z]+$`

- **Regex** : `^[a-zA-Z]+$`

- **Signification** :
  
  - `^` = début
  
  - `[a-zA-Z]+` = une ou plusieurs lettres, majuscules ou minuscules
  
  - `$` = fin

- **Exemple valide** : `"Bonjour"`, `"abc"`, `"XYZ"`

- **Exemple non valide** : `"abc123"`, `"abc!"`, `"123"`

- **Utilité** : Vérifier que la chaîne contient **seulement des lettres**.

---

### Exemple 3 : `\bchat\b`

- **Regex** : `\bchat\b`

- **Signification** :
  
  - `\b` = frontière de mot (début ou fin d'un mot)
  
  - `chat` = le mot exact "chat"

- **Exemple valide** : `"Le chat dort."`

- **Exemple non valide** : `"Les chats"`, `"château"`

- **Utilité** : Trouver le mot **exact** "chat" dans un texte.

---

### Exemple 4 : `\d+`

- **Regex** : `\d+`

- **Signification** :
  
  - `\d` = chiffre
  
  - `+` = une ou plusieurs fois

- **Exemple valide** : `"1"`, `"42"`, `"12345"`

- **Exemple trouvé dans** : `"J'ai 2 pommes et 10 oranges."` → trouve `"2"` et `"10"`

- **Utilité** : Trouver **toutes les séquences de chiffres** dans un texte.

---

### Exemple 5 : `[aeiou]`

- **Regex** : `[aeiou]`

- **Signification** :
  
  - Trouve une voyelle parmi `a`, `e`, `i`, `o`, `u`

- **Exemple valide** : `"chat"`, `"pied"`, `"route"` (trouve les voyelles)

- **Utilité** : Trouver **une seule voyelle** dans un mot ou texte.

---

### Exemple 6 : `colou?r`

- **Regex** : `colou?r`

- **Signification** :
  
  - `u?` = la lettre `u` est facultative (0 ou 1 fois)

- **Exemple valide** : `"color"`, `"colour"`

- **Utilité** : Gérer les variantes orthographiques (ex : anglais américain/anglais britannique).

---

### Exemple 7 : `(cat|dog|bird)`

- **Regex** : `(cat|dog|bird)`

- **Signification** :
  
  - `|` = "ou" logique entre les mots

- **Exemple valide** : `"cat"`, `"dog"`, `"bird"`

- **Exemple trouvé dans** : `"I have a dog."` → trouve `"dog"`

- **Utilité** : Trouver plusieurs mots possibles avec une seule regex.

---

### Exemple 8 : `^[A-Z][a-z]+`

- **Regex** : `^[A-Z][a-z]+`

- **Signification** :
  
  - `^` = début de chaîne
  
  - `[A-Z]` = une lettre majuscule
  
  - `[a-z]+` = une ou plusieurs lettres minuscules

- **Exemple valide** : `"Paris"`, `"Bonjour"`

- **Exemple non valide** : `"paris"`, `"PARIS"`, `"PaRiS"`

- **Utilité** : Vérifier un mot commençant par une majuscule suivie de minuscules.
