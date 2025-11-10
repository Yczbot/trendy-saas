import { database } from "./firebase";
import {
  ref,
  set,
  get,
  update,
  remove,
  push,
  onValue,
  off,
  child,
} from "firebase/database";

// Create/Set data
export const setData = async (path: string, data: any) => {
  try {
    await set(ref(database, path), data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Push data (auto-generate ID)
export const pushData = async (path: string, data: any) => {
  try {
    const newRef = push(ref(database, path));
    await set(newRef, data);
    return { success: true, id: newRef.key };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get data
export const getData = async (path: string) => {
  try {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    }
    return { success: false, error: "No data found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update data
export const updateData = async (path: string, data: any) => {
  try {
    await update(ref(database, path), data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete data
export const deleteData = async (path: string) => {
  try {
    await remove(ref(database, path));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Listen to data changes (real-time)
export const listenToData = (
  path: string,
  callback: (data: any) => void
) => {
  const dataRef = ref(database, path);
  onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
  
  // Return unsubscribe function
  return () => off(dataRef);
};

// User operations for Realtime Database
export const createRealtimeUser = async (userId: string, userData: any) => {
  return await setData(`users/${userId}`, {
    ...userData,
    createdAt: new Date().toISOString(),
  });
};

export const getRealtimeUser = async (userId: string) => {
  return await getData(`users/${userId}`);
};

export const updateRealtimeUser = async (userId: string, userData: any) => {
  return await updateData(`users/${userId}`, {
    ...userData,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteRealtimeUser = async (userId: string) => {
  return await deleteData(`users/${userId}`);
};
