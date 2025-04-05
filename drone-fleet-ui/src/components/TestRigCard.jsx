import TestRigCard from "./components/TestRigCard";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">Test Rig Card</h1>
        <TestRigCard />
      </div>
    </div>
  );
}

export default App;