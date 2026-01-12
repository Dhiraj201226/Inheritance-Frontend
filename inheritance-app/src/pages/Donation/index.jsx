import React, { useState } from "react";
import { 
  CircleDollarSign, 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Wallet, 
  CheckCircle,
  AlertCircle 
} from "lucide-react"; 
import { useNavigate, useLocation } from "react-router-dom"; 

// Assets (Ensure paths are correct)
import bjp from "../../assets/bjp.png";
import inc from "../../assets/inc.png";
import ss from "../../assets/ss.png";
import ncp from "../../assets/ncp.png";

export default function Donation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // State to toggle between "dashboard" and "donate" views
  const [currentView, setCurrentView] = useState("dashboard");

  // --- 1. DASHBOARD DATA LOGIC ---
  const totalAmount = state?.amount || 85200; 

  const donorData = {
    donor: state?.donor || "John Smith",
    amount: totalAmount,
    date: state?.date || "2024-02-18",
    id: state?.id || "D-10293",
  };

  const formatMoney = (amount) => "₹" + amount.toLocaleString("en-IN");

  // Calculate Exact Amounts (Sum == Total)
  const tx1 = Math.floor(totalAmount * 0.45); // BJP
  const tx2 = Math.floor(totalAmount * 0.25); // INC
  const tx3 = Math.floor(totalAmount * 0.20); // SS
  const tx4 = totalAmount - (tx1 + tx2 + tx3); // NCP

  const historyData = [
    { date: donorData.date, party: "Bharatiya Janata Party", amount: tx1, cycle: "2024 General", logo: bjp },
    { date: "11/05/2023", party: "Indian National Congress", amount: tx2, cycle: "2023 State", logo: inc },
    { date: "07/22/2022", party: "Shiv Sena", amount: tx3, cycle: "2022 Midterm", logo: ss },
    { date: "03/15/2021", party: "Nationalist Congress Party", amount: tx4, cycle: "2021 Bye-election", logo: ncp },
  ];

  // Derived Breakdown
  const partyMap = {};
  historyData.forEach(tx => {
    if (!partyMap[tx.party]) {
        partyMap[tx.party] = { name: tx.party, total: 0, logo: tx.logo };
    }
    partyMap[tx.party].total += tx.amount;
  });
  const partyBreakdown = Object.values(partyMap);

  const dashboardData = {
    donationCount: historyData.length,
    activeYears: "2021 - 2024",
    partiesSupported: partyBreakdown.length,
    history: historyData,
    partyBreakdown: partyBreakdown
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* GLOBAL TOP BAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 mb-8 sticky top-0 z-30 shadow-sm flex justify-between items-center">
        <div 
          className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-600 transition-colors" 
          onClick={() => currentView === "donate" ? setCurrentView("dashboard") : navigate("/")}
        >
           <ArrowLeft size={18} /> 
           <span className="font-medium">
             {currentView === "donate" ? "Back to Dashboard" : "Back to Home"}
           </span>
        </div>
        {currentView === "donate" && <span className="text-sm font-bold text-slate-400">SECURE DONATION CHANNEL</span>}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in-up">
        
        {/* --- VIEW SWITCHER --- */}
        {currentView === "dashboard" ? (
          /* ================= DASHBOARD VIEW ================= */
          <>
            {/* Header */}
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

              <button 
                onClick={() => setCurrentView("donate")}
                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-emerald-100 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <div className="bg-white/20 p-1 rounded-full group-hover:rotate-12 transition-transform">
                  <CircleDollarSign size={22} />
                </div>
                Make a New Donation
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard title="Total Donated" value={formatMoney(donorData.amount)} color="blue" />
              <InfoCard title="Donation Count" value={dashboardData.donationCount} color="indigo" />
              <InfoCard title="Parties Supported" value={dashboardData.partiesSupported} color="purple" />
              <InfoCard title="Active Years" value={dashboardData.activeYears} color="slate" />
            </div>

            {/* Charts */}
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
                <Bar year="2019" height="h-24" amount={formatMoney(Math.floor(totalAmount * 0.1))} />
                <Bar year="2020" height="h-32" amount={formatMoney(Math.floor(totalAmount * 0.15))} />
                <Bar year="2021" height="h-28" amount={formatMoney(tx4)} />
                <Bar year="2022" height="h-28" amount={formatMoney(tx3)} />
                <Bar year="2023" height="h-48" amount={formatMoney(tx2)} bg="bg-blue-400" />
                <Bar year="2024" height="h-56" amount={formatMoney(tx1)} bg="bg-blue-600" />
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Party Breakdown */}
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

              {/* History */}
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
          </>
        ) : (
          /* ================= DONATION FORM VIEW ================= */
          <DonationFormView onCancel={() => setCurrentView("dashboard")} />
        )}

      </div>
    </div>
  );
}

/* ================== SUB-COMPONENT: DONATION FORM ================== */
function DonationFormView({ onCancel }) {
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState(0); // Default 0 to force user input
  
  // The 4 specific parties requested
  const PARTIES = [
    "Bharatiya Janata Party", 
    "Indian National Congress", 
    "Shiv Sena", 
    "Nationalist Congress Party"
  ];
  
  const PRESET_AMOUNTS = [500, 1000, 5000, 10000];

  // Validation Check
  const isFormValid = party !== "" && amount > 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-in slide-in-from-right-8 duration-300">
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Donate with Regulated Privacy</h1>
          <p className="text-slate-500 text-sm mt-1">Select a party and amount to contribute securely.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Wallet size={18} /> Connected: 0x12...4A
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: Inputs */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Party Selection (Mandatory) */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Select Political Party <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PARTIES.map((p) => (
                <button
                  key={p}
                  onClick={() => setParty(p)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                    party === p 
                      ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {party === "" && (
              <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Please select a party.
              </p>
            )}
          </div>

          {/* Amount Selection (Mandatory) */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Contribution Amount <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3 mb-4">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    amount === amt
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-emerald-400"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={amount === 0 ? "" : amount}
                placeholder="Enter custom amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono text-lg"
              />
            </div>
            {amount <= 0 && (
              <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Amount must be greater than zero.
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onCancel}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            
            {/* Submit Button - Disabled if invalid */}
            <button
              disabled={!isFormValid}
              onClick={() => {
                alert(`Donation Confirmed ✅\n\nParty: ${party}\nAmount: ₹${amount.toLocaleString("en-IN")}`);
                onCancel();
              }}
              className={`flex-1 py-3 rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2 ${
                isFormValid 
                  ? "bg-slate-900 hover:bg-black text-white cursor-pointer" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm Donation <CheckCircle size={18} />
            </button>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit space-y-6">
          <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-4">Transaction Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Recipient</span>
              <span className={`font-bold ${party ? "text-slate-800" : "text-slate-400 italic"}`}>
                {party || "Select a party"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount</span>
              <span className={`font-bold ${amount > 0 ? "text-slate-800" : "text-slate-400"}`}>
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Processing Fee</span>
              <span className="font-bold text-emerald-600">Free</span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-extrabold text-slate-900">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <p className="text-xs text-blue-800 font-medium mb-1">🔒 Privacy Status: Protected</p>
            <p className="text-[10px] text-blue-600 leading-relaxed">
              Your identity is encrypted on the blockchain. Public disclosure only occurs if donations exceed the legal threshold of ₹20,000.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================== HELPER COMPONENTS (Keep at bottom) ================== */
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