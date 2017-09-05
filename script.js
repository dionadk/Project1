class myWords {
  constructor() {
    this.movies = [],
    this.food = [],
    this.sports = []
  }
}
myWords.movies = ['jaws', 'titanic', 'back to the future', 'forrest gump', 'star wars', 'rocky', 'the dark knight'];
myWords.food = ['pizza', 'burger', 'hot dog', 'noodles', 'pasta', 'salad', 'ravioli', 'buritto','soup'];
myWords.sports = ['basket ball', 'hockey', 'soccer', 'tennis', 'base ball', 'rugby', 'cricket', 'volley ball'];

/*
AS: 
The way you are using this object, it would probably be best to use
an object literal, so

let myWords = {
  movies: ['jaws', 'titanic', 'back to the future', 
    'forrest gump', 'star wars', 'rocky', 'the dark knight'],
  food: ['pizza', 'burger', 'hot dog', 'noodles', 'pasta', 
    'salad', 'ravioli', 'buritto', 'soup'],
  sports: ['basket ball', 'hockey', 'soccer', 
    'tennis', 'base ball', 'rugby', 'cricket', 'volley ball']
}
*/

// AS - I would be consistent here and have comments for each of these
var userWord = []; //empty array to generate blank spaces
var score = 0; //t track your chances
var chances = 6; // max cahnce to try
var count = 0;
var splitWords = []; // splits each letter in a word
var currentWord = []; // stores the random generated word
var guessAlphabet = [];
var words = myWords.food;
var win = 0;
var loss = 0;

//event listener
//selct dropdown list
$("#selCategory").on("change", function(e) {
  // AS - why is this variable called res? I would use the full word instead
  // of an abbreviation
  var res = e.currentTarget.value;
  /* AS - These should be indented, you could also 
    do return myWords[res] which would reduce these 
    10 lines to 1 */
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
  guessAlphabet = [];
  userWord = [];
  // AS - be consistent in using either JQuery or Vanilla JS's Dom manipulation.
  document.getElementById("guessLet").innerText = guessAlphabet;
  generateWord();
}

/* AS - Be consistent in spacing between functions */

// generate random word
function generateWord() {
  var selectWord = '';
  do {
    // AS - Good use of the do while loop!
    selectWord = words[Math.floor(Math.random() * words.length)];
  } while (currentWord === selectWord);
  currentWord = selectWord;
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
// AS - I would break this up -- really long function!
function guessLetter(letter) {
  if (chances - count === 0)
  return;
  // array to keep track of the letters entered by user
  if (guessAlphabet.includes(letter))
  return;

  guessAlphabet.push(letter);

  document.getElementById("guessLet").innerText = guessAlphabet;
  letter = letter.toLowerCase();
  for (var i = 0; i < splitWords.length; i++) {
    // check if the user word matches to any word in the splitWords array.
    if (splitWords.includes(letter)) {
      checkMatchLetter(letter);
      return true;

    } else {

      count = count + 1;
      score = chances - count;
      $(".error-messages").html(`YOU HAVE ${score} TRIES`).fadeIn(2000);
      // AS - no need to reset the HTML content here.
      $(".error-messages").fadeOut(1000);
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
    userWord[i] = letterCh.toUpperCase();
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
  $(".error-messages").html(`CONGRATS!!!YOU WIN`).fadeIn(3000);
  $(".error-messages").fadeOut(4000);
  win++;
  $("#winSummary").text(win);
}

//assigning parts to the man
function hangMan() {
  // AS - $("#hangImg").attr("src", `images/hang_`${count+1}n.gif"`)
  // would cover all of this.
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
    $("#hangImg").attr("src", "images/hang_1.gif");
    break;
  }
}
// game over
function endChance() {
  if (score === 0) {
    /*
    AS - would shorten this line here

    let errorMessage = $(".error-messages")
    errorMessage.html(`HANGED!!!YOU HAVE REACHED YOUR MAX TRIES.
      THE WORD IS ${currentWord.toUpperCase()}`)
    errorMessage.fadeIn(3000).fadeOut(5000)
    */
    $(".error-messages").html(`HANGED!!!YOU HAVE REACHED YOUR MAX TRIES.THE WORD IS ${currentWord.toUpperCase()}`).fadeIn(3000);
    $(".error-messages").fadeOut(5000);
    loss++;
    $("#lossSummary").text(loss);
    console.log(loss);
  }
}

// AS - remove dead code!
function setScore() {

}
generateWord();
