## 1. Vocabulaire de base

- **Alphabet (Σ)** : ensemble fini de symboles (ex. {a,b}).
- **Mot** : suite finie de symboles de Σ (ex. "abba").
- **Langage** : ensemble de mots (ex. L = {ab, aab, bab}).
- **Chaîne vide (ε)** : mot sans caractère.

---

### 1.1 Langages formels vs naturels

- **Langage naturel** : langage humain (français, anglais) avec règles flexibles, ambiguïtés, et interprétations contextuelles
- **Langage formel** : langage défini par des règles mathématiques précises, sans ambiguïté, où chaque chaîne est soit valide soit invalide
- **Pourquoi "formel" ?** Les machines ont besoin de règles absolues et déterministes pour traiter l'information de manière fiable

**Exemple comparatif :**

- Naturel : "Cherchez les mots qui commencent par une majuscule" (ambigu)
- Formel : `^[A-Z\]\[a-z]+#

Tous les langages
├── Langages naturels (français, anglais, ...)
└── Langages formels
├── Langages rationnels / réguliers (votre cours)
│   └── Exemple : identificateurs de variables [a-zA-Z\]\[a-zA-Z0-9\]\*
├── Langages algébriques / context-free
│   └── Exemple : expressions arithmétiques 2*(3+4)
└── Langages de programmation complets
└── Exemple : Python, Java, C++ (plus complexes)---

## 2. Langages rationnels (ou réguliers)

- Ce sont des langages construits avec :
  - **Union** : L₁ ∪ L₂
  - **Concaténation** : L₁L₂
  - **Étoile de Kleene** : L*
- Tous les **langages finis** sont rationnels.
- Beaucoup de langages infinis sont rationnels (ex. "tous les mots finissant par ab").
- **Pas de contrainte** sur l'égalité des nombres

---

## 3. Expressions régulières (formelles)

- Une expression régulière **définit un langage rationnel**.
- Exemple : `(a|b)*ab` décrit le langage des mots finissant par "ab".
- **À retenir** : langage rationnel = objet, expression régulière = description

**Note** : Cette définition justifie pourquoi on utilise les regex : elles formalisent les langages simples qu’on peut reconnaître ou générer.

### Exemple 1 – Langage des mots finissant par `ab` sur l’alphabet {a, b}

- **Langage rationnel (ensemble de mots)**  
  L = {ab, aab, bab, aaab, abab, …} = "tous les mots sur {a,b} finissant par `ab`".
- **Expression régulière (formelle)**  
  (a|b)*ab
- **Regex pratique (ex. en Python/grep)**  
  `^(a|b)*ab$`

---

## Bases des Expressions Régulières (Regex)

#### Qu’est-ce qu’une expression régulière (regex) ?

Une regex est une chaîne de caractères spéciale qui décrit un **motif** (pattern) pour chercher ou manipuler du texte. Par exemple, chercher tous les chiffres, vérifier si un texte commence par une lettre, etc.

## 1. Symboles de base

| Symbole | Signification            | Exemple regex | Correspond à  |
|---------|--------------------------|---------------|---------------|
| `.`       | N’importe quel caractère | `a.b`           | `aab`, `acb`, `a1b` |
| `\d`      | Un chiffre (0-9)         | `\d+`           | `1`, `12`, `123`    |
| `\w`      | Lettre, chiffre, \_       | `\w+`           | `abc`, `a1_b`     |
| `\s`      | Espace ou tabulation     | `\s`            | (espace), tab |

---

### 2. Quantificateurs

| Quantificateur | Signification       | Exemple | Correspond à |
|----------------|---------------------|---------|--------------|
| `*`              | 0 ou plusieurs fois | `a*`      | \`\`, `a`, `aa`    |
| `+`              | 1 ou plusieurs fois | `a+`      | `a`, `aa`, `aaa`   |
| `?`              | 0 ou 1 fois         | `a?`      | \`\`, `a`        |

**Étoile de Kleene (**`*`**)** : ce quantificateur est inspiré directement de la théorie des langages rationnels, où la répétition 0 ou plusieurs fois est un opérateur fondamental.

---

### 3. Classes de caractères

| Syntaxe | Description       | Exemple | Correspond à |
|---------|-------------------|---------|--------------|
| `[abc]`   | a ou b ou c       | `[abc]`   | `a`, `b` ou `c`    |
| `[0-9]`   | Chiffres de 0 à 9 | `[0-9]+`  | `123`, `5`, `9`    |
| `[^abc]`  | Tout sauf a, b, c | `[^abc]`  | `d`, `1`, `!`      |

---

### 4. Ancrages

| Symbole | Signification      | Exemple | Correspond à |
|---------|--------------------|---------|--------------|
| `^`       | Début de la chaîne | `^a`      | `a` au début   |
| `$`       | Fin de la chaîne   | `a$`      | `a` à la fin   |

---

### 5. Groupes et alternance

| Syntaxe | Description      | Exemple | Correspond à |
|---------|------------------|---------|--------------|
| `(abc)`   | Groupe capturant | `(abc)`   | `abc`          |
| `(a     | b                | c)`     | a ou b ou c  |

---

## Automates :

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
  - q1 —b→ q2
- Une chaîne est acceptée si l'automate termine en q2.

En résumé, un automate est une machine abstraite pour lire des chaînes et décider si elles respectent un certain motif.

---

## Méthode générale pour définir les transitions

### **1. Analysez ce que représente chaque état**

Pour "mots commençant par B" :

- **q₀** : "Je n'ai encore rien lu"
- **q₁** : "J'ai lu B au début, je suis dans un mot valide"
- **q₂** : "J'ai lu autre chose que B au début, échec définitif"

### **2. Pour chaque état, demandez-vous :**

*"Si je suis dans cet état et que je lis le caractère X, dans quel état dois-je aller ?"*

## 🔍 Exemple détaillé : "Mots commençant par B"

### **Depuis q₀ (état initial) :**

- **Si je lis 'B'** : "Parfait ! J'ai le bon début" → q₁
- **Si je lis autre chose** : "Raté, ça ne commence pas par B" → q₂

### **Depuis q₁ (déjà valide) :**

- **Si je lis n'importe quoi** : "Peu importe, le mot est déjà bon" → q₁
- (Je reste en q₁ car le mot reste valide)

### **Depuis q₂ (échec) :**

- **Si je lis n'importe quoi** : "Trop tard, l'échec est irréversible" → q₂
- (Je reste en q₂ car on ne peut plus récupérer)

## Processus de réflexion étape par étape

### **Étape 1 : Définir la "mémoire" nécessaire**

*"De quoi ai-je besoin de me souvenir ?"*

Pour "commence par B" :

- Ai-je déjà lu un caractère ?
- Ce premier caractère était-il B ?

### **Étape 2 : Créer les états correspondants**

- q₀ : "Rien lu encore"
- q₁ : "Premier caractère était B"
- q₂ : "Premier caractère n'était pas B"

### **Étape 3 : Logique de transition**

Pour chaque (état, caractère) :

| Depuis | Caractère | Logique                          | Vers |
|--------|-----------|----------------------------------|------|
| q₀     | B         | "Bon début !"                    | q₁   |
| q₀     | autre     | "Mauvais début"                  | q₂   |
| q₁     | tout      | "Déjà bon, ça reste bon"         | q₁   |
| q₂     | tout      | "Déjà mauvais, ça reste mauvais" | q₂   |

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