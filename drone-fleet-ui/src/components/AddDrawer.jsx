import { useState, useEffect } from 'react';

export default function AddDrawer({ onClose, itemToEdit, addDrone, addRig }) {
  const [activeTab, setActiveTab] = useState('Drone');

  const tabs = ['Drone', 'Rig', 'NUC', 'Custom'];

  const [droneForm, setDroneForm] = useState({
    name: '',
    rig: '',
    status: 'Active',
    location: '',
  });

  const [rigForm, setRigForm] = useState({
    name: '',
    linux: '',
    app: '',
    tailscale: '',
  });

  useEffect(() => {
    if (itemToEdit) {
      setActiveTab(itemToEdit.type);
      if (itemToEdit.type === 'Drone') {
        setDroneForm(itemToEdit.data);
      } else if (itemToEdit.type === 'Rig') {
        setRigForm(itemToEdit.data);
      }
    }
  }, [itemToEdit]);

  const handleAddDrone = (e) => {
    e.preventDefault();
    addDrone(droneForm);
    onClose();
  };

  const handleAddRig = (e) => {
    e.preventDefault();
    addRig(rigForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-96 bg-white p-6 overflow-auto">
        <button onClick={onClose} className="mb-4 text-gray-600">
          Close ✖️
        </button>

        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 rounded ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Drone' && (
          <form className="space-y-4 bg-white rounded shadow p-4" onSubmit={handleAddDrone}>
            <h3 className="font-semibold text-lg">Add New Drone</h3>
            <input
              type="text"
              placeholder="Drone Name"
              className="border rounded p-2 w-full"
              value={droneForm.name}
              onChange={(e) => setDroneForm({ ...droneForm, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Rig Version"
              className="border rounded p-2 w-full"
              value={droneForm.rig}
              onChange={(e) => setDroneForm({ ...droneForm, rig: e.target.value })}
            />
            <select
              className="border rounded p-2 w-full"
              value={droneForm.status}
              onChange={(e) => setDroneForm({ ...droneForm, status: e.target.value })}
            >
              <option>Active</option>
              <option>In Repair</option>
              <option>Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              className="border rounded p-2 w-full"
              value={droneForm.location}
              onChange={(e) => setDroneForm({ ...droneForm, location: e.target.value })}
            />
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded">
              Add Drone
            </button>
          </form>
        )}

        {activeTab === 'Rig' && (
          <form className="space-y-4 bg-white rounded shadow p-4" onSubmit={handleAddRig}>
            <h3 className="font-semibold text-lg">Add New Rig</h3>
            <input
              type="text"
              placeholder="Rig Name"
              className="border rounded p-2 w-full"
              value={rigForm.name}
              onChange={(e) => setRigForm({ ...rigForm, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Linux Version"
              className="border rounded p-2 w-full"
              value={rigForm.linux}
              onChange={(e) => setRigForm({ ...rigForm, linux: e.target.value })}
            />
            <input
              type="text"
              placeholder="App Version"
              className="border rounded p-2 w-full"
              value={rigForm.app}
              onChange={(e) => setRigForm({ ...rigForm, app: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tailscale Name"
              className="border rounded p-2 w-full"
              value={rigForm.tailscale}
              onChange={(e) => setRigForm({ ...rigForm, tailscale: e.target.value })}
            />
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded">
              Add Rig
            </button>
          </form>
        )}

        {activeTab === 'NUC' && <div className="text-gray-500">NUC form here</div>}
        {activeTab === 'Custom' && <div className="text-gray-500">Custom form here</div>}
      </div>
    </div>
  );
}
