var words = ['pizza', 'onion', 'tomato', 'olives', 'chicken'];
var userWord = [];
var score = 0;
var chances = 7;
var count = 0;
var splitWords = [];
var currentWord = [];
// generate random word
function generateWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    //generate blank spaces
    splitWords = currentWord.split('');
    console.log(splitWords);
    console.log(currentWord);
    chances = splitWords.length;
    for (var j = 0; j < splitWords.length; j++) {
        userWord[j] = "_ ";
    }
    document.getElementById("resultLbl").innerText = userWord;

}
$("#guess").on("click", function(e) {
    e.preventDefault();
    guessLetter(document.getElementById("letter").value);
});

//user inputs and checking for match
function guessLetter(letter) {
    letter = letter.toLowerCase();
    for (var i = 0; i < splitWords.length; i++) {
        // check if the user word matches to any word in the correctword array.
        if (splitWords.includes(letter)) {
            //splitWords.splice(i, 1); // so that user cant enter a value twice
            console.log("match");
            checkMatchLetter(letter);
            return true;

        } else {
            count = count + 1;
            console.log("wrong match");
            score = chances - count;
            //console.log(`you lost ${hangMan[j]}`)
            console.log(`you have ${score} tries`)
            endChance();
            return false;
        }

    }
}

function checkMatchLetter(letterCh) {
    for (var i = 0; i < splitWords.length; i++) {
        if (splitWords[i] == letterCh)
            userWord[i] = letterCh;
    }
    document.getElementById("resultLbl").innerText = userWord;
    checkMatch();
}


function checkMatch() {
    for (var i = 0; i < userWord.length; i++) {
        if (userWord[i] === "_ ")
            return;
    }
    console.log("you got it right");
    console.log(`tries you took ${count}`);
}

function endChance() {
    if (score === 0) {
        console.log("you have reached your max tries")
        console.log(`The word is ${currentWord}`)
    }
}

generateWord();
