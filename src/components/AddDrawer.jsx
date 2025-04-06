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
    label: ""
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
        label: ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editData && formType === "drone") {
      window.addDrone?.(formData);
    } else {
      console.log("Editing", formType, formData);
    }
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {editData ? `Edit ${formType}` : "Add New Item"}
        </h2>

        {!editData && (
          <div className="mb-4">
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="drone">Drone</option>
              <option value="rig">Rig</option>
              <option value="offload">Offload Appliance</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        <div className="space-y-4">
          {formType === "drone" && (
            <>
              <input type="text" name="model" placeholder="Drone Model" value={formData.model} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="serial" placeholder="DJI Serial Number" value={formData.serial} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="faaNumber" placeholder="FAA Number" value={formData.faaNumber} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="number" name="numBatteries" placeholder="Number of Batteries" value={formData.numBatteries} onChange={handleChange} className="w-full border p-2 rounded" />
            </>
          )}

          {formType === "rig" && (
            <>
              <input type="text" name="model" placeholder="Rig Model Name" value={formData.model} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="linuxVersion" placeholder="Linux Version" value={formData.linuxVersion} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="appVersion" placeholder="Application Version" value={formData.appVersion} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="tailscaleName" placeholder="Tailscale Name" value={formData.tailscaleName} onChange={handleChange} className="w-full border p-2 rounded" />
            </>
          )}

          {(formType === "offload" || formType === "other") && (
            <input type="text" name="label" placeholder="Name / Label" value={formData.label} onChange={handleChange} className="w-full border p-2 rounded" />
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddDrawer;
