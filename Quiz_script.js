// Quiz data
const quizData = {
    HTML:[
        {
            question: 'What is the purpose of the `<html>` tag in HTML?',
            answers: [
                'To define a paragraph',
                'To define a heading',
                'To define the root element of an HTML document',
                'To define a link'
            ],
            correctAnswer: 2
        },
        {
            question: 'Which HTML tag is used to define an unordered list?',
            answers: [
                '<ol>',
                '<ul>',
                '<li>',
                '<dl>'
            ],
            correctAnswer: 1
        },
        {
            question: 'What is the purpose of the `alt` attribute in the `<img>` tag?',
            answers: [
                'To specify the image source',
                'To specify the image width and height',
                'To provide a text description of the image',
                'To specify the image border'
            ],
            correctAnswer: 2
        },
        {
            question: 'Which HTML tag is used to define a table row?',
            answers: [
                '<table>',
                '<tr>',
                '<td>',
                '<th>'
            ],
            correctAnswer: 1
        },
        {
            question: 'What is the purpose of the `<meta>` tag in HTML?',
            answers: [
                'To define a heading',
                'To define a paragraph',
                'To provide metadata about the document',
                'To define a link'
            ],
            correctAnswer: 2
        }
    ],
    CSS:[
        {
            question: 'What is the purpose of the `display` property in CSS?',
            answers: [
                'To set the background color of an element',
                'To set the text color of an element',
                'To define the type of box used to display an element',
                'To set the font size of an element'
            ],
            correctAnswer: 2
        },
        {
            question: 'What is the difference between `margin` and `padding` in CSS?',
            answers: [
                '`margin` is used to add space between elements, while `padding` is used to add space between an element and its border',
                '`margin` is used to add space between an element and its border, while `padding` is used to add space between elements',
                '`margin` and `padding` are interchangeable terms',
                'There is no difference between `margin` and `padding`'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `float` property in CSS?',
            answers: [
                'To allow an element to be positioned on either side of its parent element',
                'To allow an element to be positioned at the top or bottom of its parent element',
                'To allow an element to be positioned at a specific coordinate on the page',
                'To allow an element to be hidden from view'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `z-index` property in CSS?',
            answers: [
                'To set the order in which elements are stacked on top of each other',
                'To set the background color of an element',
                'To set the text color of an element',
                'To set the font size of an element'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `@media` rule in CSS?',
            answers: [
                'To define styles for a specific device or screen size',
                'To define styles for a specific browser or operating system',
                'To define styles for a specific element or class',
                'To define styles for a specific pseudo-class or pseudo-element'
            ],
            correctAnswer: 0
        }
    ],
    JS: [
        {
            question: 'What is the output of the following code: `console.log(typeof null)`?',
            answers: [
                'object',
                'null',
                'undefined',
                'string'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `this` keyword in JavaScript?',
            answers: [
                'To refer to the global object',
                'To refer to the current object',
                'To refer to the parent object',
                'To refer to the child object'
            ],
            correctAnswer: 1
        },
        {
            question: 'What is the difference between `==` and `===` in JavaScript?',
            answers: [
                '`==` checks for value equality, while `===` checks for both value and type equality',
                '`==` checks for both value and type equality, while `===` checks for value equality',
                '`==` and `===` are interchangeable',
                'There is no difference between `==` and `===`'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `bind()` method in JavaScript?',
            answers: [
                'To bind a function to a specific context',
                'To bind a function to a specific argument',
                'To bind a function to a specific return value',
                'To bind a function to a specific exception'
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the purpose of the `Promise` object in JavaScript?',
            answers: [
                'To handle asynchronous operations',
                'To handle synchronous operations',
                'To handle errors',
                'To handle exceptions'
            ],
            correctAnswer: 0
        }
    ]
};

let currentQuestion = 0;
let score = 0;
let topic;

// Function to display the question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');

    // Clear the answers element
    answersElement.innerHTML = '';

    // Display the question
    questionElement.textContent = quizData[topic][currentQuestion].question;

    // Display the answers
    quizData[topic][currentQuestion].answers.forEach((answer, index) => {
        const answerElement = document.createElement('li');
        answerElement.textContent = answer;
        answerElement.addEventListener('click', () => {
            checkAnswer(index);
        });
        answersElement.appendChild(answerElement);
    });
}

// Function to check the answer
function checkAnswer(answerIndex) {
    if (answerIndex === quizData[topic][currentQuestion].correctAnswer) {
        score++;
    }

    // Display the next question
    currentQuestion++;
    if (currentQuestion >= quizData[topic].length) {
        displayScore();
    } 
    else {
        displayQuestion();
    }
}

// Function to display the score
function displayScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Your score is ${score} out of ${quizData[topic].length}`;
}

// Function to reset the quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
}

// Initialize the quiz
function initQuiz() {
    topic = document.getElementById('topic-selection').value;
    if (topic) {
        displayQuestion();
    } 
}

// Add event listener to the topic selection element
document.getElementById('topic-selection').addEventListener('change', initQuiz);

// Add event listener to the start button
document.getElementById('start-button').addEventListener('click', initQuiz);

// Add event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetQuiz);

// Add event listener to the answers element
document.getElementById('answers').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        checkAnswer(Array.prototype.indexOf.call(event.target.parentNode.children, event.target));
    }
});

// Initialize the quiz
initQuiz();



// Configuration
const TIMER_DURATION = 10; // in seconds
const TIMER_ELEMENT_ID = 'timer';

// State
let timeLeft = TIMER_DURATION;
let intervalId = null;

// DOM element
const timerElement = document.getElementById(TIMER_ELEMENT_ID);

// Functions
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}


function startTimer() {
  intervalId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft === 0) {
      clearInterval(intervalId);
      checkAnswer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  timeLeft = TIMER_DURATION;
  updateTimerDisplay();
}

// Initialize the timer
updateTimerDisplay();
startTimer();












// // Add a countdown timer
// let timeLeft = 10; // 1 minute
// const timerElement = document.getElementById('timer');

// setInterval(() => {
//     timeLeft--;
//     timerElement.textContent = `Time left: ${timeLeft} seconds`;

//     if (timeLeft === 0) {
//         // Submit the quiz automatically when the timer runs out
//         checkAnswer();
//         timerElement.textContent= `Time is up`;

//     }
// }, 1000); // Update the timer every 1 second







