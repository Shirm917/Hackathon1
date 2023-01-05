// Add cards
function addCards() {
    const container = document.querySelector(".container");
    for (let i = 0; i < 20; i++) {
        const sectionElem = document.createElement("section");
        const divElemBack = document.createElement("div");
        const divElemFront = document.createElement("div");
        sectionElem.classList.add("card");
        divElemBack.classList.add("back");
        divElemFront.classList.add("front");
        sectionElem.append(divElemBack,divElemFront);
        container.append(sectionElem);
    }
} 
addCards();

// start button
function addStartBtn() {
    const startButton = document.getElementById("startBtn");
    startButton.addEventListener("click", clearPoints);
    startButton.addEventListener("click", restart);
}
addStartBtn();

const backs = document.querySelectorAll(".back"); // All the backfaces of the cards
const fronts = document.querySelectorAll(".front"); // All the frontfaces of the cards

let frontNum = 0; // declared before so num doesn't equal zero everytime the function is called
// To add background colors to the front faces and randomize the colors
function addColors() {
    const colors = ["red", "blue", "green", "sandybrown", "purple", "orange", "gray", "pink", "lightblue", "maroon"];
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    let num = 10;
    for (const color of colors) {
        if (frontNum < fronts.length) {
            const randomNum = Math.floor(Math.random() * num);
            fronts[frontNum].style.background = colors[numbers[randomNum]];
            numbers.splice(randomNum, 1);
            num--;
            frontNum++;
        } else {
            return;
        }
    }
    addColors();
}

addColors();

// Adding event listener of when you click the function hideAndShow happens
function addEvents(listElements) {
    for (const elem of listElements) {
        elem.addEventListener("click", hideAndShow);
        elem.addEventListener("click", matchCheck1);
    }
}

addEvents(backs); // adding event listeners to all the backfaces

// When you click on a card the class hide is toggled on and off and when on the card invisible
let lockBoard = false;
function hideAndShow(event) {
    if (lockBoard) return;
    event.target.classList.add("hide");
}

// getting the color of the first card 
let colorOne;
let cardOne;
function matchCheck1(event) {
    if (lockBoard) return;
    colorOne = event.target.nextElementSibling.style.background;
    cardOne = event.target;
    for (const back of backs) {
        back.removeEventListener("click", matchCheck1);
        back.addEventListener("click", matchCheck2);
        back.addEventListener("click", matchClear);
    }
}

// getting the color of the second card
let colorTwo;
let cardTwo;
function matchCheck2(event) {
    if (lockBoard) return;
    colorTwo = event.target.nextElementSibling.style.background;
    cardTwo = event.target;
}

// adding points
let points = 0;
function addPoints() {
    const pointsElement = document.getElementById("points");
    pointsElement.textContent = (`${points += 1}`);
}

let cardsLeft = 20;
// clear points
function clearPoints() {
    const pointsElement = document.getElementById("points");
    pointsElement.textContent = 0;
    points = 0;

}

// clearing the matches
function matchClear(event) {
    lockBoard = true;
    if (colorOne === colorTwo) {
        setTimeout(function() {
            cardOne.nextElementSibling.classList.add("hide");
            cardTwo.nextElementSibling.classList.add("hide");
            lockBoard = false;
        }, 200);
        addPoints();
        cardsLeft -= 2;
    } else {
        setTimeout(function() {
            cardOne.classList.remove("hide");
            cardTwo.classList.remove("hide");
            lockBoard = false;
        }, 700);
    }
    goAgain();
    if (cardsLeft === 0) {
        winner();
        stopTimer();
    }
}

// pick again
function goAgain() {
    for (const back of backs) {
        back.addEventListener("click", matchCheck1);
        back.removeEventListener("click", matchCheck2);
        back.removeEventListener("click", matchClear);
    }
}

// restarts everything
let timerCount = 0;
const timerElem = document.getElementById("timer");
const h1Element = document.getElementById("winner");
function restart() {
    frontNum = 0;
    addColors();
    for (const back of backs) {
        back.classList.remove("hide");
    }
    for (const front of fronts) {
        front.classList.remove("hide");
    }
    cardsLeft = 20;
    h1Element.textContent = "";
    timerCount = 0;
    timerElem.textContent = "0";
    stopTimer();
    startTimer();
}

function winner() {
    const message = document.createTextNode(`You Won after ${timerCount} seconds! Congratulations!`);
    h1Element.append(message);
}

let timer;
function startTimer() { 
    timer = setInterval(function() {
    timerElem.textContent = `${timerCount += 1}`;
    }, 1000)
}

startTimer();

function stopTimer() {
    clearInterval(timer);
}