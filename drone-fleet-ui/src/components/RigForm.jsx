export default function RigForm({ rig }) {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Rig Name" defaultValue={rig?.name || ''} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Linux Version" defaultValue={rig?.linux || ''} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Application Version" defaultValue={rig?.app || ''} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Tailscale Name" defaultValue={rig?.tailscale || ''} className="border p-2 rounded w-full" />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Save Rig</button>
    </form>
  );
}
