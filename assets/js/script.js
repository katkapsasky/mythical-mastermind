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

let progressText = document.getElementById('progress-text');
let progressBarFull = document.getElementById('progress-bar-full');
let questionCounter = 0;
let maxQuestions = 10;

let submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

quiz.style.display = 'none';

/*
 *load quiz when start button is clicked
 *show quiz question and answer options
 *count and show how many questions have been answered
 */
startButton.addEventListener('click', shuffleQuestions);

function shuffleQuestions() {

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    loadQuiz();
}

function loadQuiz() {

    quiz.style.display = 'block';
    startButton.style.display = 'none';
    deselectAnswers();

    currentQuizData = shuffledQuestions[currentQuiz];

    question.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%
    `;
}

function deselectAnswers() {
    answerOptions.forEach(answerOption => answerOption.checked = false);
}

function getSelected() {
    let answer;
    answerOptions.forEach(answerOption => {
        if (answerOption.checked) {
            answer = answerOption.id;
        }
    });
    return answer;
}

/*
 *check if user answer is correct moves to next question when submit button is clicked
 *if there are questions remaining, if all questions are submitted, the user total score will be displayed along with a message
 */
submitBtn.addEventListener('click', () => {
    let answer = getSelected();
    if (answer) {
        if (answer === questions[currentQuiz].correct) {
            score++;
            document.getElementById(`${answer}_text`).innerText += `✅`;
        } else {
            document.getElementById(`${answer}_text`).innerText += `❌`;
        }

        currentQuiz++;

        if (currentQuiz < questions.length) {
            setTimeout(() => {
                loadQuiz();
            }, 1500);
        } else if (score > 7) {
            quiz.innerHTML = `
           <h2>You're a mythical mastermind!</h2>
           <p>You answered ${score}/${questions.length} questions correctly</p>

           <button onclick="location.reload()">Reload</button>
           `;
        } else {
            quiz.innerHTML = `
           <h2>Not quite a mythical mastermind...</h2> 
           <p>You answered ${score}/${questions.length} questions correctly</p>

           <button onclick="location.reload()">Reload</button>
           `;
        }
    }
});