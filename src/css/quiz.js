

const progressBarFill = document.getElementById('progressBarFill');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultsContainer = document.getElementById('resultsContainer');

let currentQuestionIndex = 0;
let totalScore = 0; // Initialize score variable
const questions = [
    { question: "5 + 3 = ?", options: [6, 7, 8, 9], answer: 2 },
    { question: "9 - 4 = ?", options: [4, 5, 6, 7], answer: 1 },
    { question: "6 x 2 = ?", options: [10, 11, 12, 13], answer: 2 },
    { question: "15 / 3 = ?", options: [3, 4, 5, 6], answer: 2 },
    { question: "7 + 2 = ?", options: [8, 9, 10, 11], answer: 1 },
    { question: "12 - 8 = ?", options: [3, 4, 5, 6], answer: 1 },
    { question: "3 x 3 = ?", options: [6, 7, 8, 9], answer: 3 },
    { question: "18 / 6 = ?", options: [2, 3, 4, 5], answer: 1 },
    { question: "10 + 5 = ?", options: [12, 14, 15, 16], answer: 2 },
    { question: "20 - 7 = ?", options: [12, 13, 14, 15], answer: 1 },
    { question: "4 x 5 = ?", options: [15, 20, 25, 30], answer: 1 },
    { question: "30 / 5 = ?", options: [5, 6, 7, 8], answer: 0 },
    { question: "8 + 6 = ?", options: [12, 13, 14, 15], answer: 2 },
    { question: "14 - 9 = ?", options: [4, 5, 6, 7], answer: 1 },
    { question: "5 x 4 = ?", options: [18, 19, 20, 21], answer: 2 },
    { question: "25 / 5 = ?", options: [3, 4, 5, 6], answer: 2 },
    { question: "11 + 3 = ?", options: [13, 14, 15, 16], answer: 1 },
    { question: "10 - 6 = ?", options: [3, 4, 5, 6], answer: 1 },
    { question: "7 x 2 = ?", options: [12, 13, 14, 15], answer: 2 },
    { question: "16 / 4 = ?", options: [3, 4, 5, 6], answer: 1 },
];
const totalQuestions = questions.length;

// Track user's selected answers
let userAnswers = [];

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBarFill.style.width = progress + '%';
}

function loadQuestion() {
    // Ensure there are questions to load
    if (currentQuestionIndex >= totalQuestions) {
        showResults();
        return;
    }

    // Load current question
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options
    nextButton.disabled = true; // Disable the "Next" button initially

    // Populate options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;

        button.onclick = () => {
            // Disable all options to prevent multiple selections
            Array.from(optionsContainer.children).forEach(option => {
                option.style.pointerEvents = 'none';
            });

            // Highlight the selected option
            if (index === currentQuestion.answer) {
                button.style.backgroundColor = '#76c7c0'; // Green for correct
                totalScore += 100; // Add 100 points for correct answer
            } else {
                button.style.backgroundColor = '#e57373'; // Red for incorrect
            }

            // Save user's selected answer
            userAnswers[currentQuestionIndex] = index;
            nextButton.disabled = false; // Enable the "Next" button
        };

        optionsContainer.appendChild(button);
    });
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        updateProgressBar();
        loadQuestion();
        triggerStarEffects();
    } else {
        showResults();
    }
}

function triggerStarEffects() {
    for (let i = 0; i < 10; i++) {
        setTimeout(createStar, i * 100);
    }
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1000);
}

function showResults() {
    questionElement.textContent = 'Quiz Completed!';
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none'; // Hide the "Next" button
    resultsContainer.innerHTML = '<h3>Your Results:</h3>';

    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'resultItem';

        const userAnswer = userAnswers[index] !== undefined ? question.options[userAnswers[index]] : 'No Answer';
        const correctAnswer = question.options[question.answer];

        resultItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p>Your Answer: ${userAnswer}</p>
            <p>Correct Answer: ${correctAnswer}</p>
        `;

        resultsContainer.appendChild(resultItem);
    });

    // Display total score
    const scoreElement = document.createElement('div');
    scoreElement.className = 'score';
    scoreElement.innerHTML = `<h3>Total Score: ${totalScore}</h3>`;
    resultsContainer.appendChild(scoreElement);
}

// Add event listener to the "Next" button
nextButton.addEventListener('click', nextQuestion);

// Initialize the quiz
updateProgressBar();
loadQuestion();
