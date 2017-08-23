/*var words = { movies:   ['jaws','titanic','back to future'],
              food:     ['pizza','burger','hot dog','noodels'],
              sports:   ['basket ball','hockey','soccer','tennis']
            }
*/



var words = ['pizza', 'onion', 'tomato', 'olives', 'chicken','hot dog'];
var userWord = []; //empty array to generate blank spaces
var score = 0; //t track your chances
var chances = 6; // max cahnce to try
var count = 0;
var splitWords = []; // splits each letter in a word
var currentWord = []; // stores the random generated word
var guessAlpabet = [];
// generate random word
function generateWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    splitWords = currentWord.split('');
    console.log(splitWords);
    //console.log(currentWord);
    var hangmanWord='';
    for (var j = 0; j < splitWords.length; j++) {
        userWord[j] = splitWords[j]==' '?' ':"_ ";
        hangmanWord=hangmanWord+"_ ";
    }
    document.getElementById("resultLbl").innerText = hangmanWord;
}
//event listener
$("#guess").on("click", function(e) {
    e.preventDefault();
    if(document.getElementById("letter").value.trim() == '')
    return;
    guessLetter(document.getElementById("letter").value.trim());

    $("#letter").val('')
});
$("#restart").click(restart);

function restart() {
    score = 0;
    count = 0;

    $("#hangImg").attr("src", "images/hang_1.gif");
    $("#letter").val('');
    guessAlpabet=[];
    userWord = [];
    document.getElementById("guessLet").innerText = guessAlpabet;
    generateWord();
}


//user inputs and checking for match
function guessLetter(letter) {
  guessAlpabet.push(letter);
  document.getElementById("guessLet").innerText = guessAlpabet;
  console.log(guessAlpabet);
    letter = letter.toLowerCase();
    for (var i = 0; i < splitWords.length; i++) {
        // check if the user word matches to any word in the correctword array.
        if (splitWords.includes(letter)) {
            checkMatchLetter(letter);
            return true;

        } else {

            count = count + 1;
            score = chances - count;
            alert(`you have ${score} more tries`);
            endChance();
            hangMan();
            return;
        }

    }
}

function hangMan(){
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
          alert("no match");
          break;
  }
}

function checkMatchLetter(letterCh) {
    for (var i = 0; i < splitWords.length; i++) {
        if (splitWords[i] == letterCh)
            userWord[i] = letterCh;
    }
    var hangmanWord='';
    for (var j = 0; j < userWord.length; j++) {
        hangmanWord=hangmanWord+userWord[j];
    }
    document.getElementById("resultLbl").innerText = hangmanWord;
    checkMatch();
}


function checkMatch() {
    for (var i = 0; i < userWord.length; i++) {
        if (userWord[i] === "_ ")
            return;
    }
    alert("you got it right");
    alert(`tries you took ${count}`);

}

function endChance() {
    if (score === 0) {
        alert("you have reached your max tries")
        alert(`The word is ${currentWord}`)

    }
}
function strikes(){

}

generateWord();
