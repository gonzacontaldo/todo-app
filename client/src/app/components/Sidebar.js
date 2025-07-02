"use client";

import { useState } from "react";
import { Settings, LogIn } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Sidebar({
  categories,
  onSelectCategory,
  onSettingsClick,
  isLoggedIn,
  userName,
  onLogin,
  setIsLoggedIn,
  setUserName,
  setTasks,
  setCategories,
  setOrderedIds,
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("Guest");
    setTasks([]);
    setCategories([]);
    setOrderedIds([]);
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-[#ffffff] via-[#f9f9f9] to-[#f0f0f0] border-r border-gray-200 shadow-lg p-5 flex flex-col z-20">
      
      {/* Profile section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            isLoggedIn
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=16dfba&color=fff&bold=true`
              : `https://ui-avatars.com/api/?name=Guest&background=CCCCCC&color=777777&bold=true`
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow mb-2"
        />

        <p className="font-semibold text-gray-700 mb-1">
          {isLoggedIn ? userName : "Guest"}
        </p>

        {!isLoggedIn ? (
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 text-sm bg-[#16dfba] text-white rounded hover:bg-[#13c3a5] transition"
              onClick={() => setShowLogin(true)}
            >
              Log In
            </button>
            <button
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-[#fde2e4] transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-300" />

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Categories</h3>

        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#e0f7f5] text-gray-700 transition"
            >
              📁 All Categories
            </button>
          </li>

          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                onClick={() => onSelectCategory(cat)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#e0f7f5] transition"
                style={{ color: "#555" }}
              >
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
                  style={{ backgroundColor: cat.color }}
                ></span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-300" />

      {/* Settings button */}
      <button
        onClick={onSettingsClick}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-[#e0f7f5] rounded-lg transition"
      >
        <Settings size={18} /> Settings
      </button>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            onLogin(userData);
            setShowLogin(false);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignupSuccess={() => {
            alert("Account created! You can now log in.");
            setShowSignup(false);
          }}
        />
      )}
    </div>
  );
}
