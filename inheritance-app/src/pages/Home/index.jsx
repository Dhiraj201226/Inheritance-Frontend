import DataTable from "../../components/DataTable";

export default function Landing() {
  const columns = ["name", "amount", "date"];

  const data = [
    { name: "Party A", amount: "₹5,00,000", date: "01-01-2026" },
    { name: "Party B", amount: "₹3,00,000", date: "02-01-2026" },
  ];

  return (
    <>
      <h1>Dhiraj</h1>
      <DataTable columns={columns} data={data} />
    </>
  );
}
