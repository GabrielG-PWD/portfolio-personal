function construirBaraja() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    baraja = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            baraja.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}


function repartirBaraja() {
    for (let i = 0; i < baraja.length; i++) {
        let j = Math.floor(Math.random() * baraja.length);
        let temp = baraja[i];
        baraja[i] = baraja[j];
        baraja[j] = temp;
    }
    console.log(baraja);
}


function comenzar() {
    hidden = baraja.pop();
    puntajeCrupier += valorCarta(hidden);
    contAsCrup += comprobarAs(hidden);

    while (puntajeCrupier < 17) {
        let cardImg = document.createElement("img");
        let card = baraja.pop();
        cardImg.src = "./cards/" + card + ".png";
        puntajeCrupier += valorCarta(card);
        contAsCrup += comprobarAs(card);
        document.getElementById("cartas-crupier").append(cardImg);
    }
    console.log(puntajeCrupier);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = baraja.pop();
        cardImg.src = "./cards/" + card + ".png";
        puntajeJugador += valorCarta(card);
        contAsJug += comprobarAs(card);
        document.getElementById("cartas-jugador").append(cardImg);
    }
    console.log(puntajeJugador);
    document.getElementById("pedir").addEventListener("click", hit);
    document.getElementById("quedarse").addEventListener("click", stay);

}

function hit() {
    if (!puedeSeguir) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = baraja.pop();
    cardImg.src = "./cards/" + card + ".png";
    puntajeJugador += valorCarta(card);
    contAsJug += comprobarAs(card);
    document.getElementById("cartas-jugador").append(cardImg);

    if (reducirAs(puntajeJugador, contAsJug) > 21) { //A, J, 8 -> 1 + 10 + 8
        puedeSeguir = false;
    }

}


function stay() {
    puntajeCrupier = reducirAs(puntajeCrupier, contAsCrup);
    puntajeJugador = reducirAs(puntajeJugador, contAsJug);

    puedeSeguir = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (puntajeJugador > 21) {
        message = "Perdiste!";
    }
    else if (puntajeCrupier > 21) {
        message = "Ganaste!";
    }
    // puntaje de ambos <=21
    else if (puntajeJugador == puntajeCrupier) {
        message = "Empate!";
    }
    else if (puntajeJugador > puntajeCrupier) {
        message = "Ganaste!";
    }
    else if (puntajeJugador < puntajeCrupier) {
        message = "Perdiste!";
    }

    document.getElementById("puntaje-crupier").innerText = puntajeCrupier;
    document.getElementById("puntaje-jugador").innerText = puntajeJugador;
    document.getElementById("resultados").innerText = message;
}


function valorCarta(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}


function comprobarAs(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}


function reducirAs(totalJugador, totalCrupier) {
    while (totalJugador > 21 && totalCrupier > 0) {
        totalJugador -= 10;
        totalCrupier -= 1;
    }
    return totalJugador;
}


var puntajeCrupier = 0;
var puntajeJugador = 0;

var contAsCrup = 0;
var contAsJug = 0; 

var hidden;
var baraja;

var puedeSeguir = true;

window.onload = function() {
    construirBaraja();
    repartirBaraja();
    comenzar();
}
