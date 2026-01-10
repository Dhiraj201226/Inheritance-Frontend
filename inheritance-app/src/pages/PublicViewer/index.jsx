import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA = [
  {
    id: 1,
    party: "Bharatiya Janata Party",
    donor: "Rakesh Verma",
    date: "12 Feb 2024",
    amount: 120000,
  },
  {
    id: 2,
    party: "Indian National Congress",
    donor: "Smita Joshi",
    date: "09 Feb 2024",
    amount: 137000,
  },
  {
    id: 3,
    party: "Aam Aadmi Party",
    donor: "Vijay Sharma",
    date: "08 Feb 2024",
    amount: 147000,
  },
  {
    id: 4,
    party: "Indian National Congress",
    donor: "Sunish Aggarwal",
    date: "31 Jan 2024",
    amount: 124000,
  },
];

export default function PublicViewer() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredData = DUMMY_DATA.filter(
    (row) =>
      row.party.toLowerCase().includes(search.toLowerCase()) ||
      row.donor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Explore Public Data
        </h1>
        <p className="text-gray-600 mb-6">
          Access verified public records of political funding and donations
        </p>

        {/* SEARCH BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Party Name or Disclosed Donor Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Search
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          <button className="border px-4 py-2 rounded-lg text-sm bg-blue-100">
            Year
          </button>
          <button className="border px-4 py-2 rounded-lg text-sm bg-blue-200 font-medium">
            Election Cycle
          </button>
          <button className="border px-4 py-2 rounded-lg text-sm bg-blue-100">
            Amount Range
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Party Name</th>
                <th className="text-left px-4 py-3">Donor Name</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">View Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{row.party}</td>
                  <td className="px-4 py-3">{row.donor}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 font-medium">
                    ₹{row.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/donor/${row.id}`, { state: row })
                      }
                      className="text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50"
                    >
                      View Details
                    </button>

                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 mt-4 text-sm text-blue-600">
          <button>Previous</button>
          <button className="font-semibold">1</button>
          <button>2</button>
          <button>Next</button>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-6 text-xs text-gray-500 border rounded-lg p-4 bg-gray-50">
          Only legally disclosed donations are shown. All data is subject to
          verification and regulatory audits.
        </div>

        {/* REPORT ISSUE */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-800 mb-1">
            Report an Issue
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Encountered a discrepancy or have concerns? Use our verified
            complaint process.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            File a Complaint
          </button>
        </div>

      </div>
    </div>
  );
}
