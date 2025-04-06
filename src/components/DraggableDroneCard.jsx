import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import DraggableRig from "./DraggableRig";

const DraggableDroneCard = ({
  id,
  index,
  drone,
  moveDrone,
  assignRig,
  updateDroneRigs,
  onEdit,
  onDelete,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ["drone", "rig"],
    drop: (item) => {
      if (item.type === "rig" && item.rig) {
        assignRig(drone.id, item.rig);

        // 🛠 REMOVE rig from original drone if moved
        if (item.parentDroneId && item.updateDroneRigs) {
          item.updateDroneRigs(item.parentDroneId, (prevRigs) =>
            prevRigs.filter((r) => r.id !== item.rig.id)
          );
        }

        // 🧹 Remove from unassigned if dragged from pool
        if (typeof item.removeFromUnassigned === "function") {
          item.removeFromUnassigned(item.rig.id);
        }
      }
    },
    hover(item) {
      if (item.type !== "drone" || !ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveDrone(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "drone",
    item: { id, index, type: "drone" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`bg-white p-4 rounded-lg shadow transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      } cursor-move flex flex-col gap-3`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold">{drone.model}</p>
          <p className="text-sm text-gray-500">Serial: {drone.serial}</p>
          <p className="text-sm text-gray-500">FAA #: {drone.faaNumber}</p>
          <p className="text-sm text-gray-500">Batteries: {drone.numBatteries}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit("drone", drone)}
            className="text-blue-600 hover:text-blue-800"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      </div>

      {Array.isArray(drone.rigs) && drone.rigs.length > 0 && (
        <div className="pt-2 border-t mt-2">
          <p className="text-sm font-medium text-gray-600 mb-2">Assigned Rigs:</p>
          <div className="flex gap-2 flex-wrap">
            {drone.rigs.map((rig, i) => (
              <DraggableRig
                key={rig.id}
                rig={rig}
                index={i}
                parentDroneId={drone.id}
                onEdit={onEdit}
                updateDroneRigs={updateDroneRigs}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableDroneCard;
