import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// User operations
export const createUser = async (userId: string, userData: any) => {
  try {
    await addDoc(collection(db, "users"), {
      userId,
      ...userData,
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUser = async (userId: string) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: true, data: querySnapshot.docs[0].data() };
    }
    return { success: false, error: "User not found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), {
        ...userData,
        updatedAt: Timestamp.now(),
      });
      return { success: true };
    }
    return { success: false, error: "User not found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Generic CRUD operations
export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: "Document not found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getDocuments = async (
  collectionName: string,
  conditions?: any[]
) => {
  try {
    let q = query(collection(db, collectionName));
    if (conditions && conditions.length > 0) {
      q = query(collection(db, collectionName), ...conditions);
    }
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: documents };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
