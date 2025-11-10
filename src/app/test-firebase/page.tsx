"use client";
import { useEffect, useState } from "react";
import { getTestData, testFirebaseConnection } from "@/lib/testFirebase";

export default function TestFirebasePage() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      setLoading(true);
      
      // Test connection
      const isConnected = await testFirebaseConnection();
      setConnected(isConnected);
      
      // Get users data
      const result = await getTestData();
      if (result.success) {
        setUsers(result.data || []);
      } else {
        setError(result.error || "Failed to fetch data");
      }
      
      setLoading(false);
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-dark dark:text-white">
            🔥 Firebase Connection Test
          </h1>

          {loading ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-dark-2">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="text-lg text-dark dark:text-white">
                Testing Firebase connection...
              </p>
            </div>
          ) : (
            <>
              {/* Connection Status */}
              <div
                className={`mb-6 rounded-lg p-6 shadow-lg ${
                  connected
                    ? "bg-green-50 dark:bg-green-900/20"
                    : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {connected ? "✅" : "❌"}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-dark dark:text-white">
                      {connected
                        ? "Firebase Connected Successfully!"
                        : "Firebase Connection Failed"}
                    </h2>
                    <p className="text-sm text-body-color dark:text-dark-6">
                      {connected
                        ? "Your Firebase database is working properly"
                        : "Check your Firebase configuration"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-6 shadow-lg dark:bg-red-900/20">
                  <h3 className="mb-2 font-bold text-red-600 dark:text-red-400">
                    Error:
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Users Data */}
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
                <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
                  Users Collection ({users.length})
                </h2>

                {users.length === 0 ? (
                  <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-dark">
                    <p className="text-body-color dark:text-dark-6">
                      No users found in the database. Sign up to create your
                      first user!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user, index) => (
                      <div
                        key={user.id || index}
                        className="rounded-lg border border-stroke bg-gray-50 p-4 dark:border-dark-3 dark:bg-dark"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-semibold text-dark dark:text-white">
                            User ID:
                          </span>
                          <span className="text-sm text-body-color dark:text-dark-6">
                            {user.id}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          {Object.entries(user).map(([key, value]) => {
                            if (key === "id") return null;
                            return (
                              <div
                                key={key}
                                className="flex justify-between"
                              >
                                <span className="font-medium text-dark dark:text-white">
                                  {key}:
                                </span>
                                <span className="text-body-color dark:text-dark-6">
                                  {typeof value === "object"
                                    ? JSON.stringify(value)
                                    : String(value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
                >
                  Refresh Test
                </button>
                <a
                  href="/signup"
                  className="flex-1 rounded-lg border border-primary bg-transparent px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  Create User
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
