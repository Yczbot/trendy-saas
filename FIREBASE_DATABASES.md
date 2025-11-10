# Firebase Databases Guide

Your Trendy SaaS app now has **TWO** Firebase databases connected!

## 🔥 Available Databases

### 1. **Firestore** (NoSQL Document Database)
- Best for: Complex queries, structured data, offline support
- Use for: User profiles, posts, products, orders

### 2. **Realtime Database** (JSON Tree Database)  
- Best for: Real-time sync, simple data, live updates
- Use for: Chat messages, live notifications, presence system

## 📊 When to Use Which?

| Feature | Firestore | Realtime Database |
|---------|-----------|-------------------|
| Data Structure | Documents & Collections | JSON Tree |
| Queries | Rich queries, indexes | Limited queries |
| Offline | Full offline support | Basic offline |
| Real-time | Yes | Yes (faster) |
| Scalability | Better for large apps | Better for simple apps |
| Pricing | Pay per operation | Pay per bandwidth |

## 🚀 Usage Examples

### Firestore (Document Database)

```typescript
import { createDocument, getDocuments } from "@/lib/firebaseHelpers";

// Create a user profile
await createDocument("users", {
  name: "John Doe",
  email: "john@example.com",
  role: "admin"
});

// Get all users
const result = await getDocuments("users");
```

### Realtime Database (JSON Tree)

```typescript
import { setData, getData, listenToData } from "@/lib/realtimeDBHelpers";

// Save data
await setData("users/user123", {
  name: "John Doe",
  online: true
});

// Get data
const result = await getData("users/user123");

// Listen for real-time updates
const unsubscribe = listenToData("users/user123", (data) => {
  console.log("User updated:", data);
});
```

## 🧪 Test Pages

Visit these pages to test your databases:

1. **`/test-firebase`** - Test Firestore database
2. **`/test-realtime-db`** - Test Realtime Database
3. **`/test-auth`** - Test authentication (saves to Firestore)

## 🔧 Setup in Firebase Console

### Enable Firestore:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select: **trendy-saas-a59aa**
3. Click **Firestore Database** → **Create database**
4. Choose **Test mode** → Select region → **Enable**

### Enable Realtime Database:
1. Click **Realtime Database** → **Create database**
2. Choose **Test mode** → **Enable**
3. Your database URL: `https://trendy-saas-a59aa-default-rtdb.firebaseio.com`

## 🔒 Security Rules

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Realtime Database Rules:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## 💡 Recommended Usage

### Use Firestore for:
- ✅ User profiles and settings
- ✅ Blog posts and articles
- ✅ Products and inventory
- ✅ Orders and transactions
- ✅ Complex data with relationships

### Use Realtime Database for:
- ✅ Chat messages
- ✅ Live notifications
- ✅ User presence (online/offline)
- ✅ Real-time counters
- ✅ Live collaboration features

## 📚 Helper Functions

### Firestore Helpers (`firebaseHelpers.ts`):
- `createDocument(collection, data)`
- `getDocument(collection, docId)`
- `getDocuments(collection, conditions?)`
- `updateDocument(collection, docId, data)`
- `deleteDocument(collection, docId)`

### Realtime DB Helpers (`realtimeDBHelpers.ts`):
- `setData(path, data)` - Set/overwrite data
- `pushData(path, data)` - Add with auto-generated ID
- `getData(path)` - Get data once
- `updateData(path, data)` - Update specific fields
- `deleteData(path)` - Remove data
- `listenToData(path, callback)` - Real-time listener

## 🎯 Example: Chat App

```typescript
// Use Realtime Database for messages (real-time sync)
import { pushData, listenToData } from "@/lib/realtimeDBHelpers";

// Send message
await pushData("chats/room123/messages", {
  text: "Hello!",
  userId: currentUser.uid,
  timestamp: Date.now()
});

// Listen for new messages
listenToData("chats/room123/messages", (messages) => {
  setMessages(messages);
});

// Use Firestore for user profiles (complex queries)
import { getDocument } from "@/lib/firebaseHelpers";

const userProfile = await getDocument("users", userId);
```

## 🚀 Next Steps

1. ✅ Enable both databases in Firebase Console
2. ✅ Set up security rules
3. ✅ Test using `/test-firebase` and `/test-realtime-db`
4. ✅ Choose the right database for each feature
5. ✅ Start building!

Both databases are ready to use! 🎉
