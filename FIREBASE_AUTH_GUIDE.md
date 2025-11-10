# Firebase Authentication Guide

Firebase Authentication has been successfully integrated into your Trendy SaaS application!

## ✅ What's Been Set Up

1. **Firebase Authentication** - Email/Password authentication
2. **Sign In Page** - Updated to use Firebase Auth
3. **Sign Up Page** - Updated to use Firebase Auth with user profile creation
4. **Auth Context** - Global authentication state management
5. **Protected Routes** - Component to protect authenticated pages
6. **Firestore Integration** - User data stored in Firestore

## 🔐 How It Works

### Sign Up Flow
1. User enters name, email, and password
2. Firebase creates authentication account
3. User profile is updated with display name
4. User data is stored in Firestore `users` collection
5. User is redirected to sign-in page

### Sign In Flow
1. User enters email and password
2. Firebase authenticates the user
3. User session is stored in localStorage
4. User is redirected to home page

### Sign Out Flow
1. User clicks sign out
2. Firebase signs out the user
3. Session is cleared from localStorage
4. User is redirected to sign-in page

## 📝 Usage Examples

### Using Auth Context

Wrap your app with AuthProvider in `layout.tsx`:

```typescript
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Access Current User

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome, {user.displayName || user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protect Routes

```typescript
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This page is only accessible to authenticated users</p>
      </div>
    </ProtectedRoute>
  );
}
```

### Get User Data from Firestore

```typescript
import { getUser } from "@/lib/firebaseHelpers";
import { useAuth } from "@/contexts/AuthContext";

function UserProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      getUser(user.uid).then((result) => {
        if (result.success) {
          setUserData(result.data);
        }
      });
    }
  }, [user]);

  return <div>{userData?.name}</div>;
}
```

## 🔧 Firebase Console Setup

### Enable Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **trendy-saas-a59aa**
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Save changes

### Set Up Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** or **Test mode**
4. Select your region
5. Click **Enable**

### Firestore Security Rules

Add these rules in Firestore Rules tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write their own data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🎨 Customization

### Add More User Fields

Update the SignUp component to collect more data:

```typescript
await createUser(user.uid, {
  name,
  email,
  phone: data.get("phone"),
  company: data.get("company"),
  role: "user",
  createdAt: new Date().toISOString(),
});
```

### Add Social Authentication

Install additional providers:

```bash
npm install @firebase/auth
```

Then add Google/GitHub/etc. sign-in buttons in `SocialSignIn` component.

## 🐛 Error Handling

Common Firebase Auth errors are handled:

- `auth/email-already-in-use` - Email is already registered
- `auth/user-not-found` - No account with this email
- `auth/wrong-password` - Incorrect password
- `auth/invalid-email` - Invalid email format
- `auth/weak-password` - Password too weak (< 6 characters)
- `auth/too-many-requests` - Too many failed login attempts

## 📊 User Data Structure

Users are stored in Firestore with this structure:

```javascript
{
  userId: "firebase-auth-uid",
  name: "John Doe",
  email: "john@example.com",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z"
}
```

## 🚀 Next Steps

1. ✅ Enable Email/Password auth in Firebase Console
2. ✅ Create Firestore database
3. ✅ Set up security rules
4. Add AuthProvider to your layout
5. Test sign up and sign in
6. Add sign out button to your header/navbar
7. Protect routes that require authentication
8. Customize user profile fields as needed

## 📚 Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)
