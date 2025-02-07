// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");

// Sign-up logic
const signUpBtn = document.getElementById('signUpBtn');  // Use the correct ID

signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent default button behavior

  const username = document.getElementById("username").value; // Username
  const email = document.getElementById("email").value; // Email
  const password = document.getElementById("password").value; // Password

  if (username && email && password) {
    // Show loading state
    signUpBtn.disabled = true;
    signUpBtn.textContent = "Signing Up...";

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional data (username, email, points) to Firestore
      const userDocRef = doc(db, "users", user.uid);  // Using UID as the document ID
      await setDoc(userDocRef, {
        username: username,
        email: email,
        points: 0, // Initialize points to 0
      });

      alert("Sign-up successful!");
      console.log("User created and data saved to Firestore:", user);

      // Redirect to another page after sign-up
      window.location.href = "dashboard.html"; // Or another page
    } catch (error) {
      // Handle errors
      let errorMessage = "Sign-up failed. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is invalid.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
      }
      alert(errorMessage);
      console.error("Error during sign-up:", error);
    } finally {
      // Reset button state
      signUpBtn.disabled = false;
      signUpBtn.textContent = "Sign Up";
    }
  } else {
    alert("Please fill out all fields!");
  }
});