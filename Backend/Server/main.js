import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { googleSignIn, emailSignIn, registerUser } from './auth.js';

const auth = getAuth();

// Ensure user is authenticated before accessing the main page
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If user is not logged in, redirect to login page
        window.location.href = 'index.html';
    }
});

// Highlight carousel functionality
let currentHighlight = 0;
const highlightItems = document.querySelectorAll('.highlight-item');

function nextHighlight() {
    currentHighlight = (currentHighlight + 1) % highlightItems.length;
    highlightItems.forEach((item, index) => {
        item.style.transform = `translateX(-${currentHighlight * 100}%)`;
    });
}

setInterval(nextHighlight, 3000);

// Navigation
document.querySelectorAll('[data-navigate]').forEach(button => {
    button.addEventListener('click', () => navigateTo(button.dataset.navigate));
});

// Close form function
window.closeForm = function(formId) {
    document.getElementById(formId).style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('google-signin').addEventListener('click', googleSignIn);
    document.getElementById('email-signin').addEventListener('click', emailSignIn);
    document.getElementById('register').addEventListener('click', registerUser);
});
