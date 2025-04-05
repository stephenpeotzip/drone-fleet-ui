import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function ChatPromptForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    rigVersion: "",
    status: "Active",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "drones"), form);
    setForm({ name: "", rigVersion: "", status: "Active", location: "" });
    if (onAdd) onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row flex-wrap gap-2 w-full"
    >
      <input
        name="name"
        placeholder="Drone name"
        value={form.name}
        onChange={handleChange}
        required
        className="flex-1 p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <input
        name="rigVersion"
        placeholder="Rig version"
        value={form.rigVersion}
        onChange={handleChange}
        required
        className="flex-1 p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
        className="flex-1 p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option>Active</option>
        <option>Repair</option>
        <option>Retired</option>
      </select>
      <button
        type="submit"
        className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Add
      </button>
    </form>
  );
}

export default ChatPromptForm;
