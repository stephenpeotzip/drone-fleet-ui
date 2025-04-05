function DraggableDronePreview({ drone }) {
    return (
      <div className="rounded-xl bg-white border text-sm p-4 shadow-lg w-[300px]">
        <h2 className="text-lg font-semibold text-gray-900">{drone.name}</h2>
        <p className="text-sm text-gray-600">🧰 Rig: {drone.rigVersion}</p>
        <p className="text-sm text-gray-600">
          ✅ Status:{" "}
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
              drone.status === "Active"
                ? "bg-green-100 text-green-800"
                : drone.status === "Repair"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {drone.status}
          </span>
        </p>
        <p className="text-sm text-gray-600">📍 Location: {drone.location}</p>
      </div>
    );
  }
  
  export default DraggableDronePreview;
  