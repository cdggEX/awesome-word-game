var player = 1;
const playerheader = document.getElementById("player-num")
const wordinput = document.getElementById("word-input");
var currentword = null;
var previousword = null;
var words = [];
const submitbutton = document.getElementById("submit-btn")
const worddisplay = document.getElementById("previous-word");
const undobutton = document.getElementById("undo-btn");
const alertp = document.getElementById("alert")

undo = function() {
    if (words.length === 0) {
        createalert("No words to undo.")
        return
    } 
    words.pop();
    if (words.length === 0) {
        previousword = null
    } else {
        previousword = words[words.length - 1]
    }
    worddisplay.innerHTML = "Previous word: " + previousword;
    playerheader.innerHTML = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + (previousword ? previousword.slice(-1) : '') + "':"
    player = player === 1 ? 2 : 1
}

submitword = function() {
    currentword = wordinput.value.replace(/\n/g, '').toLowerCase();
    if (currentword === "") {
        createalert("Please enter a word.");
        return;
    } else if (previousword != null && currentword.slice(0,1) !== previousword.slice(-1)) {
        createalert("The word does not start with the correct letter.");
        return;
    }
    words.push(currentword);
    console.log(words);
    previousword = currentword;
    worddisplay.innerHTML = "Previous word: " + currentword;
    wordinput.value = "";
    playerheader.innerHTML = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + currentword.slice(-1) + "':";
    player = player === 1 ? 2 : 1;
    wordinput.focus()
}

undobutton.addEventListener("click", undo);

submitbutton.addEventListener("click", submitword)

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        submitword()
    }
})

document.onkeydown = function(e) {
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault()
        undo()
    }
}

function createalert(text) {
    alertp.innerHTML = text
    setTimeout(function() {
        alertp.innerHTML = ""
    }, 3000)

}



