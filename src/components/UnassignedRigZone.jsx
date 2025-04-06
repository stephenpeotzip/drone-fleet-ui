import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import DraggableRig from "./DraggableRig";

const UnassignedRigZone = ({ onEdit }) => {
  const [unassignedRigs, setUnassignedRigs] = React.useState([
    {
      id: "rig1",
      model: "BYR v2.5",
      linuxVersion: "Ubuntu 20.04",
      appVersion: "1.2.3",
      tailscaleName: "byr-01"
    },
    {
      id: "rig2",
      model: "Mono Rig",
      linuxVersion: "Debian",
      appVersion: "1.0.5",
      tailscaleName: "mono-07"
    }
  ]);

  useEffect(() => {
    window.addRig = (data) => {
      const id = `rig-${Date.now()}`;
      setUnassignedRigs((prev) => [...prev, { ...data, id }]);
    };

    window.addOther = (data) => {
      const id = `other-${Date.now()}`;
      setUnassignedRigs((prev) => [
        ...prev,
        {
          ...data,
          id,
          model: data.label || "Other",
          description: data.description || ""
        }
      ]);
    };
  }, []);

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
    <div
      ref={drop}
      className="p-4 bg-chat-card dark:bg-chat-darkCard border border-chat-border rounded-lg shadow w-80 min-h-[112px] mt-[6px] flex flex-col gap-2"
    >
      <h2 className="text-base font-semibold text-chat-text dark:text-chat-darkText mb-1">
        Unassigned Rigs
      </h2>
      {unassignedRigs.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No unassigned rigs.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {unassignedRigs.map((rig, index) => (
            <DraggableRig
              key={rig.id}
              rig={rig}
              index={index}
              parentDroneId={null}
              onEdit={onEdit}
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
