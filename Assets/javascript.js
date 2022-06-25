var mainQuiz = document.getElementById("quiz");
var resultsEl = document.getElementById("end");
var endScore = document.getElementById("endScore");
var overDiv = document.getElementById("over");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");

var beginQuizBtn = document.getElementById("startbtn");
var startingQuiz = document.getElementById("startpage");

var hsContainer = document.getElementById("hsContainer");
var hsMain = document.getElementById("hsPage");
var hsEnterInitals = document.getElementById("initials");
var hsName = document.getElementById("hsInitials");
var endBtn = document.getElementById("endBtn");
var submitScoreBtn = document.getElementById("submitScore");
var hsDisplay = document.getElementById("highscore");


var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
  question: "How do you connect a style.css sheet to your HTML?",
  choiceA: "you just drag it",
  choiceB: "create a function",
  choiceC: "use 'link' tag",
  choiceD: "you can't",
  correctAnswer: "c"
},
{
  question: "What makes a page interactive for a user?",
  choiceA: "Javascript",
  choiceB: "HTML",
  choiceC: "CSS",
  choiceD: "You do it in 'inspect'",
  correctAnswer: "a"
},
{
  question: "How can you add style and personal touch to a webpage?",
  choiceA: "HTML",
  choiceB: "APIs",
  choiceC: "Node",
  choiceD: "CSS",
  correctAnswer: "d"
},
{
  question: "Does the javascript link go before, or after the header tag?",
  choiceA: "Before",
  choiceB: "In the middle",
  choiceC: "There is no link",
  choiceD: "After",
  correctAnswer: "d"
},
{
  question: "Is coding fun?",
  choiceA: "Yes",
  choiceB: "If you are good at it...",
  choiceC: "No",
  choiceD: "I am crying on the inside",
  correctAnswer: "b"
},
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 61;
var timerInterval;
var score = 0;

function generateQuizQuestion() {
  overDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz() {
  overDiv.style.display = "none";
  startingQuiz.style.display = "none";
  generateQuizQuestion();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  mainQuiz.style.display = "block";
}

function showScore() {
  mainQuiz.style.display = "none"
  overDiv.style.display = "flex";
  clearInterval(timerInterval);
  hsEnterInitals.value = "";
  endScore.innerHTML = "You got a total of " + score + " out of " + quizQuestions.length + " answers right";
}

submitScoreBtn.addEventListener("click", function highscore() {

  if (hsEnterInitals.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = hsEnterInitals.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score
    };

    overDiv.style.display = "none";
    hsContainer.style.display = "flex";
    hsMain.style.display = "block";
    endBtn.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();

  }

});

function generateHighscores() {
  hsName.innerHTML = "";
  hsDisplay.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    hsName.appendChild(newNameSpan);
    hsDisplay.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startingQuiz.style.display = "none"
  overDiv.style.display = "none";
  hsContainer.style.display = "flex";
  hsMain.style.display = "block";
  endBtn.style.display = "flex";

  generateHighscores();
}

function replayQuiz() {
  hsContainer.style.display = "none";
  overDiv.style.display = "none";
  startingQuiz.style.display = "flex";
  timeLeft = 61;
  score = 0;
  currentQuestionIndex = 0;
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("That Is Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    alert("That Is Incorrect.")
    currentQuestionIndex++;
    generateQuizQuestion();

  } else {
    showScore();
  }
}

beginQuizBtn.addEventListener("click", startQuiz);