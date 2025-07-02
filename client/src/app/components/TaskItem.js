"use client";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className="flex justify-between items-center bg-gray-50 rounded px-2 py-1 mb-1 text-sm transition hover:shadow"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            task.completed ? "bg-[#16dfba] border-[#16dfba]" : "border-gray-300"
          } transition transform hover:scale-110`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>
        <span className={task.completed ? "line-through text-gray-400" : "text-[#333]"}>
          {task.title}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-[#e36396] hover:text-red-600 text-xs transition transform hover:scale-110"
      >
        🗑️
      </button>
    </li>
  );
}
