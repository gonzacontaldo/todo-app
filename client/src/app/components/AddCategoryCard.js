"use client";

export default function AddCategoryCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-200 transition"
    >
      <div className="text-4xl text-[#16dfba]">+</div>
      <p className="mt-2 text-sm text-gray-600">Add Category</p>
    </div>
  );
}
