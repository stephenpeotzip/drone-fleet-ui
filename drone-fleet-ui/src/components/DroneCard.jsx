import { Pencil, Trash2 } from 'lucide-react';

export default function DroneCard({ drone, onEdit, onDelete }) {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow border">
      <h3 className="font-bold text-lg">{drone.name}</h3>
      <div className="text-sm mt-1 space-y-1">
        <div>📛 Rig: {drone.rig}</div>
        <div>
          ✅ Status: <span className="text-green-500">{drone.status}</span>
        </div>
        <div>📍 Location: {drone.location}</div>
      </div>
      {drone.assignedRig && (
        <div className="mt-4 border-t pt-2">
          <h4 className="font-medium">Assigned Rig:</h4>
          <div className="text-xs bg-gray-50 p-2 rounded">
            {drone.assignedRig.name}
          </div>
        </div>
      )}

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(drone);
          }}
          className="text-blue-500 hover:text-blue-700"
          title="Edit Drone"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(drone);
          }}
          className="text-red-500 hover:text-red-700"
          title="Delete Drone"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
