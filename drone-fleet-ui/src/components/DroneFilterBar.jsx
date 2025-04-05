function DroneFilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <div className="relative w-full">
        <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">🔍</span>
        <input
          type="text"
          value={filters.query}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, query: e.target.value }))
          }
          placeholder="Search..."
          className="pl-9 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, status: e.target.value }))
        }
        className="p-2 border rounded-md w-full md:w-48 focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">All statuses</option>
        <option value="Active">Active</option>
        <option value="Repair">Repair</option>
        <option value="Retired">Retired</option>
      </select>
    </div>
  );
}

export default DroneFilterBar;
