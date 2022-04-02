var body = document.querySelector("body");
var timer = document.querySelector("#time");
var quizInstructions = document.querySelector(".quizInstructions");
var start_button = document.querySelector("#startButton");
var question = document.querySelector(".question");
var choicesGroup = document.querySelector(".answerChoices");
var returnAnswer = document.querySelector(".returnAnswer");
var finalScore = document.querySelector(".final-score");
var endOfGame = document.querySelector(".endgame");
var main = document.querySelector(".main");
var title = document.querySelector(".title");

var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

var submitInitials = document.querySelector(".initial-form");

var currentTime = timer.textContent;
var userQuestion = 0;

//This will initialize the high score to 0 if there isn't one in local storage. 
var highScore = localStorage.getItem("highscore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
    highScore = 0;
}

var questions = [{
        questionString: "JavaScript is an ______ language?",
        answers: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
        correctAnswer: 0,
    },
    {
        questionString: "Which are the following keywords is used to define a variable in Javascript ",
        answers: ["var", "let", "Both var and let", "None of the above"],
        correctAnswer: 2,
    },
    {
        questionString: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: ["getElementbyId", "getElementsbyClassName()", "getclassElements()", "FunctionClass()"],
        correctAnswer: 1,
    },
    {
        questionString: " Arrays in JavaScript are defined by which of the following statements",
        answers: ["It is an ordered list of values", "It is an ordered list of objects", "It is an ordered list of string", "It is an ordered list of functions"],
        correctAnswer: 0,
    },
    {
        questionString: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        answers: ["Location", "Standard", "Window", "Position"],
        correctAnswer: 2,
    },
    
]

function quizQuestion(timerInterval) {
    checkTime(timerInterval);

    // if all questions have been answered end the game
    if (userQuestion < questions.length) {
        question.textContent = questions[userQuestion].questionString;

        answer1.textContent = questions[userQuestion].answers[0];
        answer2.textContent = questions[userQuestion].answers[1];
        answer3.textContent = questions[userQuestion].answers[2];
        answer4.textContent = questions[userQuestion].answers[3];
    } else {
        endGame();
    }
}

function checkAnswer() {

    // if statement checking for correct answer array and display the "this answer is correct"
    if ((this.textContent) == (questions[userQuestion].answers[questions[userQuestion].correctAnswer])) {
        returnAnswer.textContent= "This is answer is correct";

    } else {
        //subtracts 7 seconds if user selects wrong answer and displays this answer is wrong
        currentTime -= 7;
        returnAnswer.textContent="This answer is wrong";
        if (currentTime < 1) {
            endGame();
        }
    }

    userQuestion++;

    quizQuestion();
}

// This checks to make sure there is still time left.
function checkTime(timerInterval) {
    if (userQuestion == questions.length) {
        clearInterval(timerInterval);
        endGame();
    } else if (currentTime <= 0) {
        timer.textContent = 0;
        currentTime = 0;
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    question.style.display = "none";
    choicesGroup.style.display = "none";
    returnAnswer.style.display = "none";
    endOfGame.style.display = "block";

    // This checks to see if the user's score is the new high score.
    if (currentTime > parseInt(localStorage.getItem("highScore"))) {
        finalScore.textContent = ("You have the new high score! Your final score is " + currentTime + ".");
    } else {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    }
}

// This function stores the user's score in local storage.
function resetGame() {
    var user_initials = document.querySelector("#user_initials").value;

    localStorage.setItem("highScore", currentTime);
    localStorage.setItem(user_initials, currentTime);
}

start_button.addEventListener("click", function () {
    var timerStart = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime;
        checkTime(timerStart);
    }, 1000)
    quizInstructions.style.display = "none";
    choicesGroup.style.display = "block";
    main.style.display = "block";
    question.style.display = "block";
    quizQuestion(timerStart);
})
// event listeners to all the answer choices.
var buttons = document.querySelectorAll(".answer-choice").forEach(function (event) {
    event.addEventListener("click", checkAnswer);
})