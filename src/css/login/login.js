// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXOUMu7n597O69b4CmQPW_D5D7_n9iB8Y",
  authDomain: "unriddle-755c3.firebaseapp.com",
  projectId: "unriddle-755c3",
  storageBucket: "unriddle-755c3.appspot.com",
  messagingSenderId: "345616107913",
  appId: "1:345616107913:web:d7e3b37b64396566a07958",
  measurementId: "G-EQNS2W6BVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to show custom alert popup
function showAlert(message, type) {
  let alertBox = document.createElement("div");
  alertBox.className = `custom-alert ${type}`;
  alertBox.textContent = message;

  document.body.appendChild(alertBox);

  // Remove after 3 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Login logic
const loginBtn = document.querySelector('.btn-1');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showAlert("Login successful!", "success");
        console.log(userCredential.user);

        setTimeout(() => {
          window.location.href = "riddle.html"; // Redirect to home page
        }, 1500);
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please try again.";
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
        }
        showAlert(errorMessage, "error");
      });
  } else {
    showAlert("Please fill out all fields!", "error");
  }
});

// Forgot Password logic
const forgotPasswordLink = document.getElementById("forgot-password-link");

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();

  const email = prompt("Please enter your email address:");
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showAlert("Password reset email sent! Check your inbox.", "success");
      })
      .catch((error) => {
        showAlert(`Error: ${error.message}`, "error");
      });
  } else {
    showAlert("Please enter a valid email address.", "error");
  }
});
