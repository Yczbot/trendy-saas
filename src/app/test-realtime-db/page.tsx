"use client";
import { useState, useEffect } from "react";
import {
  setData,
  getData,
  pushData,
  updateData,
  deleteData,
  listenToData,
} from "@/lib/realtimeDBHelpers";
import toast from "react-hot-toast";

export default function TestRealtimeDBPage() {
  const [loading, setLoading] = useState(false);
  const [data, setDataState] = useState<any>(null);
  const [path, setPath] = useState("test/data");
  const [value, setValue] = useState("Hello from Realtime Database!");
  const [listening, setListening] = useState(false);

  const handleSetData = async () => {
    setLoading(true);
    const result = await setData(path, { message: value, timestamp: Date.now() });
    if (result.success) {
      toast.success("Data saved successfully!");
    } else {
      toast.error(result.error || "Failed to save data");
    }
    setLoading(false);
  };

  const handleGetData = async () => {
    setLoading(true);
    const result = await getData(path);
    if (result.success) {
      setDataState(result.data);
      toast.success("Data retrieved!");
    } else {
      toast.error(result.error || "Failed to get data");
      setDataState(null);
    }
    setLoading(false);
  };

  const handlePushData = async () => {
    setLoading(true);
    const result = await pushData("messages", {
      text: value,
      timestamp: Date.now(),
    });
    if (result.success) {
      toast.success(`Data pushed with ID: ${result.id}`);
    } else {
      toast.error(result.error || "Failed to push data");
    }
    setLoading(false);
  };

  const handleUpdateData = async () => {
    setLoading(true);
    const result = await updateData(path, { message: value, updatedAt: Date.now() });
    if (result.success) {
      toast.success("Data updated!");
    } else {
      toast.error(result.error || "Failed to update data");
    }
    setLoading(false);
  };

  const handleDeleteData = async () => {
    setLoading(true);
    const result = await deleteData(path);
    if (result.success) {
      toast.success("Data deleted!");
      setDataState(null);
    } else {
      toast.error(result.error || "Failed to delete data");
    }
    setLoading(false);
  };

  const toggleListen = () => {
    if (listening) {
      setListening(false);
      toast.success("Stopped listening");
    } else {
      const unsubscribe = listenToData(path, (newData) => {
        setDataState(newData);
        toast.success("Data updated in real-time!");
      });
      setListening(true);
      toast.success("Listening for changes...");
      
      // Cleanup on unmount
      return () => unsubscribe();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-dark dark:text-white">
            🔥 Firebase Realtime Database Test
          </h1>

          {/* Path Input */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
              Database Path
            </label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="e.g., users/user123"
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
            />
          </div>

          {/* Value Input */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
              Value
            </label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter data to save"
              rows={3}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            <button
              onClick={handleSetData}
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              Set Data
            </button>
            <button
              onClick={handleGetData}
              disabled={loading}
              className="rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
            >
              Get Data
            </button>
            <button
              onClick={handlePushData}
              disabled={loading}
              className="rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
            >
              Push Data
            </button>
            <button
              onClick={handleUpdateData}
              disabled={loading}
              className="rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
            >
              Update Data
            </button>
            <button
              onClick={handleDeleteData}
              disabled={loading}
              className="rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              Delete Data
            </button>
            <button
              onClick={toggleListen}
              className={`rounded-lg px-4 py-3 font-semibold text-white transition ${
                listening
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {listening ? "Stop Listening" : "Listen (Real-time)"}
            </button>
          </div>

          {/* Data Display */}
          {data && (
            <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
              <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
                Retrieved Data:
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-dark dark:bg-dark dark:text-white">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          {/* Instructions */}
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 font-bold text-dark dark:text-white">
              📝 How to Use:
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-body-color dark:text-dark-6">
              <li>Enter a database path (e.g., users/user123)</li>
              <li>Enter a value to save</li>
              <li>Click &quot;Set Data&quot; to save</li>
              <li>Click &quot;Get Data&quot; to retrieve</li>
              <li>Click &quot;Listen&quot; for real-time updates</li>
              <li>Open another tab and modify data to see real-time sync!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
