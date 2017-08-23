class myWords {
    constructor() {
        this.movies = [],
            this.food = [],
            this.sports = []
    }
}
myWords.movies = ['jaws', 'titanic', 'back to the future','Forest Gump','Star Wars','Rocky','The Dark Knight'];
myWords.food = ['pizza', 'burger', 'hot dog', 'noodles'];
myWords.sports = ['basket ball', 'hockey', 'soccer', 'tennis','Base Ball','Rugby'];

var userWord = []; //empty array to generate blank spaces
var score = 0; //t track your chances
var chances = 6; // max cahnce to try
var count = 0;
var splitWords = []; // splits each letter in a word
var currentWord = []; // stores the random generated word
var guessAlpabet = [];
var words = myWords.food;

//event listener----
//selct dropdown list
$("#selCategory").on("change", function(e) {
    var res = e.currentTarget.value;
    switch (res) {
        case 'movies':
            words = myWords.movies;
            break;
        case 'sports':
            words = myWords.sports;
            break;
        default:
            words = myWords.food;
            break;
    }
    restart();
    //generateWord();

});
// event listener to call the guess letter function
$("#guess").on("click", function(e) {
    e.preventDefault();
    //checking for spaces in a string with 2 words
    if (document.getElementById("letter").value.trim() == '')
        return;
    guessLetter(document.getElementById("letter").value.trim());
    $("#letter").val('');
});
$("#restart").click(restart);

function restart() {
    score = 0;
    count = 0;

    $("#hangImg").attr("src", "images/hang_1.gif");
    $("#letter").val('');
    guessAlpabet = [];
    userWord = [];
    document.getElementById("guessLet").innerText = guessAlpabet;
    generateWord();
}
// generate random word
function generateWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    splitWords = currentWord.split('');
    var hangmanWord = '';
    // checking for spaces between words .
    for (var j = 0; j < splitWords.length; j++) {
        userWord[j] = splitWords[j] == ' ' ? ' ' : "_ ";
        hangmanWord = hangmanWord + "_ ";
    }
    document.getElementById("resultLbl").innerText = hangmanWord;
}

//user inputs and checking for match
function guessLetter(letter) {
    // array to keep track of the letters entered by user
    guessAlpabet.push(letter);
    document.getElementById("guessLet").innerText = guessAlpabet;
    letter = letter.toLowerCase();
    for (var i = 0; i < splitWords.length; i++) {
        // check if the user word matches to any word in the splitWords array.
        if (splitWords.includes(letter)) {
            checkMatchLetter(letter);
            return true;

        } else {

            count = count + 1;
            score = chances - count;
            $(".error-messages").text(`you have ${score} tries`).fadeIn();
            //alert(`you have ${score} tries`);
            endChance();
            hangMan();
            return;
        }

    }
}
// checking the user guess is right or wrong
function checkMatchLetter(letterCh) {
    for (var i = 0; i < splitWords.length; i++) {
        if (splitWords[i] == letterCh)
            userWord[i] = letterCh;
    }
    var hangmanWord = '';
    for (var j = 0; j < userWord.length; j++) {
        hangmanWord = hangmanWord + userWord[j];
    }
    document.getElementById("resultLbl").innerText = hangmanWord;
    checkMatch();
}
// checking if the user completed the game successfully
function checkMatch() {
    for (var i = 0; i < userWord.length; i++) {
        if (userWord[i] === "_ ")
            return;
    }
    alert("you got it right");
    alert(`tries you took ${count}`);

}

//assigning parts to the man
function hangMan() {
    switch (count) {

        case 1:
            $("#hangImg").attr("src", "images/hang_2n.gif");
            break;
        case 2:
            $("#hangImg").attr("src", "images/hang_3n.gif");
            break;
        case 3:
            $("#hangImg").attr("src", "images/hang_4n.gif");
            break;
        case 4:
            $("#hangImg").attr("src", "images/hang_5n.gif");
            break;
        case 5:
            $("#hangImg").attr("src", "images/hang_6n.gif");
            break;
        case 6:
            $("#hangImg").attr("src", "images/hang_7n.gif");
            break;
        default:
            $("#hangImg").attr("src", "images/hang_1.gif")
            break;
    }
}
// game over
function endChance() {
    if (score === 0) {
        alert("you have reached your max tries")
        alert(`The word is ${currentWord}`)
    }
}
generateWord();
