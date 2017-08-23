# Project1
Hangman
You have three categories to play with
created a class - myWords, and objects as different categories
# How to play the gameWord
User has 6 chances for wrong guesses.
# Technologies used
HTML,CSS,JS and jquery
# How it works
#Even listener1 - select category
user can choose a category from the drop down list
then an event listener is used to identify the category user picked and generates random words on the selected category
#Event Listener2-guess letter
Now the user can enter the letter and click the guess ,which triggers an even listener and calls the function to check the guesses letter.
 If its true the letter will be added to front page
else the 1st image pops up with head and have a score which tracks the number of tries.
Have used a switch statement to display the hangman images when the user goes wrong. Have used a count variable to track.
#functions
1. Generate word
picks up a random word and splits into characters
2.Guess letter
converts the user input to lower case and checks if it is included in the correct word
3. check match letter
if there is a match the correct letter is assigned to the game board
4. hangman
if the guess is wrong , hangman image gets updated.
5. end chance
To check if the user took all the tries
6. restart
new word tab will restart the whole game and generate a random word

used fadeIn and fadeOut to display the error messages and the win messages
