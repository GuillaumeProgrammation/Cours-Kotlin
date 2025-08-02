// Variables Globales

const sommaireOuvert = document.getElementById("sommaireOuvert")
const sommaireFerme = document.getElementById("sommaireFerme")

const blocChap = document.querySelector(".blocChapitre")
const listeChap = document.querySelectorAll(".listeChap")
const sousListeChap = document.querySelectorAll(".sousListe")
const sujet = document.querySelectorAll(".sujet")
const ulSousListe = document.querySelectorAll(".ulSousListe")
const contenuCours = document.getElementById("contenuCours");

// Fonctions
const changeTitre = function() {
    this.textContent = "☛ " + this.textContent;
    this.style.color =' #317AC1';
    this.style.fontWeight = "bold"
};

const retablieTitre = function() {
    this.textContent = this.textContent.slice(2);
    this.style.color = "black";
    this.style.fontWeight = "normal"
};

const addFunctionsChap = function(){
    for (const elem of listeChap){
        elem.addEventListener("mouseover", changeTitre)
        elem.addEventListener("mouseout", retablieTitre)
        elem.addEventListener("click", valideCours)
    }

    for (const elem of sousListeChap){
        elem.addEventListener("mouseover", changeTitre)
        elem.addEventListener("mouseout", retablieTitre)
        elem.addEventListener("click", valideCours)
    }
}

const ouvreSousChap = function(ul){
	ul.style.display = "block"
}

const fermeSousChap = function(ul){
	ul.style.display = "none"
	
}

const afficheSousChap = function () {
    const parentLi = this.parentElement;
    const ul = parentLi.querySelector(".ulSousListe");
    if (!ul) return;

    const isHidden = ul.style.display === "none" || getComputedStyle(ul).display === "none";
    
    fermeSousChapEntier(ulSousListe);
    isHidden ? ouvreSousChap(ul) : fermeSousChap(ul);
};

  
const fermeSousChapEntier = function(li){ //ulSousListe
    for (const elem of li){
        elem.style.display = "none"
    }
}

const affichageChap = function(){
    blocChap.classList.toggle("hidden");
    sommaireGestion()
    deplaceTexte()
}



const sommaireGestion = function(){
    sommaireOuvert.classList.toggle("hidden")
    sommaireFerme.classList.toggle("hidden")
}

const deplaceTexte = function(){
    contenuCours.classList.toggle("expand");
};

const valideCours = function(){
    const id = this.id;
    const boolClass = this.classList.contains("sujet")
    if (boolClass) afficherCours(id);
}

const afficherCours = async(id) =>{
    const chemin = `cours/${id}.md`
    try {
        const response = await fetch(chemin);
        const texteMd = await response.text();
        const html = marked.parse(texteMd);
        contenuCours.innerHTML = html;
    } catch (error) {
        contenuCours.innerHTML = `<p style="color:red;">Erreur de chargement du cours : ${id}</p>`;
    }
}

// setupListeners
const setupListeners = function() {
    addFunctionsChap();
    for (const elem of listeChap){
        elem.addEventListener("click", function(){
            afficheSousChap.call(this); // gère ouverture/fermeture
                            // gère affichage du cours
        });
    }
    sommaireOuvert.addEventListener("click", affichageChap)
    sommaireFerme.addEventListener("click", affichageChap)
};


// ---IA---

let zoomLevel = 1;

// Fonction de zoom
function zoomContenu(factor) {
    const content = contenuCours.querySelector('.content-wrapper') || contenuCours;
    zoomLevel *= factor;
    content.style.transform = `scale(${zoomLevel})`;
    content.style.transformOrigin = 'top left';
}

// Exemple d'utilisation avec des boutons
document.getElementById('zoomIn').addEventListener('click', () => zoomContenu(1.2));
document.getElementById('zoomOut').addEventListener('click', () => zoomContenu(0.8));
document.getElementById('resetZoom').addEventListener('click', () => {
    zoomLevel = 1;
    contenuCours.style.transform = 'none';
    contenuCours.style.width = '100%';
    contenuCours.style.height = 'auto';
});

document.addEventListener("DOMContentLoaded", setupListeners);

