import Card from "./Card";

export default function StatCard({ title, value }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </Card>
  );
}
