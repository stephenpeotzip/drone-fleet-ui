import { useDrag } from 'react-dnd';
import { Pencil, Trash2 } from 'lucide-react';

export default function DraggableRig({ rig, onEditRig, onDeleteRig }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'RIG',
    item: { id: rig.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      className={`relative p-2 border rounded bg-white shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="font-semibold">{rig.name}</div>
      <div className="text-xs">Linux: {rig.linux}</div>
      <div className="text-xs">App: {rig.app}</div>
      <div className="text-xs">Tailscale: {rig.tailscale}</div>

      <div className="absolute top-1 right-1 flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditRig(rig);
          }}
          className="text-blue-500 hover:text-blue-700"
          title="Edit Rig"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteRig(rig);
          }}
          className="text-red-500 hover:text-red-700"
          title="Delete Rig"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
