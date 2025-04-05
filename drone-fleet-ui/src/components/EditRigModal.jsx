import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EditRigModal({ rig, onClose, onSave }) {
  const [form, setForm] = useState({
    modelName: rig.modelName || "",
    linuxVersion: rig.linuxVersion || "",
    appVersion: rig.appVersion || "",
    tailscaleName: rig.tailscaleName || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = doc(db, "rigs", rig.id);

    try {
      await updateDoc(ref, {
        modelName: form.modelName || "",
        linuxVersion: form.linuxVersion || "",
        appVersion: form.appVersion || "",
        tailscaleName: form.tailscaleName || "",
      });
      onSave?.();
      onClose();
    } catch (err) {
      console.error("Failed to update rig:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Rig</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="modelName"
            value={form.modelName}
            onChange={handleChange}
            placeholder="Model Name"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="linuxVersion"
            value={form.linuxVersion}
            onChange={handleChange}
            placeholder="Linux Version"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="appVersion"
            value={form.appVersion}
            onChange={handleChange}
            placeholder="App Version"
            className="w-full p-2 rounded-md border"
          />
          <input
            name="tailscaleName"
            value={form.tailscaleName}
            onChange={handleChange}
            placeholder="Tailscale Name (optional)"
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

export default EditRigModal;
