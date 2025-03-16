// src/firebase/authApi.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import axios from "axios";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth/web-extension";

/**
 * Updates the user's password.
 * @param {object} user - The currently signed-in user.
 * @param {string} currentPassword - The user's current password.
 * @param {string} newPassword - The new password.
 * @returns {Promise<string>} - Success or error message.
 */
export const updateUserPassword = async (
  user,
  currentPassword,
  newPassword
) => {
  if (!user) {
    return "User is not authenticated.";
  }

  try {
    // Re-authenticate the user
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
    return "Password updated successfully!";
  } catch (error) {
    return error.message;
  }
};

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
      notification: [],
      myEvents: [],
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
    // 🔹 Update Firebase Authentication (Only Name & Photo)|| updatedData.photoURL
    if (updatedData.name) {
      await updateProfile(user, {
        displayName: updatedData.name || user.displayName,
        // photoURL: updatedData.photoURL || user.photoURL,
      });
    }

    let photoURL = "";

    if (updatedData.photo) {
      try {
        const formData = new FormData();
        formData.append("file", updatedData.photo);
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
      await updateProfile(user, {
        photoURL: photoURL || user.photoURL,
      });
    }

    // 🔹 Update Firestore Users Collection
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      name: updatedData.name || user.displayName,
      bio: updatedData.bio || "",
      photoURL: photoURL || updatedData.photo || user.photoURL,
      company: updatedData.company || "N/A",
      phoneNumber: updatedData.phoneNumber || null,
      updatedAt: new Date(),
      messaging: false,
    });

    // 🔹 Force Firebase Auth to Refresh User Data
    await auth.currentUser.reload(); // Refresh the user in Auth
    console.log(
      "User profile updated successfully in Firebase Auth & Firestore!"
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

// export async function addEvent(eventData) {
//   try {
//     const data = {
//       attendees: eventData.attendees,
//       category: eventData.category,
//       categoryExtends: eventData.categoryExtends,
//       date: eventData.date,
//       extendedEventDetails: {
//         ...eventData.extendedEventDetails,
//       },
//       featured: eventData.featured,
//       id: crypto.randomUUID(),
//       price: eventData.price,
//       time: eventData.time,
//       title: eventData.title,
//       upcoming: eventData.upcoming,
//     };

//     // const docRef = await addDoc(collection(db, "Events"), data);

//     // console.log("Document written with ID: ", docRef.id);
//     console.log(eventData);
//     // return docRef.id;
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     throw error;
//   }
// }

const uploadImagesToCloudinary = async (files) => {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/duk57i7an/image/upload";
  const UPLOAD_PRESET = "myPreset"; // Replace with your Cloudinary preset

  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          return data.secure_url;
        } else {
          console.error("Upload failed:", data);
          return null;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    })
  );

  return uploadedUrls.filter((url) => url !== null); // Remove failed uploads
};

/**
 * Register a user for an event
 * @param {string} eventId - ID of the event
 * @param {string} userId - ID of the user
 */
export const registerUserForEvent = async (eventId, userId) => {
  const eventRef = doc(db, "Events", eventId);

  try {
    // First, check if the document exists
    const docSnap = await getDoc(eventRef);

    if (!docSnap.exists()) {
      throw new Error("Event does not exist!");
    }

    // If document exists, update it
    await updateDoc(eventRef, {
      registeredUsers: arrayUnion(userId),
    });

    console.log("User registered successfully!");
  } catch (error) {
    console.error("Error registering for event: ", error);
  }
};

/**
 * Get events a user has registered for
 * @param {string} userId - ID of the user
 * @returns {Array} - Array of events the user registered for
 */
export const getUserRegisteredEvents = async (userId) => {
  const eventsRef = collection(db, "Events");
  const snapshot = await getDocs(eventsRef);

  // Filter events where userId exists in registeredUsers array
  const registeredEvents = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((event) => event.registeredUsers.includes(userId));

  return registeredEvents;
};

export async function addEvent(eventData) {
  try {
    console.log("Uploading images...");

    // Upload main event image
    const mainImageFile = eventData.image ? [eventData.image] : [];
    const uploadedMainImage = await uploadImagesToCloudinary(mainImageFile);

    // Upload additional images
    const additionalImages =
      eventData.extendedEventDetails.additionalImages || [];
    const uploadedAdditionalImages = await uploadImagesToCloudinary(
      additionalImages
    );

    // Create final event data with uploaded image URLs
    const data = {
      attendees: eventData.attendees,
      category: eventData.category,
      categoryExtends: eventData.categoryExtends,
      date: eventData.date,
      extendedEventDetails: {
        ...eventData.extendedEventDetails,
        additionalImages: uploadedAdditionalImages,
      },
      location: eventData.location,
      featured: eventData.featured,
      id: crypto.randomUUID(),
      time: eventData.time,
      title: eventData.title,
      upcoming: eventData.upcoming,
      image: uploadedMainImage.length > 0 ? uploadedMainImage[0] : null, // Replace with Cloudinary URL
      createdAt: new Date(),
      organizeruid: auth.currentUser.uid,
      status: true,
      sales: 0,
      price: eventData.extendedEventDetails.ticketPrice || 0,
      registeredUsers: [],
    };

    const docRef = await addDoc(collection(db, "Events"), data);
    console.log("Document written with ID: ", docRef.id);
    // return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function editEvent(eventId, eventData) {
  try {
    console.log("Updating event...");

    // Check if main event image is a file or URL
    let uploadedMainImage = eventData.image;
    if (eventData.image && eventData.image instanceof File) {
      const mainImageFile = [eventData.image];
      const uploadedImages = await uploadImagesToCloudinary(mainImageFile);
      uploadedMainImage = uploadedImages.length > 0 ? uploadedImages[0] : null;
    }

    // Check if additional images are files or URLs
    const additionalImages =
      eventData.extendedEventDetails.additionalImages || [];
    const newFiles = additionalImages.filter((img) => img instanceof File);
    const existingUrls = additionalImages.filter(
      (img) => typeof img === "string"
    );

    // Upload only new files
    const uploadedAdditionalImages =
      newFiles.length > 0 ? await uploadImagesToCloudinary(newFiles) : [];

    // Combine existing URLs and newly uploaded images
    const finalAdditionalImages = [
      ...existingUrls,
      ...uploadedAdditionalImages,
    ];

    // Prepare updated event data
    const updatedData = {
      attendees: eventData.attendees,
      category: eventData.category,
      categoryExtends: eventData.categoryExtends,
      date: eventData.date,
      extendedEventDetails: {
        ...eventData.extendedEventDetails,
        additionalImages: finalAdditionalImages,
      },
      location: eventData.location,
      featured: eventData.featured,
      time: eventData.time,
      title: eventData.title,
      upcoming: eventData.upcoming,
      image: uploadedMainImage, // Keep existing or update if new
      price: eventData.extendedEventDetails.ticketPrice,
      updatedAt: new Date(),
    };

    // Update event in Firestore
    await updateDoc(doc(db, "Events", eventId), updatedData);
    console.log("Event updated successfully!");
  } catch (error) {
    console.error("Error updating event: ", error);
    throw error;
  }
}

export const createMessagesCollection = async (userId) => {
  try {
    const userRef = doc(db, "Users", userId);
    const messagesRef = collection(userRef, "messages");

    await updateDoc(userRef, { messaging: true });

    // Firestore automatically creates the subcollection when a document is added
    await setDoc(doc(messagesRef), {
      senderId: "system",
      sender: {
        name: "",
        email: "",
        avatar: "",
      },
      eventName: "",
      eventId: "",
      receiverId: userId,
      subject: "Welcome Message",
      message: "This is your first message!",
      date: new Date(),
      unread: true,
    });

    console.log("Messages collection created successfully!");
  } catch (error) {
    console.error("Error creating messages collection:", error);
  }
};

export async function deleteDocument(collectionName, docId) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log(
      `Document ${docId} deleted successfully from ${collectionName}`
    );
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
}
