
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
        showError("No words to undo.");
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

document.addEventListener("keydown", function(e) {
    e.preventdefault()
})

document.addEventListener("keyup", function(e) {
    
    if (e.key === "Enter") {
        submit()
    }
    e.preventdefault()
})

submitbutton.addEventListener("click", (e) => submit(e))

function submit(e) {
    currentword = wordinput.value.replace(/\n/g, '').toLowerCase();
    if (currentword === "") {
        showError("Please enter a word.");
        return;
    } else if (previousword != null && currentword.slice(0,1) !== previousword.slice(-1)) {
        showError("The word does not start with the correct letter.");
        
        return;
    }

    words.push(currentword);
    console.log(words);
    previousword = currentword;
    worddisplay.innerHTML = "Previous word: " + currentword;
    wordinput.value = "";
    playerheader.innerHTML = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + currentword.slice(-1) + "':";
    player = player === 1 ? 2 : 1;
    e.preventdefault()

}

function showError(text) {
    const error = document.getElementById("error")
    error.classList.remove("hidden-error")
    error.classList.add("shown-error")
    setTimeout(() => {
        error.classList.remove("shown-error")
        error.classList.add("hidden-error")
    }, 3000);
    error.textContent = text
}


