// auth.js

import { auth } from './firebaseConfig.js';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Function to display messages to the user
function displayMessage(message, type = 'error') {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.className = type;
  messageElement.style.display = 'block';
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000);
}

// Function to register a new user
function registerUser() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'main.html';
    })
    .catch((error) => {
      console.error("Error registering user: ", error);
    });
}

// Function to login an existing user
function emailSignIn() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'main.html';
    })
    .catch((error) => {
      console.error("Error logging in: ", error);
    });
}

// Function to log in with Google
function googleSignIn() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = 'main.html';
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
}

// Functions to open and close forms
function closeForm(formId) {
  document.getElementById(formId).style.display = 'none';
}

function openRegistrationForm() {
  document.getElementById('registration-form').style.display = 'block';
}

function openLoginForm() {
  document.getElementById('login-form').style.display = 'block';
}

// Add event listeners after the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Registration form submission
  document.getElementById('registration-form').addEventListener('submit', registerUser);

  // Login form submission
  document.getElementById('login-form').addEventListener('submit', emailSignIn);

  // Google login button click
  document.getElementById('google-login-button').addEventListener('click', googleSignIn);

  // Open form buttons
  document.getElementById('open-registration-form').addEventListener('click', openRegistrationForm);
  document.getElementById('open-login-form').addEventListener('click', openLoginForm);

  // Close form buttons (assuming you have close buttons in your forms)
  document.querySelectorAll('.close-form-button').forEach((button) => {
    button.addEventListener('click', () => closeForm(button.dataset.formId));
  });
});
