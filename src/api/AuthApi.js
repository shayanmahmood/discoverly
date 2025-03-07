// src/firebase/authApi.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import axios from "axios";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * Logs in a user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise} Resolves on success, rejects on failure.
 */

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Registers a new user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise} Resolves on success, rejects on failure.
 */

export const signUp = async (email, password, name, photo) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    let photoURL = "";

    // Upload image to Cloudinary if photo exists
    if (photo) {
      try {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", "myPreset"); // Set in Cloudinary

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duk57i7an/image/upload",
          formData
        );

        photoURL = response.data.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        throw new Error("Failed to upload image. Please try again.");
      }
    }

    // Update Firebase user profile
    await updateProfile(user, { displayName: name, photoURL });

    const userRef = doc(db, "Users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name: name,
      email: user.email,
      photoURL: photoURL,
      createdAt: serverTimestamp(), 
      bio: "",
      phoneNumber:""
    });

    return { ...user, displayName: name, photoURL };
  } catch (error) {
    console.error("Signup Error:", error);
    throw new Error(error.message);
  }
};

/**
 * Logs out the currently authenticated user.
 * @returns {Promise} Resolves on success, rejects on failure.
 */

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:5173/reset-password",
    });
    return "Password reset link sent!";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return "Password has been reset successfully!";
  } catch (error) {
    throw new Error(error.message);
  }
};
