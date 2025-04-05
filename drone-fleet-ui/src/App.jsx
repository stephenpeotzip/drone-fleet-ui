import Sidebar from './components/Sidebar';
import AddDrawer from './components/AddDrawer';
import DroneCard from './components/DroneCard';
import UnassignedRigZone from './components/UnassignedRigZone';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

export default function App() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerItem, setDrawerItem] = useState(null);

  const [drones, setDrones] = useState([
    {
      id: 1,
      name: 'M350',
      rig: 'V2V 43',
      status: 'Active',
      location: 'Aviary',
    },
    {
      id: 2,
      name: 'M300 Jordan',
      rig: 'v2.5',
      status: 'Active',
      location: 'Utah',
      assignedRig: {
        id: 'v3proto',
        name: 'V3 Proto',
        linux: '2.8',
        app: '25683',
        tailscale: 'v3test',
      },
    },
    {
      id: 3,
      name: 'M300',
      rig: 'V2V 42',
      status: 'Active',
      location: 'Aviary',
    },
  ]);

  const [unassignedRigs, setUnassignedRigs] = useState([
    { id: 'tes', name: 'tes', linux: 'test', app: 'tes', tailscale: 'tes' },
  ]);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
    setDrawerItem(null);
  };

  const handleEditDrone = (drone) => {
    setDrawerItem({ type: 'Drone', data: drone });
    setShowDrawer(true);
  };

  const handleDeleteDrone = (drone) => {
    if (confirm(`Delete drone "${drone.name}"?`)) {
      setDrones((prev) => prev.filter((d) => d.id !== drone.id));
    }
  };

  const handleEditRig = (rig) => {
    setDrawerItem({ type: 'Rig', data: rig });
    setShowDrawer(true);
  };

  const handleDeleteRig = (rig) => {
    if (confirm(`Delete rig "${rig.name}"?`)) {
      setUnassignedRigs((prev) => prev.filter((r) => r.id !== rig.id));
    }
  };

  const unassignRig = (id) => {
    setDrones((prevDrones) =>
      prevDrones.map((drone) => {
        if (drone.assignedRig?.id === id) {
          setUnassignedRigs((prevRigs) => [...prevRigs, drone.assignedRig]);
          return { ...drone, assignedRig: null };
        }
        return drone;
      })
    );
  };

  const addDrone = (droneData) => {
    setDrones((prevDrones) => [
      ...prevDrones,
      { ...droneData, id: Date.now() },
    ]);
  };

  const addRig = (rigData) => {
    setUnassignedRigs((prevRigs) => [
      ...prevRigs,
      { ...rigData, id: Date.now().toString() },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar onAddClick={toggleDrawer} />

        {showDrawer && (
          <AddDrawer
            onClose={toggleDrawer}
            itemToEdit={drawerItem}
            addDrone={addDrone}
            addRig={addRig}
          />
        )}

        <main className="flex-grow p-4 overflow-auto space-y-4">
          {drones.map((drone) => (
            <DroneCard
              key={drone.id}
              drone={drone}
              onEdit={handleEditDrone}
              onDelete={handleDeleteDrone}
            />
          ))}
        </main>

        <aside className="w-80 p-4 border-l border-gray-200 bg-white">
          <UnassignedRigZone
            rigs={unassignedRigs}
            unassignRig={unassignRig}
            onEditRig={handleEditRig}
            onDeleteRig={handleDeleteRig}
          />
        </aside>
      </div>
    </DndProvider>
  );
}
