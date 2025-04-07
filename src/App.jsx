import React, { useState, useEffect } from "react";
import DroneList from "./components/DroneList";
import UnassignedZone from "./components/UnassignedZone";
import AddDrawer from "./components/AddDrawer";

const App = () => {
  const [drones, setDrones] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
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

  useEffect(() => {
    // Seed data from screenshot
    setDrones([
      {
        id: "drone1",
        type: "drone",
        model: "M300 - Jordan",
        serial: "TBD",
        faaNumber: "TBD",
        numBatteries: 12,
        rigs: [
          {
            id: "rig1",
            type: "rig",
            model: "BYR v3 Prototype",
            linuxVersion: "2.8.0",
            appVersion: "Unknown - Experimental",
            tailscaleName: "byr-v3"
          },
          {
            id: "rig2",
            type: "rig",
            model: "Zig-Zag",
            linuxVersion: "2.8.0?",
            appVersion: "Unknown",
            tailscaleName: "NA"
          }
        ]
      },
      {
        id: "drone2",
        type: "drone",
        model: "DJI M300 - Anderson",
        serial: "15963A90185468FA",
        faaNumber: "FA943F91PK",
        numBatteries: 16,
        rigs: [
          {
            id: "rig3",
            type: "rig",
            model: "BYR v2.5 - Indigo",
            linuxVersion: "2.8.0",
            appVersion: "shav250",
            tailscaleName: "NA"
          }
        ]
      },
      {
        id: "drone3",
        type: "drone",
        model: "DJI M300 - Aaron",
        serial: "1581F12NBY7P00C00FB0",
        faaNumber: "FAA4WA7NRF",
        numBatteries: 10,
        rigs: []
      },
      {
        id: "drone4",
        type: "drone",
        model: "DJI M350 - Kyle",
        serial: "1581F6GK82A5040040W",
        faaNumber: "FA3HM3WTLH",
        numBatteries: 8,
        rigs: []
      },
      {
        id: "drone5",
        type: "drone",
        model: "DJI M350 - Stephan",
        serial: "1581F6GK82AG0400491",
        faaNumber: "FA3APLXLXR",
        numBatteries: 8,
        rigs: []
      },
      {
        id: "drone6",
        type: "drone",
        model: "DJI M300 - Aviary",
        serial: "1581F6GK82AG0400491",
        faaNumber: "FA3APLXLXR",
        numBatteries: 8,
        rigs: []
      }
    ]);

    setUnassigned([
      {
        id: "rig4",
        type: "rig",
        model: "BYR v2.5",
        linuxVersion: "Ubuntu 20.04",
        appVersion: "1.2.3",
        tailscaleName: "byr-01"
      }
    ]);

    window.addAsset = (item) => {
      const id = item.id || `${item.type}-${Date.now()}`;
      const newItem = { ...item, id };

      if (item.type === "drone") {
        setDrones((prev) => [...prev, newItem]);
      } else {
        setUnassigned((prev) => [...prev, newItem]);
      }
    };

    window.updateAsset = (item) => {
      if (item.type === "drone") {
        setDrones((prev) => prev.map((d) => (d.id === item.id ? item : d)));
      } else {
        setUnassigned((prev) => prev.map((a) => (a.id === item.id ? item : a)));
      }
    };

    window.deleteAsset = (id) => {
      setDrones((prev) => prev.filter((d) => d.id !== id));
      setUnassigned((prev) => prev.filter((a) => a.id !== id));
    };
  }, []);

  return (
    <div className="min-h-screen bg-chat-bg dark:bg-[#343541] text-chat-text dark:text-[#ECECF1] font-sans">
      <header className="border-b bg-chat-bg dark:bg-[#444654] dark:border-[#3b3d4a] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="32" height="32" fill={darkMode ? "#A1A1AA" : "#1E3A8A"}>
              <path d="M48.5 16C47.1 8.6 40.1 3 32 3c-6.9 0-12.8 4.2-15.3 10.2C7.3 14 2 19.6 2 26c0 7.2 5.8 13 13 13h33c7.2 0 13-5.8 13-13 0-6.2-4.5-11.5-10.5-13z" />
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

      <main className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-x-hidden">
        <section className="flex-1 w-full">
          <DroneList drones={drones} setDrones={setDrones} onEdit={handleEdit} />
        </section>
        <aside className="w-full md:w-[320px] pt-[6px]">
          <UnassignedZone unassigned={unassigned} setUnassigned={setUnassigned} onEdit={handleEdit} />
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
