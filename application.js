
// $(document).ready(function() {
$(document).ready(function() {

/** @returns {number}
  * @summary {creates mystery number for user to guess} 
  */ 
var createNewMysteryNum = function() {
	return Math.floor(Math.random() *100 + 1);
}

/** @param {number current guess user input guess} 
@returns{boolian}
@function {takes user guess and evaluates whether it is acceptable.
If acceptable, it stores guess in array and returns true} */ 
var storeUserGuesses = function(current_guess){
	//intakes user guesses from textbox and stores in an array
	// var current_guess = prompt("Guess a number between 1 and 100");
	//test if guess is valid (integer between 1 and 100)
	if (current_guess < 1 || current_guess > 100 || isNaN(current_guess)) {
		alert("Your guess must be an integer between 1 and 100");
		return false;
	}
	//test if guess is a repeat
	if (guesses.length > 0){
		for (var key in guesses){
			if (current_guess === guesses[key]){
				alert("You've already guessed that!  Try again.");
				return false;
			}
		}

	}
	//store guess in an array
	guesses.push(current_guess);
	return true;
}

/** @returns {string with feedbackabout guess or celebration function}
  * @summary {evaluates guess and gives hint about how to guess better or calls celebration fnxn} 
  */ 
var compareGuess = function(){
	//compares the most recent guess to the mystery number and responds:
	//if the guess is too high/low
	//if it's warm or cold
	var returnString = "";
	//tests for win
	// if (guesses[guesses.length-1] === mysteryNum) {
	// 	return celebration();
	// }
	//tests warm or cold
	var difference = guesses[guesses.length-1] - mysteryNum;
	if (difference === 0){
		return celebration();
	}
	else if (difference > -10 && difference < 10){
		returnString += "You are SO hot! ";
	}
	else if (difference > -20 && difference < 20){
		returnString += "You are hot! ";
	}
	else if (difference > -40 && difference < 40){
		returnString += "You are cool! ";
	}
	else if (difference > -70 && difference < 70){
		returnString += "You are cold! ";
	}
	else if (difference < -70 ||difference > 70){
		returnString += "You are ice cold! ";
	}
	// tests for higher/lower
	if (difference > 0){
		returnString += "Guess lower.";
	}
	else if (difference < 0){
		returnString += "Guess higher.";
	}
	return returnString;
}
/** @returns {number}
  * @summary {keeps track of how many guesses remain} 
  */ 
var countdown = function(){
	//tracks number of guesses remaining
	return 5 - guesses.length;
}
/** @summary {replaces the image and makes a congratulations message} 
  */ 
var celebration = function(){
	$('#bigPic').html("<img height=300px class='centeredImage' src ='http://casapyro.com/wp-content/uploads/2014/02/Lawrenceville-To-Hold-Fireworks-HD-Wallpaper.jpg'/>");
	$('#winMessage').html('Congratulations! You Win!');
}
/** @returns {string}
  * @summary {explains how to get answer} 
  */ 
var giveHint = function(){
	var difference = guesses[guesses.length-1] - mysteryNum;
	if (difference > 0) {
		return "Try subtracting " + String(difference);
	}
	else if (difference < 0) {
		difference = 0 - difference;
		return "Try adding " + String(difference);
	}
}


//jqery instructions:

/** @param {html variable}
@returns {jquery object}
  * @summary {creates a false div with the contents of the parameter 
  	to convert it to a jquery obj} 
  */ 
var makeJqObj = function(htmlObj){
	return $('<div/>').html(htmlObj).contents();
}

var mysteryNum = createNewMysteryNum();
var guesses = [];

/** @summary {intakes user guess from input field, and 
	runs store and compare functions
	posts remaining guesses
	also clears hint text} 
  */ 
var trackGuess = function() {
	$('#hintText').html('');
	var current_guess = $('#guess').val();
	var test = storeUserGuesses(current_guess);
	if (test === true && guesses.length <= 5){
		 var remainingGuesses = countdown();
 		$('#guessesRemaining').text(remainingGuesses);
		var feedback = makeJqObj(compareGuess());
		if (guesses.length > 4) {
			feedback = makeJqObj('You used your last guess.  Game over.');
		}
		$('#guessFeedback').html(feedback);
	}
	$('#guess').val("")
}

/** @summary {Both these functions listen for guess input 
  	(enter and submit button) and run trackGuesses}
  */
$('#submit').on('click', function(){
 	trackGuess();
});
$('#guess').on('keypress', function (event) {
    if(event.which === 13){
        trackGuess();
 	}
 });

/** @summary {listens for hint button click and displays hint}
  */
$('#hint').on('click', function(){
	var hintMessage = makeJqObj(giveHint());
	$('#hintText').html(hintMessage);
});

/** @summary {listens for answer button click and displays answer}
  */
$('#answer').on('click', function(){
	$('#answer').html(mysteryNum);
});

/** @summary {listens for reset button click and resets game}
  */
$('#playAgain').on('click', function(){
	window.location.reload();
});

});





