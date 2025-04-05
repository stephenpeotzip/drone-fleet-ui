import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function FleetStats() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "drones"));
      setDrones(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const active = drones.filter(d => d.status === "Active").length;
  const repair = drones.filter(d => d.status === "Repair").length;
  const locations = [...new Set(drones.map(d => d.location))].length;

  const tileClasses = "bg-white rounded-xl shadow-sm p-5 text-center flex-1";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className={tileClasses}>
        <p className="text-sm text-gray-500">Active Drones</p>
        <h2 className="text-2xl font-semibold text-green-600">{active}</h2>
      </div>
      <div className={tileClasses}>
        <p className="text-sm text-gray-500">In Repair</p>
        <h2 className="text-2xl font-semibold text-yellow-500">{repair}</h2>
      </div>
      <div className={tileClasses}>
        <p className="text-sm text-gray-500">Locations</p>
        <h2 className="text-2xl font-semibold text-blue-600">{locations}</h2>
      </div>
    </div>
  );
}

export default FleetStats;
