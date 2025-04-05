import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import DraggableDroneCard from "./DraggableDroneCard";

const DroneList = ({ setEditMode, setIsDrawerOpen }) => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    // Optional starter drones
    setDrones([
      {
        id: "drone1",
        model: "DJI M300",
        serial: "SN12345678",
        faaNumber: "FAA987654321",
        numBatteries: 4,
        rigs: [],
      },
    ]);
  }, []);

  const moveDrone = (dragIndex, hoverIndex) => {
    const dragged = drones[dragIndex];
    setDrones(
      update(drones, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragged],
        ],
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

  window.addDrone = (newDrone) => {
    setDrones((prev) => [
      ...prev,
      {
        id: `drone-${Date.now()}`,
        ...newDrone,
        rigs: [],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {drones.map((drone, index) => (
        <DraggableDroneCard
          key={drone.id}
          id={drone.id}
          index={index}
          drone={drone}
          moveDrone={moveDrone}
          assignRig={assignRig}
          updateDroneRigs={updateDroneRigs}
          onEdit={(data) => setEditMode({ type: "drone", data })}
          onDelete={() =>
            setDrones((prev) => prev.filter((d) => d.id !== drone.id))
          }
        />
      ))}
    </div>
  );
};

export default DroneList;
