"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import { Trash2 } from "lucide-react"; // make sure to install: npm install lucide-react

export default function CategoryCard({
  category,
  tasks,
  onAddTask,
  onToggle,
  onDeleteTask,
  onDeleteCategory,
  dragHandleProps,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, category.name);
    setNewTaskTitle("");
  };

  // Separate setActivatorNodeRef to avoid React warning
  const { setActivatorNodeRef, ...otherDragProps } = dragHandleProps || {};

  return (
    <div
      className="relative bg-[#fdfdfd] shadow-lg rounded-2xl p-5 flex flex-col transition-transform hover:scale-105 hover:shadow-xl border border-gray-100 min-h-[320px]"
      style={{ borderTop: `5px solid ${category.color}` }}
    >
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteCategory(category._id);
        }}
        className="absolute top-3 right-3 bg-white/70 hover:bg-red-500 text-gray-500 hover:text-white rounded-full p-1.5 transition-all border border-gray-200 hover:border-red-500"
        title="Delete category"
      >
        <Trash2 size={18} />
      </button>

      {/* Header */}
      <div
        ref={setActivatorNodeRef}
        {...otherDragProps}
        className="flex justify-between items-center cursor-grab active:cursor-grabbing mb-4"
      >
        <h2 className="font-semibold text-xl text-gray-700">{category.name}</h2>
      </div>

      {/* Add task input */}
      <div className="flex mb-4 gap-2">
        <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="What do you need to do?"
        className="flex-grow rounded-l-full border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#16dfba] transition placeholder-gray-400"
      />

        <button
          onClick={handleAdd}
          className="bg-[#16dfba] text-white px-4 rounded-full text-sm font-medium hover:bg-[#13c3a5] transition-transform hover:scale-105 active:scale-95"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <ul className="flex-grow overflow-y-auto space-y-2">
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
