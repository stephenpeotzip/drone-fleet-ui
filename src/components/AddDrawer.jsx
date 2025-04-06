import React, { useEffect, useState } from "react";

const AddDrawer = ({ isOpen, onClose, editData }) => {
  const [formType, setFormType] = useState("drone");
  const [formData, setFormData] = useState({
    model: "",
    serial: "",
    faaNumber: "",
    numBatteries: "",
    linuxVersion: "",
    appVersion: "",
    tailscaleName: "",
    label: "",
    description: ""
  });

  useEffect(() => {
    if (editData) {
      setFormType(editData.type);
      setFormData({ ...formData, ...editData.data });
    } else {
      setFormData({
        model: "",
        serial: "",
        faaNumber: "",
        numBatteries: "",
        linuxVersion: "",
        appVersion: "",
        tailscaleName: "",
        label: "",
        description: ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const id = `${formType}-${Date.now()}`;
    const payload = { ...formData, id };

    switch (formType) {
      case "drone":
        window.addDrone?.(payload);
        break;
      case "rig":
        window.addRig?.(payload);
        break;
      case "other":
        window.addOther?.(payload);
        break;
      default:
        break;
    }

    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-96 bg-white dark:bg-[#444654] text-gray-800 dark:text-[#ECECF1] shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-xl font-bold">
          {editData ? `Edit ${formType}` : "Add New Item"}
        </h2>

        {!editData && (
          <div className="flex gap-2">
            {["drone", "rig", "other"].map((type) => (
              <button
                key={type}
                onClick={() => setFormType(type)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  formType === type
                    ? "bg-gray-300 dark:bg-gray-600 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {formType === "drone" && (
            <>
              <input type="text" name="model" placeholder="Drone Model" value={formData.model} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="text" name="serial" placeholder="DJI Serial Number" value={formData.serial} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="text" name="faaNumber" placeholder="FAA Number" value={formData.faaNumber} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="number" name="numBatteries" placeholder="Number of Batteries" value={formData.numBatteries} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
            </>
          )}

          {formType === "rig" && (
            <>
              <input type="text" name="model" placeholder="Rig Model Name" value={formData.model} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="text" name="linuxVersion" placeholder="Linux Version" value={formData.linuxVersion} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="text" name="appVersion" placeholder="Application Version" value={formData.appVersion} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <input type="text" name="tailscaleName" placeholder="Tailscale Name" value={formData.tailscaleName} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
            </>
          )}

          {formType === "other" && (
            <>
              <input type="text" name="label" placeholder="Name / Label" value={formData.label} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600" rows={4} />
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDrawer;
