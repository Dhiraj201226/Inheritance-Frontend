import React from "react";
import { CircleDollarSign, ArrowLeft, Calendar, FileText } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; // Use navigate for the back button

export default function DonorProfile() {
  const navigate = useNavigate();

  // --- DATA ---
  // In a real app, you might get this from useLocation() or an API call
  const donorData = {
    donor: "John Smith",
    party: "Multiple Parties",
    amount: 85200,
    date: "2021-03-15",
  };

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
    // --- LAYOUT FIX: Standard Page Flow (No more fixed/overlay) ---
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* Optional: Simple Navbar or Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-600 w-fit" onClick={() => navigate("/")}>
           <ArrowLeft size={18} /> 
           <span className="font-medium">Back to Home</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{donorData.donor}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Verified Donor</span>
              <span className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                <FileText size={14} /> ID: #{Math.floor(Math.random() * 100000)}
              </span>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-emerald-100 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95">
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-12 transition-transform">
              <CircleDollarSign size={22} />
            </div>
            Make a New Donation
          </button>
        </div>

        {/* --- 1. KEY STATS (Grid Layout) --- */}
        {/* This grid ensures cards sit side-by-side, not one above another */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard title="Total Donated" value={`₹${donorData.amount.toLocaleString("en-IN")}`} color="blue" />
          <InfoCard title="Donation Count" value={dashboardData.donationCount} color="indigo" />
          <InfoCard title="Parties Supported" value={dashboardData.partiesSupported} color="purple" />
          <InfoCard title="Active Years" value={dashboardData.activeYears} color="slate" />
        </div>

        {/* --- 2. CHART SECTION --- */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar size={18} className="text-slate-400" /> Contributions Timeline
              </h3>
              <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 10 Years</option>
                  <option>Last 5 Years</option>
              </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2 pb-2 border-b border-slate-100">
            <Bar year="2016" height="h-10" amount="5k" />
            <Bar year="2017" height="h-16" amount="12k" />
            <Bar year="2018" height="h-32" amount="25k" />
            <Bar year="2019" height="h-48" amount="38k" bg="bg-blue-400" />
            <Bar year="2020" height="h-24" amount="18k" />
            <Bar year="2021" height="h-12" amount="8k" />
            <Bar year="2022" height="h-20" amount="15k" />
            <Bar year="2023" height="h-40" amount="32k" />
            <Bar year="2024" height="h-56" amount={`${(donorData.amount/1000).toFixed(0)}k`} bg="bg-blue-600" />
          </div>
        </div>

        {/* --- 3. DETAILED TABLES (Side-by-Side Grid) --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Table Left */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Party Breakdown</h3>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white border px-2 py-1 rounded">Top 3</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                      <tr><th className="px-6 py-3">Party Name</th><th className="px-6 py-3 text-right">Amount</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                  {dashboardData.partyBreakdown.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                          <td className="px-6 py-4 text-right font-mono text-slate-600">₹{item.total.toLocaleString("en-IN")}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>

          {/* Table Right */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent History</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View Full Log</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                      <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Party</th><th className="px-6 py-3 text-right">Amount</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                  {dashboardData.history.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-slate-500">{row.date}</td>
                          <td className="px-6 py-4 font-medium text-slate-700">{row.party}</td>
                          <td className="px-6 py-4 text-right font-bold text-emerald-600">₹{row.amount.toLocaleString("en-IN")}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function InfoCard({ title, value, color }) { 
    const colors = {
        blue: "bg-blue-50 border-blue-100 text-blue-900",
        indigo: "bg-indigo-50 border-indigo-100 text-indigo-900",
        purple: "bg-purple-50 border-purple-100 text-purple-900",
        slate: "bg-slate-100 border-slate-200 text-slate-900",
    };
    
    return (
        <div className={`${colors[color] || colors.slate} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">{title}</p>
            <p className="text-3xl font-extrabold">{value}</p>
        </div>
    ); 
}

function Bar({ year, height, amount, bg = "bg-slate-200" }) { 
    return (
        <div className="flex flex-col items-center flex-1 group relative cursor-pointer">
            {/* Floating Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                ₹{amount}
            </div>
            {/* Bar */}
            <div className={`w-full max-w-[40px] sm:max-w-[60px] ${height} ${bg} rounded-t-lg hover:opacity-80 transition-opacity`}></div>
            {/* Label */}
            <span className="mt-3 text-[10px] sm:text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">{year}</span>
        </div>
    ); 
}