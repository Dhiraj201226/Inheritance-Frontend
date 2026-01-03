export default function Button({ label = "Click" }) {
  return <button className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600">
    {label}</button>;
}
