## Modificateurs de visibilité.

## 1. **`public`** (par défaut)

- Accessible **partout** (dans tout le projet, dans les autres modules).

- C’est le niveau par défaut si tu ne mets rien.

```kotlin
class A {
    public var x = 1   // équivalent à "var x = 1"
}


var bonjour = "hello"
```

---

## 2. **`private`**

- Si c’est dans une **classe** → visible uniquement **dans cette classe**.

- Si c’est au **niveau fichier** → visible uniquement **dans ce fichier**.

```kotlin
class B {
    private var secret = 42
    fun reveal() = secret // ✅ accessible ici
}
// new B().secret ❌ impossible
```

---

## 3. **`protected`**

- Comme `private`, mais aussi accessible **dans les sous-classes**.

- Ne marche que **dans une classe ou un `open class`/`abstract class`**, pas au niveau fichier.

```kotlin
open class Parent {
    protected var y = 10
}

class Child : Parent() {
    fun showY() = y  // ✅ accessible ici
}

// Child().y ❌ impossible de l'extérieur
```

---

## 4. **`internal`**

- Accessible **partout dans le même module** (un module = ensemble de fichiers compilés ensemble, par ex. un projet Gradle ou Maven).

- Pas visible depuis un autre module.

```kotlin
internal var internalVar = 100  // accessible dans tout le module, pas ailleurs
```

---

### Tableau récapitulatif

| Modificateur | Même classe | Sous-classes | Même fichier    | Même module | Partout |
| ------------ | ----------- | ------------ | --------------- | ----------- | ------- |
| `public`     | ✅           | ✅            | ✅               | ✅           | ✅       |
| `private`    | ✅           | ❌            | ✅ (si fichier)  | ❌           | ❌       |
| `protected`  | ✅           | ✅            | ❌ (hors classe) | ❌           | ❌       |
| `internal`   | ✅           | ✅            | ✅               | ✅           | ❌       |
