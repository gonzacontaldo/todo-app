"use client";

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, categories, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => {
        const cat = categories.find((c) => c.name === task.category);
        return (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            category={cat}
          />
        );
      })}
    </ul>
  );
}
