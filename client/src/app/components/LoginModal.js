"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill out both fields");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);

      onLogin({ name: data.name, email });
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#16dfba] transition placeholder-gray-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#16dfba] transition placeholder-gray-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#16dfba] text-white py-2 rounded-lg font-medium hover:bg-[#13c3a5] transition-transform hover:scale-105 active:scale-95"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </div>
  );
}
