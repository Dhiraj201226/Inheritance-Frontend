import { useLocation, useNavigate } from "react-router-dom";

export default function DonorProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-10 text-center">
        <p>No donor data available.</p>
        <button
          onClick={() => navigate("/PublicViewer")}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const { donor, party, amount, date } = state;

  return (
    <div className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-semibold mb-6">
          {donor}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Stat label="Party Supported" value={party} />
          <Stat label="Last Donation" value={`₹${amount.toLocaleString("en-IN")}`} />
          <Stat label="Last Donation Date" value={date} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded"
          >
            Back
          </button>

          <button
            onClick={() => navigate("/Donation")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Donate
          </button>
        </div>

      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
