const backs = document.querySelectorAll(".back"); // All the backfaces of the cards
const fronts = document.querySelectorAll(".front"); // All the frontfaces of the cards

let num = 0; // declared before so num doesn't equal zero everytime the function is called
// To add background colors to the front faces
function addColors() {
    const colors = ["red", "blue"];
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
function addVisibilitys(listElements) {
    for (const elem of listElements) {
        elem.addEventListener("click", hideAndShow);
    }
}

addVisibilitys(backs); // adding the event listener to all the backfaces
// addVisibilitys(fronts);

// When you click on a card the class hide is toggled on and off and when on the card invisible
function hideAndShow(event) {
    event.target.classList.toggle("hide");
    // event.target.previousElementSibling.classList.toggle("hide");
}


