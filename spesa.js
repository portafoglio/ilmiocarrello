// Ottieni gli elementi dalla pagina HTML utilizzando l'ID
let creaListaNuova = document.getElementById("creaNuovaLista");
let messaggioUno = document.getElementById("messaggio_uno");
let messaggioDue = document.getElementById("messaggio_due");
let messaggioTre = document.getElementById("messaggio_tre");
let messaggioQuattro = document.getElementById("messaggio_quattro");
let messaggioCinque = document.getElementById("messaggio_cinque");
let messaggioSei = document.getElementById("messaggio_sei");
let sezioneZero = document.getElementById("container0");
let sezioneUno = document.getElementById("container1");
let sezioneDue = document.getElementById("container2");
let salvaButton = document.getElementById("salvaLista");
let logoList = document.getElementById("logoList");
let cancella = document.getElementById("cancellaLista");
let ripristinaListeButton = document.getElementById("ripristinaListe");
let titleListe = document.getElementById("titleListe");
let listeSalvate = document.getElementById("listeSalvate");

sezioneDue.style.display = "none";
messaggioCinque.style.display = "none";
cancella.style.display = "none";
sezioneZero.style.display = "none";

let ritardoMessaggioQuattro = 3000;


// Funzione per mostrare la sezione di creazione di una nuova lista
function creaNuovaLista() {
    sezioneZero.style.display = "block";
    creaListaNuova.style.display = "none";
     titleListe.style.display="none";
    listeSalvate.style.display="none";
}

// Funzione per creare la lista dopo aver inserito il nome del supermercato
function creaLista() {


    let nomeSupermercato = document.getElementById("supermercato").value;

    if (nomeSupermercato === "") {
        messaggioUno.innerHTML = "Inserisci il nome del supermercato.";
    } else {
        sezioneDue.style.display = "block";
        messaggioUno.style.display = "none";
        sezioneUno.style.display = "none";
        ripristinaListeButton.style.display = "none";
        messaggioDue.innerHTML = nomeSupermercato;
    }
}

// Funzione per aggiungere un prodotto alla lista
function aggiungiProdotto() {
    let inserisciProdotti = document.getElementById("inserisciProdotto").value;
    document.getElementById("inserisciProdotto").value = "";

    if (inserisciProdotti === "") {
        messaggioTre.innerHTML = "Il campo di testo è vuoto.";
    } else {
        messaggioTre.style.display = "none";
        cancella.style.display = "block";

        let listaProdotti = document.getElementById("listaProdotti");
        let li = document.createElement("li");
        li.textContent = inserisciProdotti;
        li.classList.add("elementiLista");
        listaProdotti.appendChild(li);

        let button = document.createElement("button");
        button.textContent = "X";
        button.classList.add("rimuoviElemento");
        button.addEventListener("click", function() {
            li.parentNode.removeChild(li);
            button.parentNode.removeChild(button);
        });

        li.appendChild(button);
    }

    logoList.style.display = "none";
}

// Funzione per salvare la lista nel local storage
function salvaLista() {
   
    messaggioQuattro.innerHTML = "Lista salvata!";
    messaggioQuattro.style.display="block";

    setTimeout(function() {
        messaggioQuattro.style.display = "none";
    }, ritardoMessaggioQuattro);
   
    let prodotti = [];
    let lista = document.getElementsByClassName("elementiLista");
    for (let i = 0; i < lista.length; i++) {
        prodotti.push(lista[i].firstChild.textContent);
    }
    localStorage.setItem("listaSpesa", JSON.stringify(prodotti));
}

// Funzione per ripristinare una lista salvata
function ripristinaListe() {
    let listaSalvata = localStorage.getItem("listaSpesa");
    let nomeSupermercato = localStorage.getItem("nomeSupermercato");

    if (listaSalvata) {
        let prodotti = JSON.parse(listaSalvata);
        let listaProdotti = document.getElementById("listaProdotti");
        

        if (ripristinaListeButton) {
            ripristinaListeButton.style.display = "none";
            messaggioCinque.style.display = "block";
            messaggioQuattro.style.display = "none";
            sezioneDue.style.display = "block";
            sezioneUno.style.display = "none";
            messaggioDue.style.display = "block";
        }

        for (let i = 0; i < prodotti.length; i++) {
            let li = document.createElement("li");
            li.textContent = prodotti[i];
            li.classList.add("elementiLista");

            let button = document.createElement("button");
            button.textContent = "X";
            button.classList.add("rimuoviElemento");

            button.addEventListener("click", function() {
                li.parentNode.removeChild(li);
                button.parentNode.removeChild(button);
            });

            li.appendChild(button);
            listaProdotti.appendChild(li);
        }
    }
}

// Funzione per cancellare la lista
function cancellaLista() {
    listaProdotti.innerHTML = "";
    logoList.style.display = "block";
    cancella.style.display = "none";
}




