import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  ChevronDown, 
  User, 
  LayoutDashboard,
  FileText,
  AlertCircle,
  ChevronRight,
  Banknote,
  Filter
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

import bjp from '../../assets/bjp.png';
import congress from '../../assets/inc.png';
import ss from '../../assets/ss.png';
import ncp from '../../assets/ncp.png';

export default function Admin() {
  const [search, setSearch] = useState("");
  const [amountFilter, setAmountFilter] = useState("all"); 
  const [complaintFilter, setComplaintFilter] = useState("All"); 
  const navigate = useNavigate();

  const allTransactions = [
    { id: "BJP-14572C", color: "bg-orange-500", donor: "Rakesh Verma", date: "18 Feb 2024", amount: "2,20,000", rawAmount: 220000, party: "Bharatiya Janata Party", logo: bjp },
      { id: "INC-56342P", color: "bg-blue-500", donor: "Smita Joshi", date: "12 Feb 2024", amount: "1,20,000", rawAmount: 120000, party: "Indian National Congress", logo: congress },
      { id: "SS-786343Z", color: "bg-orange-800", donor: "Vijay Sharma", date: "08 Feb 2024", amount: "1,43,000", rawAmount: 143000, party: "Shiv Sena", logo: ss },
      { id: "BJP-98235F", color: "bg-orange-500", donor: "Sunil Deshpande", date: "09 Feb 2024", amount: "97,000", rawAmount: 97000, party: "Bharatiya Janata Party", logo: bjp },
      { id: "NCP-42790D", color: "bg-blue-800", donor: "Rahul Mishra", date: "02 Feb 2024", amount: "90,000", rawAmount: 90000, party: "Nationalist Congress Party", logo: ncp },
    { id: "INC-11223X", color: "bg-blue-500", donor: "Ankit Roy", date: "20 Feb 2024", amount: "15,000", rawAmount: 15000, party: "Indian National Congress", logo: congress },
    { id: "BJP-33445Y", color: "bg-orange-500", donor: "Meera Das", date: "19 Feb 2024", amount: "5,000", rawAmount: 5000, party: "Bharatiya Janata Party", logo: bjp },
  ];

 const complaintsData = [
    { id: "C-101", party: "Bharatiya Janata Party", issue: "Mismatch in Rally Expense Report (Mumbai)", severity: "High", date: "19 Feb" },
    { id: "C-102", party: "Shiv Sena", issue: "Anonymous Donation > 20k Detected", severity: "Critical", date: "18 Feb" },
    { id: "C-103", party: "Indian National Congress", issue: "Late Filing of Form 24A", severity: "Medium", date: "15 Feb" },
    { id: "C-104", party: "Nationalist Congress Party", issue: "Unverified Vendor Payment (Cash)", severity: "High", date: "14 Feb" },
    { id: "C-105", party: "Bharatiya Janata Party", issue: "Cash Deposit Limit Exceeded", severity: "Medium", date: "12 Feb" },
    { id: "C-106", party: "Shiv Sena", issue: "Discrepancy in FCRA Declaration", severity: "Critical", date: "10 Feb" },
  ];

  // --- FILTERS ---
  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch = 
      tx.donor.toLowerCase().includes(search.toLowerCase()) || 
      tx.id.toLowerCase().includes(search.toLowerCase()) ||
      tx.party.toLowerCase().includes(search.toLowerCase());

    let matchesAmount = true;
    if (amountFilter === 'below20k') matchesAmount = tx.rawAmount < 20000;
    else if (amountFilter === 'above20k') matchesAmount = tx.rawAmount >= 20000;

    return matchesSearch && matchesAmount;
  });

  const filteredComplaints = complaintFilter === "All" 
    ? complaintsData 
    : complaintsData.filter(c => c.party === complaintFilter);

  // --- HANDLERS ---
  const handlePartyClick = (partyName) => {
    navigate("/PartyPublic", { state: { party: partyName } });
  };

  const handleDonorClick = (tx) => {
    navigate(`/donor/${tx.id}`, { 
      state: { 
        donor: tx.donor, 
        party: tx.party, 
        amount: tx.rawAmount, 
        date: tx.date 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      
      {/* --- TOP NAV BAR --- */}
      <nav className="bg-[#0056D2] text-white px-6 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">Political Donations</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-lg text-sm hover:bg-white/20 transition">
            <Search className="w-4 h-4" /> Viewer
          </button>
          <button className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-lg text-sm hover:bg-white/20 transition">
            <AlertCircle className="w-4 h-4" /> Suspicious Activity
          </button>
          <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
            <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-blue-800">
              <User size={18} />
            </div>
            <ChevronDown size={14} className="opacity-70" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mt-12 mb-10">
          <h2 className="text-4xl font-extrabold text-[#002B5B]">Election Commission Admin Dashboard</h2>
          <p className="text-gray-500 mt-2 text-lg">View all political donations and spending declared by parties</p>
        </div>

        {/* --- SEARCH BOX --- */}
         <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Party (e.g. BJP), ID, or Donor Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold shadow-md transition-colors">
            Search
          </button>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 text-gray-600 font-semibold mb-3">
              <ShieldCheck className="text-emerald-500 w-5 h-5" /> Total Donations
            </div>
            <div className="text-3xl font-bold">₹ 17.60 Cr</div>
            <p className="text-xs text-gray-400 mt-2 uppercase">Since April 2022</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 text-gray-600 font-semibold mb-3">
              <Users className="text-blue-500 w-5 h-5" /> Verified Donors
            </div>
            <div className="text-3xl font-bold text-gray-800">35,830</div>
            <p className="text-xs text-gray-400 mt-2 uppercase">Unique Donors</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-2 text-gray-600 font-semibold mb-3">
              <Banknote className="text-purple-500 w-5 h-5" /> Donors &gt; ₹20k
            </div>
            <div className="text-3xl font-bold text-gray-800">12,405</div>
            <p className="text-xs text-gray-400 mt-2 uppercase">High Value Contributors</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-2 text-gray-600 font-semibold mb-3">
              <AlertTriangle className="text-orange-500 w-5 h-5" /> Suspicious Activity
            </div>
            <div className="text-3xl font-bold flex items-center gap-2">
              6 Flagged <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded">✔</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 uppercase">Flagged Transactions</p>
          </div>
        </div>

        {/* --- MAIN DASHBOARD CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* UNIFIED TRANSACTIONS TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">All Transactions</h3>
                <div className="flex gap-2">
                  <select 
                    className="text-xs border rounded-md px-2 py-1 bg-gray-50 outline-none focus:border-blue-500"
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                  >
                    <option value="all">All Amounts</option>
                    <option value="below20k">Below ₹20k</option>
                    <option value="above20k">Above ₹20k</option>
                  </select>
                  <select className="text-xs border rounded-md px-2 py-1 bg-green-50 outline-none">
                    <option>Sort Highest</option>
                    <option>Sort Newest</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 font-bold">
                    <tr>
                      <th className="px-6 py-4 text-[14px]">Party Logo</th>
                      <th className="px-6 py-4 text-[14px]">Transaction ID</th>
                      <th className="px-6 py-4 text-[14px]">PAN Number</th>
                      <th className="px-6 py-4 text-[14px]">Donor</th>
                      <th className="px-6 py-4 text-[14px]">Date</th>
                      <th className="px-6 py-4 text-[14px] text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((tx, i) => (
                        <tr key={i} className="text-sm hover:bg-gray-50/50 transition-colors">
                          
                          {/* CLICKABLE PARTY LOGO CELL */}
                          <td 
                            className="px-6 py-4 flex items-center gap-2 font-bold text-gray-700 cursor-pointer hover:bg-blue-50 transition-colors rounded-l-md"
                            onClick={() => handlePartyClick(tx.party)}
                            title={`View Public Page for ${tx.party}`}
                          >
                            <img src={tx.logo} alt="logo" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                          </td>

                          <td className="px-6 py-4 font-mono text-gray-900 font-medium text-[15px]">
                             {tx.id}
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-300 text-[15px]">XXXXX{i+100}A</td>
                          
                           <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/DonorProfile`, { state: tx })
                      }
                      className="text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50"
                    >
                      {tx.donor}
                    </button>
                  </td>

                          <td className="px-6 py-4 text-gray-900 text-[15px]">{tx.date}</td>
                          <td className={`px-6 py-4 text-right font-bold text-[15px]${tx.rawAmount >= 20000 ? 'text-gray-800' : 'text-emerald-600'}`}>
                            ₹ {tx.amount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No transactions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50/50 flex justify-between items-center border-t">
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded bg-blue-100 text-blue-600 text-xs font-bold">1</button>
                  <button className="w-8 h-8 rounded border text-xs text-gray-400">2</button>
                </div>
                <div className="text-sm font-semibold text-gray-500">Showing {filteredTransactions.length} Records</div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <div className="space-y-6">
            
            {/* 1. FLAGGED ISSUES LOG */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-[19px]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" /> Flagged Issues Log
                </h4>
                <div className="relative text-[13px]">
                  <select 
                    className="appearance-none bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium py-1 pl-2 pr-6 rounded-md outline-none focus:border-blue-500 cursor-pointer text-[16px]"
                    value={complaintFilter}
                    onChange={(e) => setComplaintFilter(e.target.value)}
                  >
                    <option value="All">All Parties</option>
                    <option value="Bharatiya Janata Party">BJP</option>
                    <option value="Indian National Congress">INC</option>
                    <option value="Shiv Sena">SS</option>
                    <option value="Nationalist Congress Party">NCP</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {filteredComplaints.length > 0 ? filteredComplaints.map((item, index) => (
                  <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.severity === "Critical" ? "bg-red-100 text-red-700" :
                        item.severity === "High" ? "bg-orange-100 text-orange-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.severity} Priority
                      </span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-1">{item.party}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.issue}</p>
                    <div className="mt-2 flex justify-between items-center border-t border-slate-200 pt-2">
                        <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                        <button className="text-[10px] font-semibold text-blue-600 hover:underline">Investigate →</button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-xs text-slate-400 italic">
                    No flagged issues found.
                  </div>
                )}
              </div>
              <button className="w-full mt-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                View All Complaints Database
              </button>
            </div>

            {/* 2. SPENDING PIE CHART */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-700 mb-6">Spending Declarations</h4>
              <div className="relative w-40 h-40 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#E2E8F0" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#0070FF" strokeWidth="4" strokeDasharray="33 100" strokeDashoffset="0"></circle>
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF9D00" strokeWidth="4" strokeDasharray="40 100" strokeDashoffset="-33"></circle>
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="21 100" strokeDashoffset="-73"></circle>
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#EF4444" strokeWidth="4" strokeDasharray="6 100" strokeDashoffset="-94"></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-xl font-bold">100%</div>
                  <div className="text-[8px] text-gray-400 uppercase">Total Spend</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-500">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF9D00]"></span> Ads 40%</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0070FF]"></span> Travel 33%</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Staff 21%</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Misc 6%</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};