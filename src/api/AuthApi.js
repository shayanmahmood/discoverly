// src/firebase/authApi.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateEmail,
  updatePhoneNumber,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import axios from "axios";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

export const signUp = async (email, password, name, photo, phone, bio) => {
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
      bio: bio,
      phoneNumber: phone,
      password: password,
    });

    await sendEmailVerification(user);

    return {
      ...user,
      displayName: name,
      photoURL,
      emailVerified: user.emailVerified,
    };
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

export const updateUserProfile = async (userId, updatedData) => {
  const user = auth.currentUser;
  if (!user || !userId) {
    console.error("No authenticated user or user ID provided!");
    return false;
  }

  try {
    // 🔹 Update Firebase Authentication (Only Name & Photo)
    if (updatedData.name || updatedData.photoURL) {
      await updateProfile(user, {
        displayName: updatedData.name || user.displayName,
        photoURL: updatedData.photoURL || user.photoURL,
      });
    }

    // 🔹 Update Firestore Users Collection (No Email & Phone Updates)
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      name: updatedData.name || user.displayName,
      bio: updatedData.bio || "",
      photoURL: updatedData.photoURL || user.photoURL,
      company: updatedData.company || "N/A",
      createdAt: user.metadata.creationTime, // Use metadata for consistency
      phoneNumber: updatedData.phoneNumber,
      updatedAt: new Date(),
    });

    console.log(
      "User profile updated in Firebase Auth & Firestore successfully!"
    );
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

export const resendVerificationEmail = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      return "Verification email resent. Please check your inbox.";
    } else {
      throw new Error("No user is signed in.");
    }
  } catch (error) {
    console.error("Error resending verification email:", error.message);
    throw new Error(error.message);
  }
};
