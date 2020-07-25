
// Store colors into an array
var buttonColours = ["red", "blue", "green", "yellow"];

// Need to follow the gamePattern color sequence
var gamePattern = [];

// User's following the gamePattern color sequence here
var userClickedPattern = [];

// Need to track the game is started for the first time or not. So you only call the nextSequence() function on the first keypress
var started = false;

// Create it for counting level
var level = 0;

// Use it to detect key press from keyboard. When it will happens for the first time call the nextSequence() function
$(document).keypress(function() {
    if (!started) {

        // Change the text after press a key
        $("#level-title").text("Level " + level);

        // Call the function
        nextSequence();

        // Change the started value
        started = true;
    }
});

// Detect buttons when clicking
$(".btn").click(function() {

    // Store clickable button when got click
    var userChosenColour = $(this).attr("id");

    // Add button when got click
    userClickedPattern.push(userChosenColour);

    // Play audio to corresponding id
    playSound(userChosenColour);
    
    // Display flash animation
    animatePress(userChosenColour);

    // When user choose current answer then it is passing the index of last answer in the user's sequence
    checkAnswer(userClickedPattern.length - 1);
});

// Check what is current answer and which was last.
function checkAnswer(currentLevel) {
    
    // Check if gamePattern currentLevel and userClickedPattern currentLevel are same then get success message, otherwise get wrong message.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // if user get the right answer in step 3, then it check that they have finished their sequence another if statement
        if (userClickedPattern.length === gamePattern.length) {

            // call nextSequence() after 1000 miliseconds a delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        // Call wrong.mp3 file from the sounds folder
        playSound("wrong");

        // When gamePattern currentLevel does not match with the userClickedPattern currentLevel then added game-over class in the body tag and remove it after 200 miliseconds
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the H1 text content
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call the function re-start the game
        startOver();
    }
}

// Give's next color gradauly if user's follow the correct sequence of color
function nextSequence() {

    // It's ready for move to the next level after matching the gamePattern currentLevel between userClickedPattern currentLevel
    userClickedPattern = [];

    // Increase the level
    level++;

    // Change the title text level
    $("#level-title").text("Level " + level);

    // Get random number
    var randomNumber = Math.floor(Math.random() * 4);

    // Store random color
    var randomChosenColour = buttonColours[randomNumber];
    
    // Push color randomly
    gamePattern.push(randomChosenColour);

    // Get ids randomly with flash animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play audio to corresponding id
    playSound(randomChosenColour);
     
}

// Create the playSound function to take a single input parameter called name
function playSound(name) {

    // Play audio to corresponding id
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 

}


// Create the function for animation and it will take a single input parameter
function animatePress(currentColour) {

    // Add pressed class when got click corresponding button
    $("#" + currentColour).addClass("pressed");
    
    // Remove pressed class after click 100 miliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// When game is over then it will start the game again
function startOver() {

    // reset the value of these varaibles
    level = 0;
    gamePattern = [];
    started = false;
}