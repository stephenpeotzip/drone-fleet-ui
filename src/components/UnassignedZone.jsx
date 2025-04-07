import React from "react";
import { useDrop } from "react-dnd";
import DraggableRig from "./DraggableRig";
import DraggableDroneCard from "./DraggableDroneCard";

const UnassignedZone = ({ unassigned, setUnassigned, onEdit }) => {
  const removeUnassigned = (id) => {
    setUnassigned((prev) => prev.filter((a) => a.id !== id));
  };

  const [, drop] = useDrop({
    accept: ["rig", "drone"],
    drop: (item) => {
      const asset = item.rig || item;

      if (asset.type === "drone") {
        window.deleteAsset?.(asset.id);

        (asset.rigs || []).forEach((rig) => {
          window.addAsset?.({ ...rig, type: "rig" });
        });

        setUnassigned((prev) => [
          ...prev,
          { ...asset, rigs: [], type: "drone" }
        ]);
      } else {
        const alreadyIn = unassigned.find((a) => a.id === asset.id);
        if (!alreadyIn) {
          setUnassigned((prev) => [...prev, asset]);

          if (item.parentDroneId && item.updateDroneRigs) {
            item.updateDroneRigs(item.parentDroneId, (prev) =>
              prev.filter((r) => r.id !== asset.id)
            );
          }
        }
      }
    }
  });

  return (
    <div
      ref={drop}
      className="p-4 bg-chat-card dark:bg-chat-darkCard border border-chat-border rounded-lg shadow w-full min-h-[112px] mt-[6px] flex flex-col gap-2"
    >
      <h2 className="text-base font-semibold text-chat-text dark:text-chat-darkText mb-1">
        Unassigned
      </h2>

      {unassigned.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No unassigned assets.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {unassigned.map((asset, index) =>
            asset.type === "drone" ? (
              <DraggableDroneCard
                key={asset.id}
                id={asset.id}
                index={index}
                drone={{ ...asset, rigs: asset.rigs || [] }}
                moveDrone={() => {}}
                assignRig={() => {}}
                updateDroneRigs={() => {}}
                onEdit={onEdit}
              />
            ) : (
              <DraggableRig
                key={asset.id}
                rig={asset}
                index={index}
                parentDroneId={null}
                onEdit={onEdit}
                updateDroneRigs={null}
                removeFromUnassigned={removeUnassigned}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UnassignedZone;
