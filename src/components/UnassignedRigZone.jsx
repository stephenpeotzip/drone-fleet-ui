import React from "react";
import { useDrop } from "react-dnd";
import DraggableRig from "./DraggableRig";

const UnassignedRigZone = ({ setEditMode, setIsDrawerOpen }) => {
  const [unassignedRigs, setUnassignedRigs] = React.useState([
    { id: "rig1", model: "BYR v2.5" },
    { id: "rig2", model: "Mono Rig" },
  ]);

  const removeRigFromUnassigned = (rigId) => {
    setUnassignedRigs((prev) => prev.filter((r) => r.id !== rigId));
  };

  const [, drop] = useDrop({
    accept: "rig",
    drop: (item) => {
      if (!unassignedRigs.find((r) => r.id === item.rig.id)) {
        setUnassignedRigs((prev) => [...prev, item.rig]);

        if (item.parentDroneId && item.updateDroneRigs) {
          item.updateDroneRigs(item.parentDroneId, (prev) =>
            prev.filter((r) => r.id !== item.rig.id)
          );
        }
      }
    },
  });

  return (
    <div ref={drop} className="mt-10 p-4 bg-white border rounded-lg shadow w-80">
      <h2 className="text-xl font-semibold mb-2">Unassigned Rigs</h2>
      {unassignedRigs.length === 0 ? (
        <p className="text-gray-400 text-sm">No unassigned rigs.</p>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {unassignedRigs.map((rig, index) => (
            <DraggableRig
              key={rig.id}
              rig={rig}
              index={index}
              setEditMode={setEditMode}
              setIsDrawerOpen={setIsDrawerOpen}
              parentDroneId={null}
              updateDroneRigs={null}
              removeFromUnassigned={removeRigFromUnassigned}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnassignedRigZone;