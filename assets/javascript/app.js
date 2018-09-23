$(document).ready(function () {

// Create the questions being asked as well as the choices and use the index number for the answer

var questionArray = [

    {
        question: "What are Fairy types strong against?", 
        choice: ["Bug Types", "Dragon Types", "Nuclear Waste", "Fire Types"],
        answer: 1,
        photo: "./assets/images/dragon.gif"
    },

    {
        question: "What was Ash's first Pokemon?", 
        choice: ["Charmander", "Snorlax", "Agumon", "Pikachu"],
        answer: 3,
        photo: "./assets/images/ash.gif"
    }, 

    {
        question: "Which Pokemon could talk in the human language?", 
        choice: ["Meowth", "Weepinbell", "Your Mother", "Ekans" ],
        answer: 0,
        photo: "./assets/images/meowth.gif_c200"
    }, 

    {
        question: "Which of the following is considered the God Pokemon?", 
        choice: ["Jehova", "Dialga", "Arceus", "Mew" ],
        answer: 2,
        photo: "./assets/images/arceus.gif"
    }, 

    {
        question: "In the first Pokemon movie, which pokemon was the main antagonist?", 
        choice: ["Darkrai", "Girantina", "Celebi", "Mewtwo" ],
        answer: 3,
        photo: "./assets/images/mewtwo.gif_c200"
    }, 

    {
        question: "Which pokemon has the tastiest tail?", 
        choice: ["Magikarp", "Slowpoke", "Tastytailmon", "Tropius" ],
        answer: 1,
        photo: "./assets/images/slowpoke.gif"
    }, 

    {
        question: "What item must be used to evolve Eevee into Espeon?", 
        choice: ["Psystone", "Sunstone", "Love", "TwistedGlasses" ],
        answer: 2,
        photo: "./assets/images/espeon.gif"
    }, 

    {
        question: "In which generation were steel and dark types introduced?", 
        choice: ["Johto", "Kanto", "Unova", "Ilovya" ],
        answer: 0,
        photo: "./assets/images/steelix.gif"
    }, 

    {
        question: "Which Pokemon was the go to HM Slave?", 
        choice: ["Nidoran", "Swampert", "Bidoof", "Skarmory" ],
        answer: 2,
        photo: "./assets/images/bidoof.gif"
    }, 

    {
        question: "How many calories are in one Magikarp?", 
        choice: [" ¯\_(ツ)_/¯ ", "You can eat those things!?", "1200 kcal", "Idk man, but they taste good" ],
        answer: 0,
        photo: "./assets/images/magikarp.gif"
    }];
    
// Create variables to hold the guesses the player makes

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;

// Create a timer to count down the seconds

    var timer = 20;

// Add various variables for holding the timer interval, user guesses, and the questions asked in arrays

    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = questionArray.length;
    var userPick;
    var index;
    var newArray = [];
    var holder = [];

// Audio for the background music and on-click events

let background = new Audio("./assets/audio/hoenn.mp3");

let rattata = new Audio("./assets/audio/rattata.mp3");

let start = new Audio("./assets/audio/startcut.mp3");

// Set it so it loops

background.volume = .5;
background.loop = true;
    
    
// Hide the restart button at the beginning of the game to bring up later
    
$("#restart").hide();


// Click event for the start button

$("#start").on("click", function () {

    $("#start").hide();

    // Start background music

    start.play();

    function backgroundPlay() {

        background.play();
    };

    setTimeout(backgroundPlay, 2000);

    // Using black background for intro flashing

    var bg = $(".bg");

    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    bg.fadeToggle(100);
    

    // Display the first question chosen randomly

    displayQuestion();

    runTimer();

    // Push each question into the array

    for(var i = 0; i < questionArray.length; i++) {

        holder.push(questionArray[i]);

    }
})

// Timer function

function runTimer(){

    if (!running) {

    intervalId = setInterval(decrement, 1000); 

    running = true;

    }
}

// Timer countdown

function decrement() {

    $("#countdown").text("Countdown: " + timer);

    timer --;

    // If the user runs out of time, we display the fail message and move on

    if (timer === 0) {

        unanswerCount++;

        stop();

        $("#answerBlock").html("<div>Oof, you'll catch 'em next time! The correct answer is: " + userPick.choice[userPick.answer] + "</div>");

        hidePicture();
    }	
}
    

function stop() {

    running = false;

    clearInterval(intervalId);

}

// Randomly chooses a question to display and the choices

function displayQuestion() {

    index = Math.floor(Math.random()*questionArray.length);

    userPick = questionArray[index];

    // Place the question into the question block an creates individual divs for the answers
        
    $("#questionblock").html("<div>" + userPick.question + "</div>");

        for(var i = 0; i < userPick.choice.length; i++) {

            var userChoice = $("<div>");

            userChoice.addClass("answerChoice");

            userChoice.html(userPick.choice[i]);

            userChoice.attr("data-guessvalue", i);

            $("#answerBlock").append(userChoice);

        }

//click function to select answer and outcome

    $(".answerChoice").on("click", function () {

        rattata.play();

        // Grabs the position of the answer from the array

        userGuess = parseInt($(this).attr("data-guessvalue"));

        //Checks if it matches the same number that the correct number shows

        if (userGuess === userPick.answer) {

            stop();

            correctCount++;

            userGuess="";

            $("#answerBlock").html("<p>Correct!</p>");

            hidePicture();

        } 
        
        else {

            stop();

            wrongCount++;

            userGuess="";

            $("#answerBlock").html("<p>Oof, you'll catch 'em next time! The correct answer is: " + userPick.choice[userPick.answer] + "</p>");
            
            hidePicture();
        }
        
    })

};
    

// Shows the picture of the question shown
    
function hidePicture () {

    $("#answerBlock").append("<img class= 'visuals' src=" + userPick.photo + ">");

    newArray.push(userPick);

    questionArray.splice(index,1);

    // Reset the timer and clear out the display for the next question or screen

    setTimeout(function() {

        $("#answerBlock").empty();

        timer = 20;

    // Shows the final display screen if all the questions have been asked

    if ((wrongCount + correctCount + unanswerCount) === qCount) {

        $("#questionblock").empty();

        $("#questionblock").html("<p>You're a Pokemon Master!  Here's your score: </p>");

        $("#answerBlock").append("<p> Correct: " + correctCount + "</p>" );

        $("#answerBlock").append("<p> Incorrect: " + wrongCount + "</p>" );

        $("#answerBlock").append("<p> Unanswered: " + unanswerCount + "</p>" );

        $("#restart").show();

        correctCount = 0;

        wrongCount = 0;

        unanswerCount = 0;

    } 
    
    else {

        runTimer();

        displayQuestion();

    }

    }, 4000);


}

$("#restart").on("click", function() {

    $("#restart").hide();

    $("#answerBlock").empty();

    $("#questionblock").empty();

    for(var i = 0; i < holder.length; i++) {

        questionArray.push(holder[i]);
    }

    runTimer();

    displayQuestion();

});
    
});