"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function CreateCategoryModal({ onClose, onCreate }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#16dfba");

  const handleCreate = () => {
    if (!newCategoryName.trim()) return;
    onCreate({ name: newCategoryName, color: newCategoryColor });
    setNewCategoryName("");
    setNewCategoryColor("#16dfba");
    onClose();
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

        <h2 className="text-xl font-semibold mb-4 text-gray-700">New Category</h2>

        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category name"
          className="border border-gray-300 rounded px-3 py-2 mb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#16dfba] placeholder-gray-400"
        />

        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm text-gray-700 font-medium">Color:</label>
          <input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
            className="w-10 h-10 p-0 border-0 cursor-pointer"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-3 py-1 bg-[#16dfba] text-white rounded hover:bg-[#13c3a5] transition transform hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
