import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EditDroneModal({ drone, onClose, onSave }) {
  const [form, setForm] = useState({ ...drone });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, "drones", drone.id);
    await updateDoc(ref, form);
    onSave?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Drone</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Drone Name"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="rigVersion"
            value={form.rigVersion}
            onChange={handleChange}
            placeholder="Rig Version"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="droneModel"
            value={form.droneModel || ""}
            onChange={handleChange}
            placeholder="Drone Model"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="djiSerial"
            value={form.djiSerial || ""}
            onChange={handleChange}
            placeholder="DJI Serial Number"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="faaNumber"
            value={form.faaNumber || ""}
            onChange={handleChange}
            placeholder="FAA Number"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="batteryCount"
            value={form.batteryCount || ""}
            onChange={handleChange}
            placeholder="Number of Batteries"
            className="w-full p-2 rounded-md border"
          />

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDroneModal;
