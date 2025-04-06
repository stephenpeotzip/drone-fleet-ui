import React, { useState } from "react";
import DroneList from "./components/DroneList";
import UnassignedRigZone from "./components/UnassignedRigZone";
import AddDrawer from "./components/AddDrawer";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleOpenDrawer = () => {
    setEditMode(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleEdit = (type, data) => {
    setEditMode({ type, data });
    setIsDrawerOpen(true);
  };

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-chat-bg dark:bg-[#343541] text-chat-text dark:text-[#ECECF1] font-sans">
      <header className="border-b bg-chat-bg dark:bg-[#444654] dark:border-[#3b3d4a] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 40"
              width="32"
              height="32"
              fill={darkMode ? "#A1A1AA" : "#1E3A8A"}
            >
              <path d="M48.5 16C47.1 8.6 40.1 3 32 3c-6.9 0-12.8 4.2-15.3 10.2C7.3 14 2 19.6 2 26c0 7.2 5.8 13 13 13h33c7.2 0 13-5.8 13-13 0-6.2-4.5-11.5-10.5-13z"/>
            </svg>
            <h1 className="text-xl tracking-wide text-chat-text dark:text-chat-darkText">
              <span className="font-bold">SKY</span>OPS
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="text-xl px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleOpenDrawer}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-gray-100 dark:bg-gray-700 text-sm shadow-sm transition hover:shadow-md"
            >
              + Add
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 flex gap-6">
        <section className="flex-1">
          <DroneList onEdit={handleEdit} setIsDrawerOpen={setIsDrawerOpen} />
        </section>
        <aside className="w-[320px] pt-[6px]">
          <UnassignedRigZone onEdit={handleEdit} setIsDrawerOpen={setIsDrawerOpen} />
        </aside>
      </main>

      <AddDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        editData={editMode}
      />
    </div>
  );
};

export default App;
