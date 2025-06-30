"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CategoryCard({
  category,
  tasks,
  onAddTask,
  onToggle,
  onDeleteTask,
  onDeleteCategory,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, category.name);
    setNewTaskTitle("");
  };

  return (
    <div
      // In container div of each card:
      className="bg-white shadow-md rounded-lg p-4 flex flex-col transition transform hover:scale-[1.02] hover:shadow-lg"
      style={{ borderTop: `4px solid ${category.color}` }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg text-[#333] flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          ></span>
          {category.name}
        </h2>
        <button
            onClick={() => onDeleteCategory(category._id)}
            className="text-[#e36396] hover:text-red-600 text-sm transition transform hover:scale-110"
            title="Delete category"
        >
            🗑️
        </button>

      </div>

      <div className="flex mb-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task"
          className="flex-grow border border-gray-300 rounded-l px-2 py-1 text-sm focus:outline-none"
        />
        <button
            onClick={handleAdd}
            className="bg-[#16dfba] text-white px-3 rounded-r text-sm hover:bg-[#13c3a5] transition transform hover:scale-105"
        >
        Add
        </button>

      </div>

      <ul className="flex-grow overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={() => onToggle(task)}
            onDelete={() => onDeleteTask(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}
