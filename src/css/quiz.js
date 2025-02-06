// Add Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXOUMu7n597O69b4CmQPW_D5D7_n9iB8Y",
  authDomain: "unriddle-755c3.firebaseapp.com",
  projectId: "unriddle-755c3",
  storageBucket: "unriddle-755c3.firebasestorage.app",
  messagingSenderId: "345616107913",
  appId: "1:345616107913:web:d7e3b37b64396566a07958",
  measurementId: "G-EQNS2W6BVM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Existing quiz variables
const progressBarFill = document.getElementById('progressBarFill');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultsContainer = document.getElementById('resultsContainer');

let currentQuestionIndex = 0;
let totalScore = 0;
const questions = [ /* Keep your existing questions array */ ];
const totalQuestions = questions.length;
let userAnswers = [];

// Add points display element
const pointsDisplay = document.createElement('div');
pointsDisplay.className = 'points-display';
document.querySelector('.progress').appendChild(pointsDisplay);

async function updateUserPoints(points) {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        points: increment(points)
      });
      console.log("Points updated successfully!");
    }
  } catch (error) {
    console.error("Error updating points:", error);
  }
}

async function showResults() {
  questionElement.textContent = 'Quiz Completed!';
  optionsContainer.innerHTML = '';
  nextButton.style.display = 'none';
  
  // Update Firestore with earned points
  await updateUserPoints(totalScore);

  // Show results
  resultsContainer.innerHTML = `
    <h3>Your Results:</h3>
    <div class="final-score">
      <span>🎉 Total Score:</span>
      <span class="score-number">${totalScore}</span>
    </div>
    <button onclick="location.reload()" class="retry-button">Try Again</button>
  `;

  // Add celebration effect
  for(let i = 0; i < 50; i++) {
    setTimeout(createStar, i * 50);
  }
}

// Modified option click handler
button.onclick = async () => {
  Array.from(optionsContainer.children).forEach(option => {
    option.style.pointerEvents = 'none';
  });

  if (index === currentQuestion.answer) {
    button.style.backgroundColor = '#76c7c0';
    totalScore += 100;
    // Add immediate feedback
    button.innerHTML += ' 🎉';
    await triggerConfetti(button);
  } else {
    button.style.backgroundColor = '#e57373';
    button.innerHTML += ' ❌';
  }

  userAnswers[currentQuestionIndex] = index;
  nextButton.disabled = false;
};

// Add confetti effect
async function triggerConfetti(element) {
  const confettiCount = 20;
  for(let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = `${element.offsetLeft + element.offsetWidth/2}px`;
    confetti.style.top = `${element.offsetTop}px`;
    document.body.appendChild(confetti);
    
    // Animation
    confetti.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => confetti.remove(), 1000);
  }
}

// Rest of your existing functions...