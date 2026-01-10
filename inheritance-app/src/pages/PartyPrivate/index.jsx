import React from "react";
import Card from "../../components/Card"; // Assuming shared component
import modi from "../../assets/modi.png"; // Assuming shared asset
import lotus from "../../assets/lotus.png"; // Assuming shared asset

export default function PartyPrivate() {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 font-bold text-xl">
              ⚠️
            </span>
            <div>
              <h1 className="font-semibold text-lg text-slate-800">
                Private Console
              </h1>
              <p className="text-xs text-slate-500">Restricted Access • ECI Monitor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              📄 Generate EC1 Report
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Submit Declaration
            </button>
          </div>
        </Card>

        {/* Party Profile Row */}
        <Card className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Party logo circle */}
            <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center p-2 border border-blue-100">
               <img src={lotus} alt="Lotus" className="w-14 h-14" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                BJP (Bharatiya Janata Party)
              </h2>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                   <img src={modi} alt="Modi" className="w-6 h-6 rounded-full" />
                   <span className="text-xs font-semibold text-slate-700">Narendra Modi</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Verified Party Admin
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
             <div className="text-right mr-2">
                <p className="text-xs text-slate-400 font-medium">Last Sync</p>
                <p className="text-sm font-bold text-slate-700">12 mins ago</p>
             </div>
             <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white border shadow-sm hover:text-blue-600">
                🔄
             </button>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (Ledger + Analytics) */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Ledger Card */}
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                    ⛓️ On-Chain Donations Ledger
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time immutable records</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Total Spent</p>
                  <p className="font-bold text-lg text-slate-800 tracking-tight">₹ 1,55,00,000</p>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-200">
                <span className="col-span-1">Wallet ID</span>
                <span className="col-span-1">Tx Hash</span>
                <span className="col-span-1 text-right">Amount</span>
                <span className="col-span-1 text-right">Date</span>
                <span className="col-span-1 text-right">Action</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                {[
                  { wallet: "0x36...4a", hash: "0x70...3g", amount: "₹ 12,50,000", time: "20 May", color: "bg-sky-400" },
                  { wallet: "0x34...c7", hash: "0x22...pz", amount: "₹ 20,00,000", time: "19 May", color: "bg-orange-400" },
                  { wallet: "0x72...48", hash: "0xc3...da", amount: "₹ 15,50,000", time: "18 May", color: "bg-emerald-400" },
                  { wallet: "0x69...02", hash: "0xkC...a9", amount: "₹ 12,50,000", time: "15 May", color: "bg-indigo-400" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors text-xs">
                    <span className="font-mono font-medium text-slate-600 truncate">{row.wallet}</span>
                    <span className="font-mono text-slate-400 truncate">{row.hash}</span>
                    <span className="text-right font-bold text-slate-700">{row.amount}</span>
                    <span className="text-right text-slate-500">{row.time}</span>
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-600 hover:underline font-medium">Verify</button>
                      <span className={`h-2.5 w-2.5 rounded-full ${row.color} shadow-sm`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Expenses / History / Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Expenses Small Card */}
              <Card className="p-4">
                 <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                    💸 Breakdown
                 </h4>
                 <div className="space-y-3">
                    {[
                      ["Rally", "₹ 45L"],
                      ["Ads", "₹ 30L"],
                      ["Logistics", "₹ 35L"],
                      ["Staff", "₹ 45L"],
                    ].map(([label, amt]) => (
                      <div key={label} className="flex items-center justify-between text-xs border-b border-dashed border-slate-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-600">{label}</span>
                        <span className="font-bold text-slate-800">{amt}</span>
                      </div>
                    ))}
                 </div>
              </Card>

              {/* History Timeline */}
              <Card className="p-4">
                <h4 className="font-semibold text-slate-700 text-sm mb-3">📜 Timeline</h4>
                <div className="space-y-4 relative pl-2">
                  {/* Vertical Line */}
                  <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  
                  {[
                     { day: "15", label: "Report Filed", type: "bg-blue-500" },
                     { day: "06", label: "Audit Check", type: "bg-slate-300" },
                     { day: "03", label: "Funds In", type: "bg-slate-300" }
                  ].map((item, i) => (
                     <div key={i} className="flex gap-3 relative z-10">
                        <div className={`w-6 h-6 rounded-full ${item.type} text-white text-[10px] flex items-center justify-center font-bold border-2 border-white shadow-sm`}>
                           {item.day}
                        </div>
                        <div>
                           <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                           <p className="text-[10px] text-blue-500 cursor-pointer hover:underline">View PDF</p>
                        </div>
                     </div>
                  ))}
                </div>
              </Card>

              {/* Analytics Placeholder */}
              <Card className="p-4 flex flex-col">
                <h4 className="font-semibold text-slate-700 text-sm mb-2">📊 Trend</h4>
                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center justify-center gap-2">
                   <div className="flex items-end gap-1 h-12">
                      <div className="w-2 bg-slate-300 h-6 rounded-t"></div>
                      <div className="w-2 bg-blue-400 h-10 rounded-t"></div>
                      <div className="w-2 bg-slate-300 h-8 rounded-t"></div>
                      <div className="w-2 bg-slate-300 h-4 rounded-t"></div>
                   </div>
                   <span className="text-[10px] text-slate-400">Live Data</span>
                </div>
              </Card>

            </div>
          </section>

          {/* RIGHT COLUMN (Panels) */}
          <section className="lg:col-span-4 space-y-6">
            
            {/* Compliance Status */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-4 flex items-center justify-between">
                 Compliance Status
                 <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Good</span>
              </h3>
              
              <div className="space-y-3 mb-4">
                {[
                  "Disclosures submitted",
                  "Expenses declared",
                  "Deadline met",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <span className="text-xs font-medium text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-11/12 bg-emerald-500 rounded-full" />
              </div>
              <p className="text-right text-[10px] text-emerald-600 mt-1 font-medium">92% Complete</p>
            </Card>

            {/* Expense Declaration (Donut) */}
            <Card className="p-5">
               <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-slate-700 text-sm">Declaration</h3>
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">₹ 1.55 Cr</span>
               </div>

               <div className="flex flex-col items-center">
                  {/* Conic Gradient Chart */}
                  <div className="relative h-32 w-32 mb-4">
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(#f97316_0_20%,#ef4444_20%_40%,#22c55e_40%_60%,#3b82f6_60%_80%,#6366f1_80%_100%)] shadow-md" />
                    <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                      <span className="text-[10px] text-slate-400 uppercase">Total</span>
                      <span className="font-bold text-sm text-slate-700">155L</span>
                    </div>
                  </div>

                  {/* Legend Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                    {[
                      ["Rally", "bg-orange-500"],
                      ["Ads", "bg-red-500"],
                      ["Logistics", "bg-emerald-500"],
                      ["Materials", "bg-blue-500"],
                      ["Staff", "bg-indigo-500"],
                    ].map(([label, color]) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${color}`} />
                        <span className="text-xs text-slate-600">{label}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </Card>

            {/* Blockchain Verification */}
            <Card className="p-5 bg-slate-800 text-white border-none">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                     🔐 Blockchain
                  </h3>
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
               </div>

               <div className="bg-slate-700/50 rounded-lg p-3 mb-3 border border-slate-600">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                     <span>Current Block</span>
                     <span className="text-white font-mono">#47,412</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-600 rounded-full overflow-hidden">
                     <div className="h-full w-3/4 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
               </div>

               <p className="text-[10px] text-slate-400 mb-1">Smart Contract Address</p>
               <p className="font-mono text-[10px] text-slate-300 bg-slate-900 p-1.5 rounded border border-slate-700 mb-3 truncate">
                  0x71C...93A8
               </p>

               <button className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold transition-colors">
                  Verify Node Status
               </button>
            </Card>

            {/* Submission History */}
            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Recent Submissions</h3>
              <ul className="space-y-3">
                {[
                    { date: "15 Apr", type: "Q1 Filing" },
                    { date: "06 Feb", type: "Ad Hoc" }
                ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📄</span>
                            <div>
                                <p className="font-medium text-slate-700">{item.type}</p>
                                <p className="text-[10px] text-slate-400">PDF Report</p>
                            </div>
                        </div>
                        <span className="text-slate-500 font-medium">{item.date}</span>
                    </li>
                ))}
              </ul>
            </Card>

          </section>
        </div>
      </div>
    </div>
  );
}