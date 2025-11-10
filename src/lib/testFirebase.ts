import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTestData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: any[] = [];
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users, count: users.length };
  } catch (error: any) {
    console.error("Error fetching test data:", error);
    return { success: false, error: error.message };
  }
}

// Test Firebase connection
export async function testFirebaseConnection() {
  try {
    console.log("Testing Firebase connection...");
    const result = await getTestData();
    
    if (result.success) {
      console.log("✅ Firebase connected successfully!");
      console.log(`Found ${result.count} users in database`);
      return true;
    } else {
      console.error("❌ Firebase connection failed:", result.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Firebase connection error:", error);
    return false;
  }
}
