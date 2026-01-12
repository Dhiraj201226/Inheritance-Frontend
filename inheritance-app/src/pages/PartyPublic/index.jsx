import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import StatCard from "../../components/StatCard";

// Photos (Leaders)
import modi from "../../assets/modi.png";
import rahul from "../../assets/rahul.png";
import uddhav from "../../assets/uddhav.png";
import sharad from "../../assets/sharad.png";

// Assets (Logos)
import bjp from "../../assets/bjp.png";
import inc from "../../assets/inc.png";
import ss from "../../assets/ss.png";
import ncp from "../../assets/ncp.png";

const PARTY_DATABASE = [
  {
    id: 1,
    party: "Bharatiya Janata Party",
    logo: bjp,
    leader: "Narendra Modi",
    totalFunds: "₹ 3,10,23,000",
    fundsLeft: "₹ 1,55,23,000",
    fundsSpent: "₹ 1,55,00,000",
    color: "orange",
    photo: modi
  },
  {
    id: 2,
    party: "Indian National Congress",
    logo: inc,
    leader: "Rahul Gandhi",
    totalFunds: "₹ 2,40,10,000",
    fundsLeft: "₹ 90,00,000",
    fundsSpent: "₹ 1,50,10,000",
    color: "blue",
    photo: rahul
  },
  {
    id: 3,
    party: "Shiv Sena",
    logo: ss,
    leader: "Uddhav Thackeray",
    totalFunds: "₹ 1,80,50,000",
    fundsLeft: "₹ 40,20,000",
    fundsSpent: "₹ 1,40,30,000",
    color: "orange",
    photo: uddhav
  },
  {
    id: 4,
    party: "Nationalist Congress Party",
    logo: ncp,
    leader: "Sharad Pawar",
    totalFunds: "₹ 1,20,00,000",
    fundsLeft: "₹ 30,00,000",
    fundsSpent: "₹ 90,00,000",
    color: "blue",
    photo: sharad
  },
];

export default function PartyPublic() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1. Get the party name passed from PublicViewer
  const partyName = state?.party || "Bharatiya Janata Party";

  // 2. Find the specific data for that party
  const partyData = PARTY_DATABASE.find((p) => p.party === partyName) || PARTY_DATABASE[0];

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partyName]);

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Navigation */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="text-xl">←</span>
            <h1 className="font-semibold text-[20px] text-slate-700 hover:text-blue-600 transition">
              Back to List
            </h1>
          </div>
          <div className="flex items-center gap-6 text-[15px]">
            <span className="text-slate-500 font-medium">Public Disclosure</span>
            <button className="bg-blue-100 text text-blue-700 px-4 py-1.5 rounded-lg text-sm font-semibold">
              FY 2024-25
            </button>
          </div>
        </Card>

        {/* Dynamic Party Header Info */}
        <Card className="p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 bg-white border-4 border-slate-100 rounded-2xl flex items-center justify-center shadow-sm p-4">
            <img src={partyData.logo} alt={partyData.party} className="w-full h-full object-contain" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              {partyData.party}
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center">
              
              {/* --- ADDED PHOTO HERE --- */}
              <span className="bg-white text-slate-600 pl-2 pr-4 py-1.5 rounded-full font-medium text-sm border border-slate-200 shadow-sm flex items-center gap-3">
                <img 
                  src={partyData.photo} 
                  alt={partyData.leader} 
                  className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                />
                <span>Chairperson: <span className="text-slate-900 font-bold">{partyData.leader}</span></span>
              </span>
              {/* ------------------------ */}

              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium text-sm border border-green-200">
                Status: Active
              </span>
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm border border-blue-200">
                ID: P-{partyData.id}00{partyData.id}X
              </span>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Funds Declared" value={partyData.totalFunds} />
          <StatCard title="Funds Remaining" value={partyData.fundsLeft} />
          <StatCard title="Total Expenditure" value={partyData.fundsSpent} />
        </div>

        {/* Description */}
        <Card className="p-6 text-slate-600 text-[15px] leading-relaxed border-l-4 border-blue-500">
          This dashboard displays the publicly declared financial data for <strong>{partyData.party}</strong>. 
          All figures are based on the audits submitted to the Election Commission of India for the current fiscal year.
        </Card>

        {/* Charts & Graphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Funding Overview Bar Chart */}
          <Card className="p-6 md:col-span-2">
            <h3 className="font-bold text-slate-700 mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Annual Declarations
            </h3>

            <div className="h-64 flex items-end gap-2 md:gap-4 px-2">
              {[
                { year: '2018', pct: 40 },
                { year: '2019', pct: 35 },
                { year: '2020', pct: 60 },
                { year: '2021', pct: 55 },
                { year: '2022', pct: 70 },
                { year: '2023', pct: 90 },
                { year: '2024', pct: 85 },
              ].map((item, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-3 h-full justify-end group">
                  <div
                    className="w-full rounded-t-lg transition-all duration-300 relative group-hover:opacity-90"
                    style={{ 
                      height: `${item.pct}%`,
                      backgroundColor: partyData.color === 'orange' ? '#f97316' : '#3b82f6' 
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
                      {item.pct} Cr
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{item.year}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Spending Pie Chart */}
          <Card className="p-6 flex flex-col h-full items-center justify-center">
            <h3 className="font-bold text-slate-700 mb-6 w-full text-left">Expense Breakdown</h3>
            
            <div 
              className="w-48 h-48 rounded-full mb-8 relative shadow-inner"
              style={{
                background: `conic-gradient(
                  #ef4444 0% 35.5%,    
                  #3b82f6 35.5% 61.3%, 
                  #22c55e 61.3% 80.7%, 
                  #f97316 80.7% 93.6%, 
                  #a855f7 93.6% 100%   
                )`
              }}
            >
               <div className="absolute inset-10 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                  <span className="text-xs text-slate-400 font-bold uppercase">Total</span>
                  <span className="text-xl font-bold text-slate-800">15.5 Cr</span>
               </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
               <Legend color="bg-red-500" label="Rallies" value="35%" />
               <Legend color="bg-blue-500" label="Ads" value="25%" />
               <Legend color="bg-green-500" label="Logistics" value="20%" />
               <Legend color="bg-orange-500" label="Materials" value="13%" />
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}

// Helper Component
function Legend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-slate-600">{label}</span>
      </div>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}