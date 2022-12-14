/* jshint esversion: 11 */

// variables for quiz functionality
let startButton = document.getElementById('start');
let quiz = document.getElementById('quiz');
let answerOptions = document.querySelectorAll('.answer');
let question = document.getElementById('question');
let shuffledQuestions, currentQuizData;
let a_text = document.getElementById('a_text');
let b_text = document.getElementById('b_text');
let c_text = document.getElementById('c_text');
let d_text = document.getElementById('d_text');

// variables for quiz progress 
let progressText = document.getElementById('progress-text');
let progressBarFull = document.getElementById('progress-bar-full');
let questionCounter = 0;
let maxQuestions = 10;
let submitBtn = document.getElementById('submit');
let currentQuiz = 0;
let score = 0;

// hide quiz questions 
quiz.classList.add("hide");

// shuffle questions when start button is clicked
startButton.addEventListener('click', shuffleQuestions);

// function to shuffle quiz questions
function shuffleQuestions() {

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    loadQuiz();
    startTimer();
}

// variable to show quiz countdown
document.getElementById('countdown').innerHTML =
    05 + ":" + 01;

/* function to countdown 5 mins from beginning of quiz
 *  logic customised from CodePen: https://codepen.io/ishanbakshi/pen/pgzNMv
 */
function startTimer() {
    let countdown = document.getElementById('countdown');
    if (countdown) {

        var presentTime = document.getElementById('countdown').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) {
            m = m - 1;
        }
        if (m + s == 0) {
            quiz.innerHTML = `
                 <h2>Oh no! You ran out of time!</h2>
                 <p>You answered ${score}/${questions.length} questions correctly</p>
      
                 <button onclick="location.reload()" id="reload-button">Reload</button>
                 `;
        }

        document.getElementById('countdown').innerHTML =
            m + ":" + s;
        setTimeout(startTimer, 1000);
    }

}

// function to add zero in front of numbers < 10
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec;
    }
    if (sec < 0) {
        sec = "59";
    }
    return sec;
}

/* function to display quiz questions and hide start button
 *  loadQuiz() function code taken from Coding with Nick tutorial
 *  https://codingwithnick.in/create-a-quiz-app-using-html-css-javascript/
 */
function loadQuiz() {

    quiz.classList.remove("hide");
    startButton.classList.add("hide");
    deselectAnswers();

    currentQuizData = shuffledQuestions[currentQuiz];

    question.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%
    `;
}

// function to ensure all options are unchecked before user picks
function deselectAnswers() {
    answerOptions.forEach(answerOption => answerOption.checked = false);
}

// function to log user's answer choice
function getSelected() {
    let answer;
    answerOptions.forEach(answerOption => {
        if (answerOption.checked) {
            answer = answerOption.id;
        }
    });
    return answer;
}

answerOptions.forEach(answerOption => {
    answerOption.addEventListener("click", function () {
        submitBtn.classList.remove("hide");
    });
});

// check if answer is correct and display to user
submitBtn.addEventListener('click', () => {
    submitBtn.classList.add("hide");
    let answer = getSelected();
    if (answer) {
        if (answer === questions[currentQuiz].correct) {
            score++;
            document.getElementById(`${answer}_text`).innerText += `???`;
        } else {
            document.getElementById(`${answer}_text`).innerText += `???`;
        }
        currentQuiz++;
        // continue loading questions until running out and then display user score
        if (currentQuiz < questions.length) {
            setTimeout(() => {
                loadQuiz();
            }, 1500);
        } else if (score > 7) {
            localStorage.setItem("mostRecentScore", score);
            quiz.innerHTML = `
           <h2 class="mastermind">You're a mythical mastermind!</h2>
           <p class="mastermind">You answered ${score}/${questions.length} questions correctly</p>

           <button onclick="location.reload()" id="reload-button">Reload</button>
           <a href="end.html" id="save-button">Save Score</a>
           `;
        } else {
            localStorage.setItem("mostRecentScore", score);
            quiz.innerHTML = `
           <h2 class="mastermind">Not quite a mythical mastermind...</h2> 
           <p class="mastermind">You answered ${score}/${questions.length} questions correctly</p>

           <button onclick="location.reload()" id="reload-button">Reload</button>
           <a href="end.html" id="save-button">Save Score</a>
           `;
        }
    }
});