import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchUser = async (id) => {
  try {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
