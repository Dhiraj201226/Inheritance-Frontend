import React from "react";
import { CircleDollarSign, ArrowLeft, Calendar, FileText } from "lucide-react"; 
import { useNavigate, useLocation } from "react-router-dom"; 
// import { Link } from "react-router-dom"; // Link is no longer needed since we use navigate
import bjp from "../../assets/bjp.png";
import inc from "../../assets/inc.png";
import ss from "../../assets/ss.png";
import ncp from "../../assets/ncp.png";

export default function DonorProfile() {
  const navigate = useNavigate();
  const { state } = useLocation(); 

  // --- 1. TOTAL AMOUNT SOURCE ---
  const totalAmount = state?.amount || 85200; // Source of Truth

  const donorData = {
    donor: state?.donor || "John Smith",
    party: state?.party || "Multiple Parties",
    amount: totalAmount, 
    date: state?.date || "2024-02-18",
    id: state?.id || "D-10293",
  };

  const formatMoney = (amount) => "₹" + amount.toLocaleString("en-IN");

  // --- 2. CALCULATE EXACT HISTORY AMOUNTS (Sum == Total) ---
  // We calculate specific amounts so they sum up exactly to totalAmount
  const tx1 = Math.floor(totalAmount * 0.45); // 45% -> BJP
  const tx2 = Math.floor(totalAmount * 0.25); // 25% -> INC
  const tx3 = Math.floor(totalAmount * 0.20); // 20% -> SS
  const tx4 = totalAmount - (tx1 + tx2 + tx3); // Remainder -> NCP (Ensures Sum = Total)

  const historyData = [
    { date: donorData.date, party: "Bharatiya Janata Party", amount: tx1, cycle: "2024 General", logo: bjp },
    { date: "11/05/2023", party: "Indian National Congress", amount: tx2, cycle: "2023 State", logo: inc },
    { date: "07/22/2022", party: "Shiv Sena", amount: tx3, cycle: "2022 Midterm", logo: ss },
    { date: "03/15/2021", party: "Nationalist Congress Party", amount: tx4, cycle: "2021 Bye-election", logo: ncp },
  ];

  // --- 3. CALCULATE PARTY BREAKDOWN FROM HISTORY (Derived Data) ---
  // This ensures the breakdown table matches the history table 100%
  const partyMap = {};
  historyData.forEach(tx => {
    if (!partyMap[tx.party]) {
        partyMap[tx.party] = { name: tx.party, total: 0, logo: tx.logo };
    }
    partyMap[tx.party].total += tx.amount;
  });
  const partyBreakdown = Object.values(partyMap);


  const dashboardData = {
    donationCount: historyData.length, // Or calculate based on real data length
    activeYears: "2021 - 2024",
    partiesSupported: partyBreakdown.length,
    history: historyData,
    partyBreakdown: partyBreakdown
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 mb-8 sticky top-0 z-30 shadow-sm">
        {/* Changed onClick handler to navigate specifically to /PublicViewer */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-600 w-fit" onClick={() => navigate("/PublicViewer")}>
           <ArrowLeft size={18} /> 
           <span className="font-medium">Back to List</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in-up">
        
        {/* --- HEADER --- */}
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
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard title="Total Donated" value={formatMoney(donorData.amount)} color="blue" />
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
              <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none">
                  <option>Last 5 Years</option>
              </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2 pb-2 border-b border-slate-100">
            {/* Bars are now purely visual proportions of the calculated amounts */}
            <Bar year="2019" height="h-24" amount={formatMoney(Math.floor(totalAmount * 0.1))} bg="bg-blue-400" />
            <Bar year="2020" height="h-32" amount={formatMoney(Math.floor(totalAmount * 0.15))} bg="bg-blue-400" />
            <Bar year="2021" height="h-28" amount={formatMoney(tx4)} bg="bg-blue-400"/> {/* NCP Amount */}
            <Bar year="2022" height="h-28" amount={formatMoney(tx3)} bg="bg-blue-400"/> {/* SS Amount */}
            <Bar year="2023" height="h-48" amount={formatMoney(tx2)} bg="bg-blue-400" /> {/* INC Amount */}
            <Bar year="2024" height="h-56" amount={formatMoney(tx1)} bg="bg-blue-400" /> {/* BJP Amount */}
          </div>
        </div>

        {/* --- 3. DYNAMIC TABLES --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Party Breakdown Table (Derived from History) */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Party Breakdown</h3>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white border px-2 py-1 rounded">Summary</span>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                    <tr><th className="px-6 py-3">Party</th><th className="px-6 py-3 text-right">Total Amount</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {dashboardData.partyBreakdown.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-3">
                            <img src={item.logo} alt="" className="w-8 h-8 rounded-full border border-gray-100 object-cover" />
                            {item.name}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-slate-600 font-bold">{formatMoney(item.total)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>

          {/* History Table (The sum of these equals Total Donated) */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent History</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View Full Log</button>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                    <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Party</th><th className="px-6 py-3 text-right">Amount</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {dashboardData.history.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-500">{row.date}</td>
                        <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-2">
                            <img src={row.logo} alt="" className="w-5 h-5 rounded-full object-cover opacity-80" />
                            {row.party}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-600">{formatMoney(row.amount)}</td>
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
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                {amount}
            </div>
            <div className={`w-full max-w-[40px] sm:max-w-[60px] ${height} ${bg} rounded-t-lg hover:opacity-80 transition-opacity`}></div>
            <span className="mt-3 text-[10px] sm:text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">{year}</span>
        </div>
    ); 
}