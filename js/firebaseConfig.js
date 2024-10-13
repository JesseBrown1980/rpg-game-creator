// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBe7ie5e4Ky5RIi-6txu1H9kTfE4mqnJzI",
    authDomain: "rpg-game-24107.firebaseapp.com",
    projectId: "rpg-game-24107",
    storageBucket: "rpg-game-24107.appspot.com",
    messagingSenderId: "992801153117",
    appId: "1:992801153117:web:01cc8f851766ecbf8b2db4",
    measurementId: "G-RCJ530M9LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// On successful login or registration, store user-specific data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            await setDoc(doc(db, "users", user.uid), {
                username: user.displayName || "User", // Add default or retrieved username
                email: user.email,
                lastLogin: new Date()
                // Add other user-specific data as needed
            }, { merge: true }); // Merge to avoid overwriting data
            console.log('User data saved/updated successfully');
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    }
});

// Export required functions and variables
export { auth, db, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup };
