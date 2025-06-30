// src/App.js
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Fetch tasks
const fetchTasks = async () => {
  console.log("🟡 Fetching tasks...");
  try {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    console.log("🟢 Tasks fetched:", data);
  } catch (err) {
    console.error("🔴 Failed to fetch tasks", err);
  }
};

const toggleComplete = async (task) => {
  try {
    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks(); // refresh list
  } catch (err) {
    console.error("Error toggling task", err);
  }
};

const deleteTask = async (id) => {
  try {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks(); // refresh list
  } catch (err) {
    console.error("Error deleting task", err);
  }
};



  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (res.ok) {
        setNewTaskTitle("");
        fetchTasks(); // refresh list
      }
    } catch (err) {
      console.error("Error adding task", err);
    }
    console.log("📤 Sending:", newTaskTitle);

  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: 600, margin: '0 auto' }}>
      <h1>📝 To-Do List</h1>

      {/* Task creation form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task"
          style={{ padding: '0.5rem', width: '80%' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Add</button>
      </form>

      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: '0.5rem' }}>
            <span
              onClick={() => toggleComplete(task)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
