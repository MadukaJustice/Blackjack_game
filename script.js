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

const You = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document
    .querySelector("#blackjack-hit-button")
    .addEventListener("click", blackjackHit);

document
    .querySelector("#blackjack-stand-button")
    .addEventListener("click",blackjackStand);
    document
    .querySelector("#blackjack-deal-button")
    .addEventListener("click", blackjackDeal);
    document
    .querySelector("#blackjack-reset-button")
    .addEventListener("click", blackjackRestart);

function blackjackHit(){
    if(blackjackGame['isStand']===false){
        let card = randomCard();
        showCard(card, You);
        updateScore(card, You);
        showScore(You);
    }
}

// create a random card whenever user clicks a button
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer["score"] <= 21){
        let cardImage = document.createElement("img");
        cardImage.src = `images/${card}.png`;
        cardImage.style = `width: ${widthSize()}; height:${heightSize()};`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

// positioning the game UI
function widthSize() {
    if(windowWidth > 1000) {
        let newWidthSize = window.screen.width * 0.1;
        return newWidthSize;
     }  else {
        return window.screen.width * 0.18;
     }
}

function heightSize() {
    if(windowHeight > 700) {
        let newHeightSize = window.screen.height * 0.18;
        return newHeightSize;
     }  else {
        return window.screen.height * 0.15;
     }
}


// create an updated score of the player
function updateScore(card, activePlayer) {
    if (card === "A") {
        if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
            activePlayer["score"] += blackjackGame["cardsMap"][card][1];
        } else {
            activePlayer["score"] += blackjackGame["cardsMap"][card][0];
        }
    } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
}

function showScore(activePlayer) {
    // bust logic if score is over 21
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red"
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = 
        activePlayer["score"];
    }
}

function blackjackStand(){
    if (blackjackGame.pressOnce === false) {
      blackjackGame["isStand"] = true;
        let yourImages = document
         .querySelector("#your-box")
         .querySelectorAll("img");
    
        for (let i = 0; i < yourImages.length; i++){
         let card = randomCard();
         showCard(card, DEALER);
         updateScore(card, DEALER);
         showScore(DEALER);
        }

        blackjackGame["isTurnsOver"] = true;

        computeWinner();
        showWinner(winner);
   }

    blackjackGame.pressOnce = true;
}


// Determining the winner
function computeWinner()
{
    if (You["score"] <= 21) {
        if(You["score"] > DEALER["score"]  || DEALER['score'] > 21)
        {
            winner = You;
        }

        else if (You["score"] < DEALER["score"])
        {
            winner = DEALER;
        }

        else if(You["score"] === DEALER["score"]){
            winner = "Draw"
        }
    }

    else if(You["score"] > 21 && DEALER["score"] <= 21) {
        winner = DEALER;
    }

    else if (You["score"] > 21 && DEALER["score"] > 21) {
        winner = "None";
    }

    return winner;
}


// showing the winner
function showWinner(){
    let message , messageColor;

    if(winner === You){
        message = "You Won!";
        messageColor = "#00e676";
        document
        .querySelector("#wins")
        .textContent = blackjackGame["wins"]+=1;
        winSound.play();
    }

    if(winner === DEALER){
        message = "You Lost!";
        messageColor = "red";
        document.querySelector("#losses").textContent = blackjackGame["losses"]+=1;
        loseSound.play();  
    }

    if(winner === "Draw"){
        message = "You Drew!";
        messageColor = "yellow";
        document.querySelector("#draws").textContent = blackjackGame["draws"]+=1;
        loseSound.play();  
    } 
    
    if(winner === "None"){
        message = "You Both Busted!";
        messageColor = "orange";
        loseSound.play();  
    }
    document
    .querySelector("#blackjack-result")
    .textContent = message;

    document
    .querySelector("#blackjack-result")
    .style.color = messageColor;
}

function blackjackDeal(){

    if(blackjackGame["isTurnsOver"] ===true)
    {
        let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    
        You['score'] = DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector("#blackjack-result").textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'white';

        for( let i =0; i < yourImages.length; i++){
            yourImages[i].remove();
            dealerImages[i].remove();
        }

        blackjackGame["isStand"] = false;
        blackjackGame.pressOnce = false;
        blackjackGame["isTurnsOver"] = false;

    }
}

// Create a restart function
function blackjackRestart(){

    blackjackDeal();

    document.querySelector('#wins').textContent=0;
    document.querySelector('#losses').textContent=0;
    document.querySelector('#draws').textContent=0;

    blackjackGame.wins =0;
    blackjackGame.losses =0;
    blackjackGame.draws =0;

}