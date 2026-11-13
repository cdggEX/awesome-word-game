

var player = 1;
const playerheader = document.getElementById("player-num")
const wordinput = document.getElementById("word-input");
var currentword = null;
var previousword = null;
var words = [];
const submitbutton = document.getElementById("submit-btn")
const worddisplay = document.getElementById("previous-word");
const undobutton = document.getElementById("undo-btn");
const pinkimage = document.getElementById("pink-img")
const error = document.getElementById("error") 
const body = document.getElementsByTagName('body')

var streakcounter = 0
var clickcounter = 0

//Images of pink
const pinkwink = 'public/images/164px-Pink_face_wink.gif.webp'
const pinkhappycry = 'public/images/Pink_face_overjoyed.gif'
const pinkconcerned = 'public/images/Pink_face_concerned.gif'
const pinkangy = 'public/images/Pink_face_angry.png'
const pinkhappy = 'public/images/Pink_face_happy.gif'
const pinksadcry = 'public/images/Pink_face_cry.gif'
const pinkshocked = 'public/images/Pink_face_shocked.png'
const pinksadtears = 'public/images/Pink_face_sad.gif'


undobutton.addEventListener("click", function() {
    if (words.length === 0) {
        setPink(pinkangy, "You cant undo any more!! HAHAHAHAHA")
        return;
    } 
    else {
        setPink(pinksadtears, "Why'd you undo... I liked that word...")
    }
    words.pop();
    if (words.length === 0) {
        previousword = null;
    } else {
        previousword = words[words.length - 1];
    }
    streakcounter = 0
    worddisplay.textContent = "Previous word: " + previousword;
    playerheader.textContent = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + (previousword ? previousword.slice(-1) : '') + "':";
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

pinkimage.addEventListener("click", function() {
    switch (clickcounter) {
        case 0:
            setPink(pinkshocked, "...")
            break
        case 1:
            setPink(pinkshocked, "Don't click me!!")
            break
        case 2:
            setPink(pinkshocked, "I said stop it!!")
            break
        case 3:
            setPink(pinkshocked, "Something terrible will happen if you keep clicking...")
            break
        case 4:
            setPink(pinkshocked, "Okay I lied but it hurts that pointer is really sharp STOP")
            break
        case 5:
            setPink(pinkangy, "I LIED AGAIN HAHA NOW YOU'RE IN FOR IT IF YOU CLICK ME AGAIN")
            break
        case 6:
            setPink(pinkhappy, "3")
            setTimeout(function() {
                setPink(pinkhappy, "2")
                setTimeout(function() {
                    setPink(pinkhappy, "1")
                    setTimeout(function() {
                        setPink(pinkhappy, "0")
                        setTimeout(function() {
                            setPink(pinkangy, "PINK MODE ACTIVATED!@!!!!")
                            setTimeout(function() {
                            setPink(pinkwink, "Scared you huh?? Just kidding!! Don't do it again though!")
                            }, 2000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
            
            break
    }
    clickcounter = clickcounter + 1
})

submitbutton.addEventListener("click", (e) => submit(e))

function submit(e) {
    currentword = wordinput.value.replace(/\n/g, '').toLowerCase();
    if (currentword === "") {
        setPink(pinkangy, "Enter a word!!!")
        return;
    } else if (previousword != null && currentword.slice(0,1) !== previousword.slice(-1)) {
        setPink(pinkconcerned, "Come on... That word doesn't start with the right letter")
        streakcounter = 0
        return;
    }

    //Retrieve word category
    fetch(`https://wordsapiv1.p.mashape.com/words/word`)
        .then(res => res.json())
        .then(data => console.log(data))

    const word = "documentation";
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => console.log(data));

    switch (streakcounter) {
        case 0:
            setPink(pinkwink, "Nice word!")
            break
        case 1:
            setPink(pinkwink, "Epic word!!")
            break
        case 2:
            setPink(pinkhappy, "Omg good job!!")
            break
        case 3:
            setPink(pinkhappy, "Incredible word!!!")
            break
        case 4:
            setPink(pinkhappycry, "You're so cracked!!!!")
            break
        case 5:
            setPink(pinkconcerned, "I'm done playing it up. Your word actually sucks")
            break
        default:
            setPink(pinkconcerned, "I guess it's okay.")
            break
    }
    
    if (currentword === "pink") {
        setPink(pinkhappy, "Thats my favorite word!!")
    }

    streakcounter = streakcounter + 1

    words.push(currentword);
    console.log(words);
    previousword = currentword;
    worddisplay.textContent = "Previous word: " + currentword;
    wordinput.value = "";
    playerheader.textContent = "Player " + (player === 1 ? 2 : 1) + ", enter a word that starts with '" + currentword.slice(-1) + "':";
    player = player === 1 ? 2 : 1;
    e.preventdefault
}

function setPink(image, text) {
    pinkimage.src = image
    error.textContent = text

}


