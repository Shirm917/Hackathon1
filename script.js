const backs = document.querySelectorAll(".back"); // All the backfaces of the cards
const fronts = document.querySelectorAll(".front"); // All the frontfaces of the cards

let num = 0; // declared before so num doesn't equal zero everytime the function is called
// To add background colors to the front faces
function addColors() {
    const colors = ["red", "blue", "green", "sandybrown", "purple", "orange", "gray", "pink", "lightblue", "maroon"];
    for (let i = 0; i < colors.length; i++) {
        if (num < fronts.length) {
            fronts[num].style.background = colors[i];
            num++;
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
// addVisibilitys(fronts);

// When you click on a card the class hide is toggled on and off and when on the card invisible
function hideAndShow(event) {
    event.target.classList.toggle("hide");
    // event.target.previousElementSibling.classList.toggle("hide");
}

// getting the color of the first card 
let colorOne;
let cardOne;
function matchCheck1(event) {
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
    colorTwo = event.target.nextElementSibling.style.background;
    cardTwo = event.target;
}

// clearing the matches
function matchClear(event) {
    if (colorOne === colorTwo) {
        setTimeout(function() {
            cardOne.nextElementSibling.classList.toggle("hide");
            cardTwo.nextElementSibling.classList.toggle("hide");
        }, 300);
    } else {
        setTimeout(function() {
            cardOne.classList.toggle("hide");
            cardTwo.classList.toggle("hide")
        }, 700);
    }
    goAgain();
}

function goAgain() {
    for (const back of backs) {
        back.addEventListener("click", matchCheck1);
        back.removeEventListener("click", matchCheck2);
        back.removeEventListener("click", matchClear);
    }
}





