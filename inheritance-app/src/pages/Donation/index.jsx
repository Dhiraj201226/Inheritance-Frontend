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
import { ConnectButton } from "@rainbow-me/rainbowkit"; 
import { useAccount } from "wagmi"; 
import { useNavigate, useLocation } from "react-router-dom"; 

// Assets 
import bjp from "../../assets/bjp.png";
import inc from "../../assets/inc.png";
import ss from "../../assets/ss.png";
import ncp from "../../assets/ncp.png";

export default function Donation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isConnected, address } = useAccount();
  const [currentView, setCurrentView] = useState("dashboard");

  // --- DASHBOARD DATA ---
  const totalAmount = state?.amount || 85200; 
  const donorData = {
    donor: state?.donor || "John Smith",
    amount: totalAmount,
    date: state?.date || "2024-02-18",
    id: state?.id || "D-10293",
  };

  const formatMoney = (amount) => "₹" + amount.toLocaleString("en-IN");

  const tx1 = Math.floor(totalAmount * 0.45); 
  const tx2 = Math.floor(totalAmount * 0.25); 
  const tx3 = Math.floor(totalAmount * 0.20); 
  const tx4 = totalAmount - (tx1 + tx2 + tx3); 

  const historyData = [
    { date: donorData.date, party: "Bharatiya Janata Party", amount: tx1, cycle: "2024 General", logo: bjp },
    { date: "11/05/2023", party: "Indian National Congress", amount: tx2, cycle: "2023 State", logo: inc },
    { date: "07/22/2022", party: "Shiv Sena", amount: tx3, cycle: "2022 Midterm", logo: ss },
    { date: "03/15/2021", party: "Nationalist Congress Party", amount: tx4, cycle: "2021 Bye-election", logo: ncp },
  ];

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

  const handleDonateClick = () => {
    if (isConnected) {
      setCurrentView("donate");
    } else {
      alert("⚠️ Please connect your wallet first to make a donation.");
    }
  };

  // --- SHARED BUTTON STYLES ---
  // We define this once so both buttons use the EXACT same classes
  const commonBtnStyles = "h-[56px] px-6 rounded-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3";
  
  // Specific colors
  const donateBtnColor = isConnected 
    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100" 
    : "bg-slate-200 text-slate-500 cursor-not-allowed";

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* GLOBAL TOP BAR */}
      <div 
        className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-600 transition-colors p-4" 
        onClick={() => currentView === "donate" ? setCurrentView("dashboard") : navigate("/")}>
        <ArrowLeft size={18} /> 
        <span className="font-medium">
          {currentView === "donate" ? "Back to Dashboard" : "Back to Home"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in-up">
        
        {currentView === "dashboard" ? (
          <>
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

              <div className="flex flex-col sm:flex-row gap-4">
                 
                 {/* 1. DONATE BUTTON (Using common styles) */}
                 <button 
                  onClick={handleDonateClick}
                  className={`${commonBtnStyles} ${donateBtnColor}`}
                >
                  <div className={`p-1 rounded-full transition-transform ${isConnected ? "bg-white/20 group-hover:rotate-12" : ""}`}>
                    <CircleDollarSign size={22} />
                  </div>
                  Make a New Donation
                </button>

                {/* 2. CUSTOM CONNECT BUTTON (Matches Donation Button Size) */}
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button onClick={openConnectModal} className={`${commonBtnStyles} bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100`}>
                                <Wallet size={22} />
                                Connect Wallet
                              </button>
                            );
                          }
                          return (
                            <button onClick={openAccountModal} className={`${commonBtnStyles} bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200`}>
                               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                               {account.displayName}
                            </button>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>

              </div>
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
                <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2 pb-2 border-b border-slate-100">
                    <Bar year="2020" height="h-32" amount={formatMoney(Math.floor(totalAmount * 0.15))} />
                    <Bar year="2021" height="h-28" amount={formatMoney(tx4)} />
                    <Bar year="2022" height="h-28" amount={formatMoney(tx3)} />
                    <Bar year="2023" height="h-48" amount={formatMoney(tx2)} bg="bg-blue-400" />
                    <Bar year="2024" height="h-56" amount={formatMoney(tx1)} bg="bg-blue-600" />
                </div>
            </div>

          </>
        ) : (
          <DonationFormView 
            onCancel={() => setCurrentView("dashboard")} 
            walletAddress={address} 
          />
        )}
      </div>
    </div>
  );
}

// ... SUB-COMPONENTS (DonationFormView, InfoCard, Bar) REMAIN SAME ...
function DonationFormView({ onCancel, walletAddress }) { 
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState(0); 
  const PARTIES = ["Bharatiya Janata Party", "Indian National Congress", "Shiv Sena", "Nationalist Congress Party"];
  const PRESET_AMOUNTS = [500, 1000, 5000, 10000];
  const isFormValid = party !== "" && amount > 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-in slide-in-from-right-8 duration-300">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Donate with Regulated Privacy</h1>
          <p className="text-slate-500 text-sm mt-1">Select a party and amount to contribute securely.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Wallet size={18} /> 
          {walletAddress ? `Connected: ${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "Wallet Not Connected"}
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <div className="md:col-span-2 space-y-8">
           <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Select Political Party *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PARTIES.map((p) => (
                <button key={p} onClick={() => setParty(p)} className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${party === p ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}>
                  {p}
                </button>
              ))}
            </div>
           </div>
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-3">Amount *</label>
             <div className="flex flex-wrap gap-3 mb-4">
               {PRESET_AMOUNTS.map((amt) => (
                 <button key={amt} onClick={() => setAmount(amt)} className={`px-5 py-2.5 rounded-lg border text-sm font-medium ${amount === amt ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-600"}`}>
                   ₹{amt}
                 </button>
               ))}
             </div>
             <input type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border border-slate-300 rounded-xl py-3 px-4 font-mono text-lg" placeholder="Enter custom amount" />
           </div>
           <div className="flex gap-4 pt-4">
             <button onClick={onCancel} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
             <button
               disabled={!isFormValid}
               onClick={() => { alert(`Donation Confirmed ✅\n\nParty: ${party}\nAmount: ₹${amount}`); onCancel(); }}
               className={`flex-1 py-3 rounded-xl font-bold text-white flex justify-center items-center gap-2 ${isFormValid ? "bg-slate-900 hover:bg-black" : "bg-slate-200 cursor-not-allowed"}`}
             >
               Confirm Donation <CheckCircle size={18} />
             </button>
           </div>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit space-y-6">
           <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-4">Transaction Summary</h3>
           <div className="space-y-4 text-sm">
             <div className="flex justify-between"><span className="text-slate-500">Recipient</span><span className="font-bold">{party || "-"}</span></div>
             <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold">₹{amount}</span></div>
             <div className="flex justify-between border-t pt-4"><span className="font-bold">Total</span><span className="text-xl font-extrabold">₹{amount}</span></div>
           </div>
         </div>
       </div>
    </div>
  );
}

function InfoCard({ title, value, color }) { return <div className={`bg-${color}-50 border border-${color}-100 p-6 rounded-2xl`}><p className="text-xs font-bold opacity-70 mb-2">{title}</p><p className="text-3xl font-extrabold">{value}</p></div>; }
function Bar({ year, height, amount, bg = "bg-slate-200" }) { return <div className={`flex-1 ${height} ${bg} rounded-t-lg mx-1`}></div>; }