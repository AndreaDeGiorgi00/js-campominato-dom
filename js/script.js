/*#Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
(attenzione: :avviso:non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html,
e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
- abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una 
cella che non era una bomba.
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
#SUPER BONUS
Se avete finito tutti i bonus potete scrivere all'insegnante o ai tutor per ricevere delle sfide extra!
*/




// # FASE PREPARATORIA ---------------------------------

// Recupero gli elementi in pagina
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');
const testo = document.getElementById('textTarget')

function play() {

  // # Funzioni interne al gioco
  const createCell = (number) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.append(number);

    
    return cell;
  }

  // Cambiamo il testo del bottone in "Ricomincia"
  playButton.innerText = 'Ricomincia';

  // Svuotiamo la griglia
  grid.innerHTML = '';


  // ! -------------------------------
  // ! SVOLGIMENTO EFFETTIVO
  // ! -------------------------------

  //creo una variaile per tenere il conto di quali celle sonon state cliccate e una variabile per tenere il punteggio
  let conteggioCliccati = [];
  let punteggio = 0;
  //creo la array di bombe
  const bombe = randomNumber(difficoltàSelected());
  console.log(bombe);
  //do a grid la classe per la difficoltà
  grid.className = ""
  //rimuovo da grid tutte le classi

  if(difficoltàSelected()==49){
    
    grid.classList.add("hard")
  }else if(difficoltàSelected()==81){
    
    grid.classList.add("medium")
  }

  for (let i = 1; i <= difficoltàSelected(); i++) {

    const cell = createCell(i);
    console.log()

    cell.addEventListener('click', function () {
      cell.classList.add('clicked');
      console.log(i);
      
      //quando clicco sul bottone voglio che il suo valore venga messo in una array dove se è gia presente non fa niente
      if  (!conteggioCliccati.includes(i)){
        //se il bottone cliccato ha come valore un numero presente nelle bombe allora diventa rosso
        if(bombe.includes(i)){
          cell.classList.add('red');
          testo.innerHTML = "";
          message = "hai perso e hai totalizzato 1 punto";
          if(punteggio != 1){
            testo.innerHTML = `<h1>hai perso e hai totalizzato:${punteggio} punti</h1>`;
            
          }else{
            testo.innerHTML = message;
          }
        }else{
          conteggioCliccati.push(i);
          punteggio++;
          console.log(punteggio);
          if(punteggio== difficoltàSelected() - 16){
            grid.innerHTML = "";
            grid.innerHTML = "<h1>hai vinto!</h1>"
          }
          
        }
        
      }
      



    })

    grid.appendChild(cell);
  }




}



playButton.addEventListener('click', play);



/*# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti*/

//creo una funzione per generare 16 numeri casuali non ripetuti
function randomNumber (max){
  let contatore = [];
  let n=1;
  while(n <= 16 ){
    let i = Math.floor(Math.random()*(max)+1);

    if(contatore.includes(i)){
    }else{
      contatore.push(i);
      n++;
    };
    
  }
  console.log(contatore)
  return contatore;
}


// ! livelli di difficolta----------

//creo una funzione che mi seleziona il livello di difficoltà
//e mi restituisce il numero di colonne totale

function difficoltàSelected (){
  //creo la variabile caselle totali già selezionata su 100 caselle la modalità facile
  let caselleTotali = 100;
  //seleziono la scelta 
  const scelta = document.getElementById("difficoltà").value;
  if (scelta == "medium"){
    caselleTotali = 81;
  }else if (scelta == "hard"){
    caselleTotali = 49;
  }
  
  console.log(caselleTotali)
  
  return caselleTotali;
}
