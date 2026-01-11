import { useLocation, useNavigate } from "react-router-dom";

export default function DonorProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1. Fallback Data (Matches the image default if no state exists)
  const donorData = state || {
    donor: "John Smith",
    party: "Multiple Parties",
    amount: 85200,
    date: "2021-03-15",
  };

  // Mock data to populate the detailed dashboard view based on the single donor entry
  const dashboardData = {
    donationCount: 42,
    activeYears: "2016 - 2024",
    partiesSupported: 3,
    history: [
      { date: donorData.date, party: donorData.party, amount: donorData.amount, cycle: "2024 General" },
      { date: "11/05/2023", party: "Party A", amount: 12000, cycle: "2023 State" },
      { date: "07/22/2022", party: "Party C", amount: 3500, cycle: "2022 Midterm" },
      { date: "03/15/2021", party: "Party B", amount: 5000, cycle: "2021 Bye-election" },
    ],
    partyBreakdown: [
      { name: donorData.party, total: donorData.amount },
      { name: "Party A", total: 12000 },
      { name: "Party C", total: 3500 },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      <div className="max-w-7xl mx-auto p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-4xl font-bold text-slate-900">{donorData.donor}</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline mb-1"
          >
            ← Back to Search
          </button>
        </div>

        {/* 1. TOP STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <InfoCard title="Total Amount Donated" value={`₹${donorData.amount.toLocaleString("en-IN")}`} />
          <InfoCard title="Number of Donations" value={dashboardData.donationCount} />
          <InfoCard title="Parties Supported" value={dashboardData.partiesSupported} />
          <InfoCard title="Active Years" value={dashboardData.activeYears} />
        </div>

        {/* 2. CHART SECTION */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Contributions Over Time</h3>
          
          {/* Custom CSS Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 px-4 pb-2 border-b border-slate-200">
            {/* Y-Axis Labels (Visual only) */}

            <Bar year="2016" height="h-10" amount="₹5k" />
            <Bar year="2017" height="h-16" amount="₹12k" />
            <Bar year="2018" height="h-32" amount="₹25k" />
            <Bar year="2019" height="h-48" amount="₹38k" bg="bg-blue-300" />
            <Bar year="2020" height="h-24" amount="₹18k" />
            <Bar year="2021" height="h-12" amount="₹8k" />
            <Bar year="2022" height="h-20" amount="₹15k" />
            <Bar year="2023" height="h-40" amount="₹32k" />
            <Bar year="2024" height="h-56" amount={`₹${(donorData.amount/1000).toFixed(0)}k`} bg="bg-blue-600" />
          </div>
        </div>

        {/* 3. BOTTOM TABLES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Table: Party Contributions */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-50/50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Party Contributions</h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Party Name</th>
                  <th className="px-6 py-3 text-right">Total Donated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dashboardData.partyBreakdown.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-700">{item.name}</td>
                    <td className="px-6 py-3 text-right text-slate-600">₹{item.total.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Table: Donation History */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-50/50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Donation History</h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Party</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Election Cycle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dashboardData.history.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-500">{row.date}</td>
                    <td className="px-6 py-3 font-medium text-slate-700">{row.party}</td>
                    <td className="px-6 py-3 text-slate-600">₹{row.amount.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-3 text-slate-500">{row.cycle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function InfoCard({ title, value }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Bar({ year, height, amount, bg = "bg-blue-200" }) {
  return (
    <div className="flex flex-col items-center flex-1 group">
      {/* Tooltip Effect */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
        {amount}
      </div>
      {/* The Bar */}
      <div className={`w-full max-w-[60px] ${height} ${bg} rounded-t-sm hover:bg-blue-400 transition-colors`}></div>
      {/* Label */}
      <span className="mt-3 text-xs font-medium text-slate-500">{year}</span>
    </div>
  );
}