export default function AddDroneForm() {
  return (
    <form className="space-y-4 bg-white rounded shadow p-4">
      <h3 className="font-semibold text-lg">Add New Drone</h3>
      <input
        type="text"
        placeholder="Drone Name"
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        placeholder="Rig Version"
        className="border rounded p-2 w-full"
      />
      <select className="border rounded p-2 w-full">
        <option>Active</option>
        <option>In Repair</option>
        <option>Inactive</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        className="border rounded p-2 w-full"
      />
      <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded">
        Add Drone
      </button>
    </form>
  );
}
``
