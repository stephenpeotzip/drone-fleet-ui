import React, { useState } from "react";
import DroneList from "./components/DroneList";
import UnassignedRigZone from "./components/UnassignedRigZone";
import AddDrawer from "./components/AddDrawer";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const handleOpenDrawer = () => {
    setEditMode(null); // clear to show fresh add form
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleEdit = (type, data) => {
    setEditMode({ type, data });
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 relative p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-10">
          <h1 className="text-2xl font-bold">Fleet Overview</h1>
          <button
            onClick={handleOpenDrawer}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          >
            + Add
          </button>
        </div>

        <div className="flex">
          <main className="flex-1 pr-6">
            <DroneList
              setEditMode={(data) => handleEdit("drone", data)}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </main>
          <aside className="w-80">
            <UnassignedRigZone
              setEditMode={(data) => handleEdit("rig", data)}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </aside>
        </div>
      </div>

      <AddDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        editData={editMode}
      />
    </div>
  );
};

export default App;
