const backs = document.querySelectorAll(".back");
const fronts = document.querySelectorAll(".front");

function addVisibilitys(listElements) {
    for (const elem of listElements) {
        elem.addEventListener("click", hideAndShow);
    }
}

addVisibilitys(backs);
// addVisibilitys(fronts);

function hideAndShow(event) {
    event.target.classList.toggle("hide");
    // event.target.previousElementSibling.classList.toggle("hide");
}

