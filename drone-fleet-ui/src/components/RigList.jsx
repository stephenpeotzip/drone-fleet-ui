import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import DraggableRig from "./DraggableRig";

function RigList({ setEditingRig, setShowDrawer }) {
  const [rigs, setRigs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rigs"), (snapshot) => {
      const allRigs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const unassigned = allRigs.filter((rig) => !rig.assignedToDroneId);
      setRigs(unassigned);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (rig) => {
    setEditingRig(rig);
    setShowDrawer(true);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Unassigned Rigs
      </h2>

      {rigs.map((rig) => (
        <DraggableRig key={rig.id} rig={rig} onEdit={handleEdit} />
      ))}

      {rigs.length === 0 && (
        <p className="text-gray-400 italic">All rigs are assigned ✅</p>
      )}
    </div>
  );
}

export default RigList;
