
var player = 1;
const playerheader = document.getElementById("player-num")
const wordinput = document.getElementById("word-input");
var currentword = null;
var previousword = null;
var words = [];
const submitbutton = document.getElementById("submit-btn")
const worddisplay = document.getElementById("previous-word");
const undobutton = document.getElementById("undo-btn");

undobutton.addEventListener("click", function() {
    if (words.length === 0) {
        alert("No words to undo.");
        return;
    } 
    words.pop();
    if (words.length === 0) {
        previousword = null;
    } else {
        previousword = words[words.length - 1];
    }
    worddisplay.innerHTML = "Previous word: " + previousword;
    playerheader.innerHTML = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + (previousword ? previousword.slice(-1) : '') + "':";
    player = player === 1 ? 2 : 1;
});

submitbutton.addEventListener("click", function() {
    currentword = wordinput.value.replace(/\n/g, '').toLowerCase();
    if (currentword === "") {
        alert("Please enter a word.");
        return;
    } else if (previousword != null && currentword.slice(0,1) !== previousword.slice(-1)) {
        alert("The word does not start with the correct letter.");
        
        return;
    }
    words.push(currentword);
    console.log(words);
    previousword = currentword;
    worddisplay.innerHTML = "Previous word: " + currentword;
    wordinput.value = "";
    playerheader.innerHTML = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + currentword.slice(-1) + "':";
    player = player === 1 ? 2 : 1;

})


