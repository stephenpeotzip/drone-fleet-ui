import React from "react";
import update from "immutability-helper";
import DraggableDroneCard from "./DraggableDroneCard";
import { useDrop } from "react-dnd";

const DroneList = ({ drones, setDrones, onEdit }) => {
  const moveDrone = (dragIndex, hoverIndex) => {
    const dragged = drones[dragIndex];
    setDrones(
      update(drones, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragged]
        ]
      })
    );
  };

  const assignRig = (droneId, rig) => {
    setDrones((prev) =>
      prev.map((drone) =>
        drone.id === droneId && !drone.rigs?.some((r) => r.id === rig.id)
          ? { ...drone, rigs: [...(drone.rigs || []), rig] }
          : drone
      )
    );
  };

  const updateDroneRigs = (droneId, updater) => {
    setDrones((prev) =>
      prev.map((drone) =>
        drone.id === droneId
          ? { ...drone, rigs: typeof updater === "function" ? updater(drone.rigs || []) : updater }
          : drone
      )
    );
  };

  const [, drop] = useDrop({
    accept: "drone",
    drop: (item) => {
      if (!drones.find((d) => d.id === item.id)) {
        setDrones((prev) => [...prev, item]);
        window.deleteAsset?.(item.id);
      }
    }
  });

  return (
    <div ref={drop} className="space-y-4">
      {drones.map((drone, index) => (
        <DraggableDroneCard
          key={drone.id}
          id={drone.id}
          index={index}
          drone={drone}
          moveDrone={moveDrone}
          assignRig={assignRig}
          updateDroneRigs={updateDroneRigs}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default DroneList;
