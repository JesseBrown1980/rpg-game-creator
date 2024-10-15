import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

console.log('Loading auth.js');

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};