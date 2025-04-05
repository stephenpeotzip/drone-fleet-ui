import React from "react";
import { useDrag } from "react-dnd";

const DraggableRig = ({
  rig,
  index,
  parentDroneId,
  setEditMode,
  setIsDrawerOpen,
  updateDroneRigs,
  removeFromUnassigned,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "rig",
    item: {
      type: "rig",
      rig,
      index,
      parentDroneId,
      updateDroneRigs,
      removeFromUnassigned,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    if (parentDroneId && updateDroneRigs) {
      updateDroneRigs(parentDroneId, (prevRigs) =>
        prevRigs.filter((r) => r.id !== rig.id)
      );
    } else if (removeFromUnassigned) {
      removeFromUnassigned(rig.id);
    }
  };

  const handleEdit = () => {
    setEditMode({ type: "rig", data: rig });
    setIsDrawerOpen(true);
  };

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 px-3 py-1 bg-gray-100 border rounded-lg shadow-sm text-sm ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <span className="truncate max-w-[120px]">{rig.model || "Unnamed Rig"}</span>
      <button
        onClick={handleEdit}
        className="text-blue-600 hover:text-blue-800"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
      >
        🗑️
      </button>
    </div>
  );
};

export default DraggableRig;
