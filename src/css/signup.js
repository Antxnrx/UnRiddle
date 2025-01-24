// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";  // For Firestore

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
const db = getFirestore(app);  // Initialize Firestore

// Sign-up logic
const signUpBtn = document.querySelector('.btn-signup');  // Updated button class

signUpBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button behavior
  
  const email = document.getElementById("email").value; // Email
  const password = document.getElementById("password").value; // Password
  const dob = document.getElementById("dob").value; // Date of birth
  const gender = document.getElementById("gender").value; // Gender

  if (email && password && dob && gender) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Successful sign-up
        alert("Sign-up successful!");
        console.log(userCredential.user); // Check if the user object is correct

        // Save additional data (dob, gender) to Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);  // Using UID as the document ID
        await setDoc(userDocRef, {
          email: email,
          dob: dob,
          gender: gender,
        });

        // Check authentication state immediately after sign-up
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User is logged in: ", user); // Log user object to debug
            window.location.href = "dashboard.html"; // Or another page
          } else {
            console.log("User is not logged in");
          }
        });

      })
      .catch((error) => {
        // Handle errors
        alert(`Error: ${error.message}`);
      });

  } else {
    alert("Please fill out all fields!");
  }
});
