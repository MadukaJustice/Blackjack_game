let blackjackGame = {
    you : {
        scoreSpan : "#your-blackjack-result",
        div: "#your-box",
        boxSize: ".flex-blackjack-row-2 div",
        score: 0,
    },

    dealer: {
        scoreSpan : "#your-blackjack-result",
        div: "#dealer-box",
        boxSize: ".flex-blackjack-row-2 div",
        score: 0,
    },

    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],

    cardsMap: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        K: 10,
        J: 10,
        Q: 10,
        A: [1, 11],
    },

    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
};

const You = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document
.querySelector("#blackjack-hit-button")
.addEventListener("click", blackjackHit);

function randomCard(){
    if(blackjackGame['isStand']===false){
        let card = randomCard();
        showCard(card, YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random * 13);
    return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement("img")
    }
}