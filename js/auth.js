import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from './firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

// Function to register a new user
async function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const username = document.getElementById('register-username').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user details to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email
        });

        console.log('User registered:', user);
        alert('Registration successful!');
        closeForm('registration-form');

        // Redirect to main page
        window.location.href = 'main.html';
    } catch (error) {
        console.error('Error:', error.code, error.message);
        alert(`Error: ${error.message}`);
    }
}

// Function to login an existing user
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in successfully
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('Login successful!');
            closeForm('login-form');

            // Redirect to main page
            window.location.href = 'main.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
}

// Function to log in with Google
function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            // User signed in successfully
            const user = result.user;

            // Add user details to Firestore if they are new
            setDoc(doc(db, 'users', user.uid), {
                username: user.displayName,
                email: user.email
            }, { merge: true });

            console.log('User signed in with Google:', user);
            alert('Login successful!');

            // Redirect to main page
            window.location.href = 'main.html';
        })
        .catch((error) => {
            console.error('Error with Google Sign-In:', error.code, error.message);
            alert(`Error: ${error.message}`);
        });
}

// Function to close forms
function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

// Functions to open forms
function openRegistrationForm() {
    document.getElementById('registration-form').style.display = 'block';
}

function openLoginForm() {
    document.getElementById('login-form').style.display = 'block';
}

window.registerUser = registerUser;
window.loginUser = loginUser;
window.openRegistrationForm = openRegistrationForm;
window.openLoginForm = openLoginForm;
window.closeForm = closeForm;
window.loginWithGoogle = loginWithGoogle;
