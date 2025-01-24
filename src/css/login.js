// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const auth = getAuth();

// Login logic
const loginBtn = document.querySelector('.btn-1'); // Login button

loginBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button behavior

  const email = document.getElementById("email").value; // Username
  const password = document.getElementById("password").value; // Password

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        alert("Login successful!");
        console.log(userCredential.user);

        // Redirect to home page after successful login
        window.location.href = "home.html"; // Redirect to home.html
      })
      .catch((error) => {
        // Handle errors
        alert(`Error: ${error.message}`);
      });
  } else {
    alert("Please fill out all fields!");
  }
});
