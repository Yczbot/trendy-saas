"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firebaseHelpers";
import toast from "react-hot-toast";

export default function TestAuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Test credentials
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@trendysaas.com",
    password: "test123456",
  });

  const handleSignUp = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      console.log("🔄 Creating user account...");
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("✅ User created in Firebase Auth:", user.uid);

      // Store user data in Firestore
      const result = await createUser(user.uid, {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ User data stored in Firestore");

      setTestResult({
        success: true,
        message: "Sign up successful!",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: formData.name,
        },
      });

      toast.success("Test user created successfully!");
    } catch (error: any) {
      console.error("❌ Sign up error:", error);
      
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Try signing in instead.";
      }

      setTestResult({
        success: false,
        message: errorMessage,
        error: error.code,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      console.log("🔄 Signing in user...");
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("✅ User signed in:", user.uid);

      setTestResult({
        success: true,
        message: "Sign in successful!",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
        },
      });

      toast.success("Test login successful!");
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      
      let errorMessage = error.message;
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found. Try signing up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }

      setTestResult({
        success: false,
        message: errorMessage,
        error: error.code,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTest = () => {
    if (mode === "signup") {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      setTestResult({
        success: true,
        message: "User is currently signed in",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        },
      });
      toast.success("User is signed in!");
    } else {
      setTestResult({
        success: false,
        message: "No user is currently signed in",
      });
      toast.error("No user signed in");
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setTestResult({
        success: true,
        message: "User signed out successfully",
      });
      toast.success("Signed out!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-dark dark:text-white">
            🔐 Firebase Auth Test
          </h1>

          {/* Mode Toggle */}
          <div className="mb-6 flex gap-2 rounded-lg bg-white p-2 shadow-lg dark:bg-dark-2">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${
                mode === "signup"
                  ? "bg-primary text-white"
                  : "text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark"
              }`}
            >
              Sign Up Test
            </button>
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${
                mode === "signin"
                  ? "bg-primary text-white"
                  : "text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark"
              }`}
            >
              Sign In Test
            </button>
          </div>

          {/* Test Form */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
              Test Credentials
            </h2>

            {mode === "signup" && (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
            </div>

            <button
              onClick={handleTest}
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                  Testing...
                </span>
              ) : (
                `Test ${mode === "signup" ? "Sign Up" : "Sign In"}`
              )}
            </button>
          </div>

          {/* Additional Actions */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={getCurrentUser}
              className="flex-1 rounded-lg border border-primary bg-transparent px-4 py-2 font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Check Current User
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 rounded-lg border border-red-500 bg-transparent px-4 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              Sign Out
            </button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div
              className={`rounded-lg p-6 shadow-lg ${
                testResult.success
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">
                  {testResult.success ? "✅" : "❌"}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-dark dark:text-white">
                    {testResult.message}
                  </h3>
                  {testResult.error && (
                    <p className="text-sm text-body-color dark:text-dark-6">
                      Error Code: {testResult.error}
                    </p>
                  )}
                </div>
              </div>

              {testResult.user && (
                <div className="rounded-lg bg-white p-4 dark:bg-dark-2">
                  <h4 className="mb-2 font-semibold text-dark dark:text-white">
                    User Details:
                  </h4>
                  <pre className="overflow-x-auto text-sm text-body-color dark:text-dark-6">
                    {JSON.stringify(testResult.user, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 font-bold text-dark dark:text-white">
              📝 Instructions:
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-body-color dark:text-dark-6">
              <li>First, test Sign Up to create a new user</li>
              <li>Then, test Sign In with the same credentials</li>
              <li>Use &quot;Check Current User&quot; to verify session</li>
              <li>Check browser console for detailed logs</li>
              <li>Visit /test-firebase to see user in database</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
