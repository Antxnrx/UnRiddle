// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXOUMu7n597O69b4CmQPW_D5D7_n9iB8Y",
  authDomain: "unriddle-755c3.firebaseapp.com",
  projectId: "unriddle-755c3",
  storageBucket: "unriddle-755c3.firebasestorage.app",
  messagingSenderId: "345616107913",
  appId: "1:345616107913:web:d7e3b37b64396566a07958",
  measurementId: "G-EQNS2W6BVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");

// Quiz elements
const progressBarFill = document.getElementById('progressBarFill');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultsContainer = document.getElementById('resultsContainer');

// Quiz variables
let currentQuestionIndex = 0;
let totalScore = 0;
const questions = [
  { question: "5 + 3 = ?", options: [6, 7, 8, 9], answer: 2 },
  { question: "9 - 4 = ?", options: [4, 5, 6, 7], answer: 1 },
  { question: "6 x 2 = ?", options: [10, 11, 12, 13], answer: 2 },
  { question: "15 / 3 = ?", options: [3, 4, 5, 6], answer: 2 },
  { question: "7 + 2 = ?", options: [8, 9, 10, 11], answer: 1 },
];
const totalQuestions = questions.length;
let userAnswers = [];

// Initialize quiz
function initializeQuiz() {
  console.log("Quiz initialized!");
  updateProgressBar();
  loadQuestion();
  setupEventListeners();
}

// Update Firestore with earned points
async function updateUserPoints(points) {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        points: increment(points)
      });
      console.log("Points updated in Firestore!");
    }
  } catch (error) {
    console.error("Error updating points:", error);
    alert("Error saving points. Please check your connection!");
  }
}

// Quiz progress functions
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBarFill.style.width = `${progress}%`;
}

function loadQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';
  nextButton.disabled = true;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('div');
    button.className = 'option';
    button.textContent = option;

    button.onclick = () => {
      Array.from(optionsContainer.children).forEach(opt => {
        opt.style.pointerEvents = 'none';
      });

      if (index === currentQuestion.answer) {
        button.style.backgroundColor = '#76c7c0';
        totalScore += 100;
      } else {
        button.style.backgroundColor = '#e57373';
      }

      userAnswers[currentQuestionIndex] = index;
      nextButton.disabled = false;
    };

    optionsContainer.appendChild(button);
  });
}

// Results handling
async function showResults() {
  try {
    await updateUserPoints(totalScore);
    
    questionElement.textContent = 'Quiz Completed! 🎉';
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    
    resultsContainer.innerHTML = `
      <div class="results-box">
        <h2>Your Score: <span class="final-score">${totalScore}</span> points!</h2>
        <button class="retry-button" onclick="location.reload()">Try Again</button>
      </div>
    `;

    triggerCelebration();
  } catch (error) {
    console.error("Error showing results:", error);
  }
}

// Celebration animation
function triggerCelebration() {
  for (let i = 0; i < 50; i++) {
    setTimeout(createStar, i * 50);
  }
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

// Event listeners
function setupEventListeners() {
  nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      updateProgressBar();
      loadQuestion();
    } else {
      showResults();
    }
  });
}

// Start the quiz
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeQuiz();
  } catch (error) {
    console.error("Initialization error:", error);
    questionElement.textContent = "Error initializing quiz. Please refresh!";
  }
});