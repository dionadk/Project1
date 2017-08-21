var correctWord = ['cattA', 'vasddfB', 'C'];
var userWord = [];
var score = 0;
var chances = 7;
var count = 0;
var j;
var hangMan = ['head', 'body', 'arm1', 'arm2', 'leg1', 'leg2'];


function guessLetter(letter) {
    letter = letter.toUpperCase();
    for (var i = 0; i < correctWord.length; i++) {
        // check if the user word matches to any word in the correctword array.
        if (correctWord.includes(letter)) {

            userWord.push(letter);
            correctWord.splice(i, 1); // so that user cant enter a value twice
            console.log(correctWord);
            console.log("match");
            console.log(userWord);
            count = count + 1;
            console.log(score);
            checkMatch();
            return true;


        } else {
            count = count + 1;
            console.log("wrong match");

            score = chances - count;
            //console.log(`you lost ${hangMan[j]}`)
            console.log(`you have ${score} tries`)
            endChance();


            console.log(count);
            return false;
        }

    }
}

function checkMatch() {
    console.log("check function")
    if (correctWord.length === 0) {
        console.log("you got it right");
        console.log(`tries you took ${count}`);
    }

}

function endChance() {
    if (score === 0) {
        console.log("you have reached your max tries")
    }
}

function blankSpaces(){

}
guessLetter('a');
guessLetter('d');
guessLetter('e');
guessLetter('b');
guessLetter('k');
guessLetter('h');
guessLetter('l');
