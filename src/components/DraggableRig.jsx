import React from "react";
import { useDrag } from "react-dnd";

const DraggableRig = ({
  rig,
  index,
  parentDroneId,
  onEdit,
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

  return (
    <div
      ref={drag}
      className={`bg-chat-card dark:bg-chat-darkCard text-chat-text dark:text-chat-darkText border border-chat-border rounded-lg px-3 py-2 shadow-sm flex flex-col gap-1 w-full max-w-xs ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium truncate">
          {rig.model || rig.label || "Unnamed Rig"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit("rig", rig)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
      </div>

      {rig.linuxVersion && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Linux: {rig.linuxVersion}
        </p>
      )}
      {rig.appVersion && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          App: {rig.appVersion}
        </p>
      )}
      {rig.tailscaleName && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Tailscale: {rig.tailscaleName}
        </p>
      )}
      {rig.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {rig.description}
        </p>
      )}
    </div>
  );
};

export default DraggableRig;
