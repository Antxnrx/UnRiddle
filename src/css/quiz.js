// Quiz logic
const progressBarFill = document.getElementById('progressBarFill');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');

let currentQuestionIndex = 0;
let totalScore = 0;  // Initialize score variable
const totalQuestions = 20;

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

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBarFill.style.width = progress + '%';
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;

        button.onclick = () => {
            if (index === currentQuestion.answer) {
                button.style.backgroundColor = '#76c7c0'; // Green for correct
                totalScore += 100; // Add 100 points for correct answer
                setTimeout(() => {
                    nextQuestion();
                }, 500);
            } else {
                button.style.backgroundColor = '#e57373'; // Red for incorrect
                totalScore -= 20; // Deduct 20 points for incorrect answer
            }
        };

        optionsContainer.appendChild(button);
    });
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        updateProgressBar();
        loadQuestion();
    } else {
        alert('Quiz Completed! Well Done!');
        savePointsToFirestore(totalScore);  // Save score to Firestore
    }
}

async function savePointsToFirestore(score) {
    const user = auth.currentUser;  // Get the current logged-in user
    if (user) {
        const userRef = doc(db, "users", user.uid);  // Reference to the user's Firestore document
        await setDoc(userRef, {
            points: score
        }, { merge: true });  // Save or update the score field
    }
}

updateProgressBar();
loadQuestion();
