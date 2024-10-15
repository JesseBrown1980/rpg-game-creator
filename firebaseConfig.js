// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export required functions and variables
export { auth };