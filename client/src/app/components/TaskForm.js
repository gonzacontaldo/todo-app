"use client";

import { useState } from "react";

export default function TaskForm({
  newTaskTitle,
  setNewTaskTitle,
  categories,
  selectedCategory,
  setSelectedCategory,
  newCategoryName,
  setNewCategoryName,
  newCategoryColor,
  setNewCategoryColor,
  handleSubmit,
  handleAddCategory,
  handleDeleteCategory,
}) {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#16dfba] text-[#333]"
        />

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => {
              if (e.target.value === "ADD_NEW") {
                setShowNewCategoryModal(true);
              } else {
                setSelectedCategory(e.target.value);
              }
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#16dfba] text-[#333]"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="ADD_NEW">➕ Add Category</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#16dfba] text-white px-4 py-2 rounded hover:bg-[#13c3a5] transition"
        >
          Add Task
        </button>
      </form>

      {/* Manage categories */}
      <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-4">
        <h3 className="text-sm font-semibold text-[#333] mb-2">Manage Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              ></span>
              <span className="text-xs">{cat.name}</span>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for new category */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg transform transition-all scale-95 animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-[#333]">Add New Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-[#16dfba] text-[#333]"
            />
            <label className="text-sm text-[#333] font-medium">Color</label>
            <input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
              className="w-full h-10 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewCategoryModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddCategory();
                  setShowNewCategoryModal(false);
                }}
                className="px-4 py-2 bg-[#e36396] text-white rounded hover:bg-pink-600 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
