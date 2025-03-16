import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
