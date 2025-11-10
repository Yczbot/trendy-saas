# Firebase Setup Guide

Firebase has been successfully integrated into your Trendy SaaS application!

## 🔥 What's Configured

- **Firebase App**: Initialized with your project credentials
- **Firestore Database**: NoSQL database for storing data
- **Firebase Auth**: Authentication service
- **Firebase Storage**: File storage service

## 📁 Files Created

1. **`src/lib/firebase.ts`** - Firebase initialization and service exports
2. **`src/lib/firebaseHelpers.ts`** - Helper functions for common database operations

## 🚀 How to Use

### Import Firebase Services

```typescript
import { db, auth, storage } from "@/lib/firebase";
```

### Using Helper Functions

```typescript
import { createDocument, getDocuments, updateDocument } from "@/lib/firebaseHelpers";

// Create a document
const result = await createDocument("posts", {
  title: "My Post",
  content: "Post content here",
  author: "John Doe"
});

// Get all documents
const posts = await getDocuments("posts");

// Update a document
await updateDocument("posts", documentId, {
  title: "Updated Title"
});
```

### User Operations

```typescript
import { createUser, getUser, updateUser } from "@/lib/firebaseHelpers";

// Create user profile
await createUser(userId, {
  name: "John Doe",
  email: "john@example.com",
  role: "user"
});

// Get user data
const user = await getUser(userId);

// Update user
await updateUser(userId, {
  name: "Jane Doe"
});
```

## 🔐 Firebase Authentication

To use Firebase Auth with NextAuth, you can integrate it in your auth configuration:

```typescript
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Sign in
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Sign up
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
```

## 📊 Firestore Collections

Recommended collections structure:

- **users** - User profiles and data
- **posts** - Blog posts or content
- **subscriptions** - User subscription data
- **contacts** - Contact form submissions
- **analytics** - Usage analytics

## 🔒 Security Rules

Don't forget to set up Firestore security rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📝 Environment Variables (Optional)

For better security, you can move Firebase config to environment variables:

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBwDd08cOdZRrc7SG51_BMTe1tAKnDiZtI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=trendy-saas-a59aa.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=trendy-saas-a59aa
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=trendy-saas-a59aa.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=376929802779
NEXT_PUBLIC_FIREBASE_APP_ID=1:376929802779:web:5d7f9ed0fc3e6a405476be
```

Then update `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

## 📚 Next Steps

1. Set up Firestore security rules in Firebase Console
2. Enable Authentication methods you want to use
3. Create your database collections
4. Integrate Firebase Auth with your sign-in/sign-up pages
5. Start building your features!

## 🔗 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
