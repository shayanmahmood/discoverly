// src/firebase/authApi.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

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
    return userCredential.user;
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

export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user's display name in Firebase Authentication
    await updateProfile(user, { displayName: name });
    return user;
  } catch (error) {
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
