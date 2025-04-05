export default function Sidebar({ onAddClick }) {
  return (
    <div className="w-56 border-r bg-white">
      <div className="py-6 px-4">
        <h2 className="text-xl font-semibold">DroneFleet</h2>
      </div>
      <nav className="px-4">
        <button
          onClick={onAddClick}
          className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          + Add
        </button>
      </nav>
    </div>
  );
}
