
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzuAC0KZEAaopDkMtv9BLtMd70Q9RHKEY",
    authDomain: "form-6a494.firebaseapp.com",
    projectId: "form-6a494",
   storageBucket: "form-6a494.firebasestorage.app",
   messagingSenderId: "933530451759",
       appId: "1:933530451759:web:19e5396b8d766f8885abda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
function signUp(event) {
  event.preventDefault();
  // Get user input values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  // Validate Input Fields
  if (!email || !password || !confirmPassword) {
    alert("Please fill out all fields.");
    return;
  }
  if (password !== confirmPassword) {
    alert(`Password does'nt match.`);
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // Get account creation date
      const creationTime = user.metadata.creationTime;
      console.log("User signed up successfully:", user);
      alert(
        `Welcome, ${firstName} ${lastName}! Your account has been created. ${creationTime}`
      );
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmPassword").value = "";

      window.location.href = "./login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    });
}
// Sign In
function signIn(event) {
  event.preventDefault();
  // Get user input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // Validate Input Fields
  if (!email || !password) {
    alert("Please fill out all fields.");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const creationTime = user.metadata.creationTime;
      console.log("User signed in successfully:", user);
      alert(
       ` Welcome, You're signed in. ${creationTime}`
      );
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
  
    if (signUpButton) {
      signUpButton.addEventListener("click", signUp);
    }
  
    if (signInButton) {
      signInButton.addEventListener("click", signIn);
    }
  });