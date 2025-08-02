# Compilation : Java vs Kotlin vs Python

## Définitions clés

- **Compilation statique** :  
  Le code source est entièrement compilé **avant l’exécution** en binaire ou bytecode.  
  _Exemples : Java, Kotlin, C._

- **Interprétation** (ou compilation dynamique) :  
  Le code est analysé, compilé partiellement (en bytecode), puis **exécuté à la volée** bloc par bloc.  
  _Exemples : Python, JavaScript._

- **AOT (Ahead-Of-Time)** :  
  Compilation complète avant exécution.

- **JIT (Just-In-Time)** :  
  Compilation à l’exécution, utilisée pour optimiser les performances en temps réel.

---

## Comparatif Java / Kotlin / Python

| Aspect                   | Java                                   | Kotlin                                  | Python                                      |
|--------------------------|----------------------------------------|----------------------------------------|---------------------------------------------|
| **Moment de compilation**| Avant l’exécution                      | Avant l’exécution                      | Pendant l’exécution                         |
| **Type de compilation**  | Compilation statique (AOT vers bytecode) | Compilation statique (AOT vers bytecode) | Compilation dynamique en bytecode (.pyc)   |
| **Unité de compilation** | Fichier source entier (`.java`)        | Fichier source entier (`.kt`)           | Bloc (fichier `.py`, classe, fonction)      |
| **Format compilé**       | Bytecode JVM (`.class`)                | Bytecode JVM (`.class`)                | Bytecode Python (`.pyc`)                    |
| **Exécution**            | JVM avec JIT                           | JVM avec JIT                           | Interprétation par la PVM                   |
| **Optimisations**        | Oui, via le compilateur + JIT          | Oui, via le compilateur + JIT          | Très limitées                               |

---

## Notes

- En **Java** et **Kotlin**, le programme ne peut pas être exécuté sans compilation préalable.  
- En **Python**, l'interpréteur compile à la volée ce dont il a besoin et exécute immédiatement.  
- **JIT** est présent dans la JVM (Java et Kotlin), mais pas dans l’implémentation standard de Python (`CPython`).
