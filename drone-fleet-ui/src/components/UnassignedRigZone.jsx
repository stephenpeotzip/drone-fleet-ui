import { useDrop } from 'react-dnd';
import DraggableRig from './DraggableRig';

export default function UnassignedRigZone({ rigs, unassignRig, onEditRig, onDeleteRig }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'RIG',
    drop: (item) => unassignRig(item.id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Unassigned Rigs</h3>
      <div ref={drop} className={`p-4 border rounded ${isOver ? 'bg-green-50' : 'bg-gray-50'}`}>
        {rigs.map((rig) => (
          <DraggableRig
            key={rig.id}
            rig={rig}
            onEditRig={onEditRig}
            onDeleteRig={onDeleteRig}
          />
        ))}
        <div className="mt-2 border-dashed border-2 p-4 text-center text-gray-400">
          Drop rig here to unassign
        </div>
      </div>
    </div>
  );
}
