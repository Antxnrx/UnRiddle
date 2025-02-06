// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXOUMu7n597O69b4CmQPW_D5D7_n9iB8Y",
  authDomain: "unriddle-755c3.firebaseapp.com",
  projectId: "unriddle-755c3",
  storageBucket: "unriddle-755c3.appspot.com",  // Corrected this line
  messagingSenderId: "345616107913",
  appId: "1:345616107913:web:d7e3b37b64396566a07958",
  measurementId: "G-EQNS2W6BVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
const loginBtn = document.querySelector('.btn-1'); // Updated to match the HTML

loginBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button behavior

  const email = document.getElementById("email").value; // Email
  const password = document.getElementById("password").value; // Password

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        alert("Login successful!");
        console.log(userCredential.user);

        // Redirect to home page after successful login
        window.location.href = "riddle.html"; // Redirect to home.html
      })
      .catch((error) => {
        // Handle errors
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
        alert(errorMessage);
      });
  } else {
    alert("Please fill out all fields!");
  }
});

// Forgot Password logic
const forgotPasswordLink = document.getElementById("forgot-password-link");

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default link behavior

  const email = prompt("Please enter your email address:"); // Prompt user for email
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  } else {
    alert("Please enter a valid email address.");
  }
});
