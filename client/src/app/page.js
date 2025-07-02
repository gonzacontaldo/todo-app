"use client";

import { useEffect, useState, useCallback } from "react";
import CategoryCard from "./components/CategoryCard";
import AddCategoryCard from "./components/AddCategoryCard";
import CreateCategoryModal from "./components/CreateCategoryModal";
import Sidebar from "./components/Sidebar";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderedIds, setOrderedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    const res = await fetch("http://127.0.0.1:5050/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  }, [token]);

  const fetchCategories = useCallback(async () => {
    if (!token) return;
    const res = await fetch("http://127.0.0.1:5050/api/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data);
    setOrderedIds(data.map((c) => c._id));
  }, [token]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchTasks();
      fetchCategories();
    }
  }, [token, fetchTasks, fetchCategories]);

  const handleAddTask = async (title, category) => {
    await fetch("http://127.0.0.1:5050/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category }),
    });
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await fetch(`http://127.0.0.1:5050/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5050/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTasks();
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`http://127.0.0.1:5050/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCategories();
    fetchTasks();
  };

  const handleCreateCategory = async ({ name, color }) => {
    if (!name.trim()) return;
    await fetch("http://127.0.0.1:5050/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, color }),
    });
    fetchCategories();
    setShowModal(false);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserName(userData.name);
    fetchTasks();
    fetchCategories();
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrderedIds((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sortedCategories = orderedIds
    .map((id) => categories.find((c) => c._id === id))
    .filter(Boolean);

  const displayedCategories = selectedCategory
    ? sortedCategories.filter((c) => c._id === selectedCategory._id)
    : sortedCategories;

  return (
    <>
      <Sidebar
        categories={categories}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSettingsClick={() => alert("Open settings")}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={handleLogin}
        setIsLoggedIn={setIsLoggedIn}
        setUserName={setUserName}
        setTasks={setTasks}
        setCategories={setCategories}
        setOrderedIds={setOrderedIds}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#fcfafa] via-[#f4e1ec] to-[#d6f0eb] p-6 font-sans ml-64 relative z-0">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCategories.map((cat) => (
                <SortableCategoryCard
                  key={cat._id}
                  id={cat._id}
                  category={cat}
                  tasks={tasks.filter((t) => t.category === cat.name)}
                  onAddTask={handleAddTask}
                  onToggle={handleToggle}
                  onDeleteTask={handleDeleteTask}
                  onDeleteCategory={handleDeleteCategory}
                />
              ))}

              <AddCategoryCard onClick={() => setShowModal(true)} />
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {showModal && (
        <CreateCategoryModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateCategory}
        />
      )}
    </>
  );
}

function SortableCategoryCard({ id, ...props }) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    setActivatorNodeRef 
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <CategoryCard
        {...props}
        dragHandleProps={{ ...attributes, ...listeners, setActivatorNodeRef }}
      />
    </div>
  );
}
