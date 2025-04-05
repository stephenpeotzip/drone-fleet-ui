import DroneCard from './DroneCard';

export default function DroneList({ drones = [] }) {
  return (
    <div className="space-y-4">
      {drones.map((drone) => (
        <DroneCard key={drone.id} drone={drone} />
      ))}
    </div>
  );
}
