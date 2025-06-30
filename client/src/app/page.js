"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import AddCategoryCard from "./components/AddCategoryCard";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewCategoryInline, setShowNewCategoryInline] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#16dfba");

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:5050/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:5050/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const handleAddTask = async (title, category) => {
    await fetch("http://127.0.0.1:5050/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category }),
    });
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await fetch(`http://127.0.0.1:5050/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5050/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`http://127.0.0.1:5050/api/categories/${id}`, {
      method: "DELETE",
    });
    fetchCategories();
    fetchTasks();
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    await fetch("http://127.0.0.1:5050/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName, color: newCategoryColor }),
    });
    setNewCategoryName("");
    setNewCategoryColor("#16dfba");
    setShowNewCategoryInline(false);
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfafa] via-[#f4e1ec] to-[#d6f0eb] p-6 font-sans">
      <h1 className="text-4xl font-bold text-center mb-2 text-[#333]">🗂️ My Tasks</h1>
      <p className="text-center text-gray-500 mb-6">Organize your life beautifully ✨</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .sort((a, b) => (a.name === "General" ? -1 : 1))
          .map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              tasks={tasks.filter((t) => t.category === cat.name)}
              onAddTask={handleAddTask}
              onToggle={handleToggle}
              onDeleteTask={handleDeleteTask}
              onDeleteCategory={handleDeleteCategory}
            />
          ))}

        {!showNewCategoryInline ? (
          <AddCategoryCard onClick={() => setShowNewCategoryInline(true)} />
        ) : (
          <div
            className="bg-white shadow-md rounded-lg p-4 flex flex-col animate-fade-in border-t-4 border-[#e36396] transition transform hover:scale-105"
          >
            <h2 className="font-bold text-lg mb-2 text-[#333]">New Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-[#16dfba] text-[#333]"
            />
            <div className="flex items-center gap-2 mb-4">
              <label className="text-sm text-[#333] font-medium">Color:</label>
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition"
                  style={{ backgroundColor: newCategoryColor }}
                ></div>
                <input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-auto">
              <button
                onClick={() => setShowNewCategoryInline(false)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1 bg-[#e36396] text-white rounded hover:bg-pink-600 transition transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
