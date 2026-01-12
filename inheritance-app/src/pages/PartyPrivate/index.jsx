import React, { useState, useMemo, useEffect } from "react";
import Card from "../../components/Card"; 
import StatCard from "../../components/StatCard"; 
import modi from "../../assets/modi.png"; 
import bjp from "../../assets/bjp.png"; 

export default function PartyPrivate() {
  // --- STATE 1: UI LOADING STATES ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // --- STATE 2: MODALS (EXPENSE & BUDGET) ---
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false); // <--- NEW STATE

  // --- STATE 3: PIE CHART INTERACTION ---
  const [hoveredSlice, setHoveredSlice] = useState(null);
  
  // --- STATE 4: EXPENSE DATA ---
  const [newExpense, setNewExpense] = useState({
    category: "Logistics", desc: "", amount: "", date: new Date().toISOString().split('T')[0]
  });

  const [expenseList, setExpenseList] = useState(() => {
    const savedExpenses = localStorage.getItem("party_expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [
      { category: "Rally", desc: "Sound Stage - Mumbai", date: "21 May 2024", amount: "₹ 55,00,000", status: "Paid" },
      { category: "Ads", desc: "Facebook Campaign #4", date: "20 May 2024", amount: "₹ 40,00,000", status: "Paid" },
      { category: "Logistics", desc: "Bus Fleet Rental", date: "18 May 2024", amount: "₹ 30,00,000", status: "Pending" },
      { category: "Materials", desc: "Party Flags & Caps", date: "15 May 2024", amount: "₹ 20,00,000", status: "Paid" },
      { category: "Staff", desc: "Volunteer Stipends", date: "10 May 2024", amount: "₹ 10,00,000", status: "Paid" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("party_expenses", JSON.stringify(expenseList));
  }, [expenseList]);

  // --- STATE 5: TRANSACTIONS ---
  const [verifyingId, setVerifyingId] = useState(null);
  const [transactions, setTransactions] = useState(() => {
    const savedTx = localStorage.getItem("party_transactions");
    return savedTx ? JSON.parse(savedTx) : [
      { id: 1, name: "Adani Enterprises", date: "20 May 2024", amount: "₹ 24,00,000", status: "Verified" },
      { id: 2, name: "Reliance Industries", date: "18 May 2024", amount: "₹ 60,00,000", status: "Verified" },
      { id: 3, name: "Tata Sons Pvt Ltd", date: "15 May 2024", amount: "₹ 45,00,000", status: "Pending" },
      { id: 4, name: "Infosys Ltd", date: "10 May 2024", amount: "₹ 45,00,000", status: "Verified" },
      { id: 5, name: "Wipro Group", date: "05 May 2024", amount: "₹ 12,50,000", status: "Pending" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("party_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // --- STATE 6: BLOCKCHAIN LIVENESS ---
  const [currentBlock, setCurrentBlock] = useState(1924412);
  const [isNodeVerifying, setIsNodeVerifying] = useState(false);
  const [nodeStatus, setNodeStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlock((prev) => prev + 1);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  // --- CALCULATIONS ---
  const { expensesChart, totalExpenseValue } = useMemo(() => {
    const categoryTotals = expenseList.reduce((acc, item) => {
        const val = parseFloat(item.amount.replace(/[₹, ]/g, '')) || 0;
        acc[item.category] = (acc[item.category] || 0) + val;
        return acc;
    }, {});

    const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

    const colorMap = {
        Rally: { hex: '#ef4444', tw: 'bg-red-500' },
        Ads: { hex: '#3b82f6', tw: 'bg-blue-500' },
        Logistics: { hex: '#22c55e', tw: 'bg-green-500' },
        Materials: { hex: '#f97316', tw: 'bg-orange-500' },
        Staff: { hex: '#a855f7', tw: 'bg-purple-500' },
        Other: { hex: '#64748b', tw: 'bg-slate-500' }
    };

    const chartData = Object.keys(categoryTotals).map(cat => {
        const catTotal = categoryTotals[cat];
        return {
            label: cat,
            amount: (catTotal / 100000).toFixed(1), 
            color: colorMap[cat]?.hex || colorMap.Other.hex,
            twColor: colorMap[cat]?.tw || colorMap.Other.tw,
            pct: total > 0 ? (catTotal / total) * 100 : 0
        };
    }).sort((a, b) => b.pct - a.pct);

    return { expensesChart: chartData, totalExpenseValue: total };
  }, [expenseList]);

  let cumulativePercent = 0;

  // --- HANDLERS ---
  const handleVerifyTransaction = (id) => {
    setVerifyingId(id);
    setTimeout(() => {
      setTransactions((prev) => 
        prev.map((tx) => tx.id === id ? { ...tx, status: "Verified" } : tx)
      );
      setVerifyingId(null);
    }, 2000);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const expense = {
        category: newExpense.category,
        desc: newExpense.desc || "Miscellaneous",
        date: newExpense.date,
        amount: `₹ ${Number(newExpense.amount).toLocaleString('en-IN')}`,
        status: "Pending"
    };
    setExpenseList([expense, ...expenseList]); 
    setIsExpenseModalOpen(false); 
    setNewExpense({ category: "Logistics", desc: "", amount: "", date: "" }); 
  };

  const handleUpdateBudget = (e) => {
    e.preventDefault()
    setIsBudgetModalOpen(false);
    
  };

  const handleResetData = () => {
    if(window.confirm("Are you sure you want to reset all data to default?")) {
        localStorage.removeItem("party_expenses");
        localStorage.removeItem("party_transactions");
        window.location.reload();
    }
  };

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
        setIsGenerating(false);
        alert("Success: Financial_Report_FY24.pdf generated and downloaded.");
    }, 2000);
  };

  const handleUploadToECI = () => {
    setIsUploading(true);
    setTimeout(() => {
        setIsUploading(false);
        alert("Secure Upload: Data has been encrypted and sent to the Election Commission of India (ECI) servers.");
    }, 2500);
  };

  const handleVerifyNode = () => {
    setIsNodeVerifying(true);
    setTimeout(() => {
        setIsNodeVerifying(false);
        setNodeStatus('active');
    }, 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x71C...93A8");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const incomeData = [
    { year: '2019', pct: 35, amount: '70L' },
    { year: '2020', pct: 60, amount: '1.2Cr' },
    { year: '2021', pct: 55, amount: '1.1Cr' },
    { year: '2022', pct: 70, amount: '1.4Cr' },
    { year: '2023', pct: 90, amount: '1.8Cr' },
    { year: '2024', pct: 45, amount: '90L' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 font-bold text-xl">⚠️</span>
            <div>
              <h1 className="font-semibold text-lg text-slate-800">Private Console</h1>
              <p className="text-xs text-slate-500">Restricted Access • ECI Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleResetData} className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors">Reset Data</button>
            <button onClick={handleGeneratePDF} disabled={isGenerating} className={`px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-sm transition-all flex items-center gap-2 ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:bg-slate-50'}`}>
                {isGenerating ? <><span>⚙️</span> Generating...</> : <><span>📄</span> Download PDF</>}
            </button>
            <button onClick={handleUploadToECI} disabled={isUploading} className={`px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 ${isUploading ? 'opacity-80 cursor-wait' : 'hover:bg-indigo-700'}`}>
                {isUploading ? <><span>📡</span> Uploading...</> : <><span>☁️</span> Upload to ECI</>}
            </button>
          </div>
        </Card>

        {/* PROFILE ROW */}
        <Card className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center p-2 border border-blue-100"><img src={bjp} alt="Lotus" className="w-14 h-14" /></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">BJP (Bharatiya Janata Party)</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"><img src={modi} alt="Modi" className="w-6 h-6 rounded-full" /><span className="text-xs font-semibold text-slate-700">Narendra Modi</span></div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-100"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Party Admin</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
             <div className="text-right mr-2"><p className="text-xs text-slate-400 font-medium">Last Sync</p><p className="text-sm font-bold text-slate-700">Just now</p></div>
             <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white border shadow-sm hover:text-blue-600">🔄</button>
          </div>
        </Card>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Income Received" value="₹ 1,55,23,000" trend="+12% vs last month" positive={true} />
          <StatCard title="Income Retrieved" value="₹ 3,10,23,000" trend="Total Lifetime Collection" />
          <StatCard title="Money Spent" value={`₹ ${totalExpenseValue.toLocaleString('en-IN')}`} trend="Current Fiscal Year" warning={true} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 space-y-6">
            <Card className="p-5 flex flex-col h-[29rem]">
                <h3 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">📊 Total Income Trends</h3>
                <div className="flex-1 flex items-end gap-3 px-2">
                    {incomeData.map((item, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-2 group relative h-full justify-end">
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] rounded py-1 px-2 whitespace-nowrap z-10">₹ {item.amount}</div>
                            <div className="bg-blue-400 w-full rounded-t-sm group-hover:bg-blue-600 transition-all duration-300" style={{ height: `${item.pct}%` }} />
                            <span className="text-[10px] text-slate-500 font-medium">{item.year}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div><h3 className="font-semibold text-slate-700 flex items-center gap-2">📋 Recent Incoming Transactions</h3><p className="text-xs text-slate-400 mt-0.5">Verified donor deposits (Live)</p></div>
                <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <span className="col-span-1">Donor Name</span><span className="col-span-1">Date</span><span className="col-span-1 text-right">Amount</span><span className="col-span-1 text-right">Action</span>
              </div>
              <div className="divide-y divide-slate-100">
                {transactions.map((row) => (
                  <div key={row.id} className="grid grid-cols-4 gap-4 px-4 py-3.5 items-center hover:bg-slate-50 transition-colors text-xs">
                    <span className="font-medium text-slate-700">{row.name}</span><span className="text-slate-500">{row.date}</span><span className="text-right font-bold text-slate-700">{row.amount}</span>
                    <div className="text-right flex justify-end">
                        {row.status === 'Verified' ? <span className="px-2 py-0.5 rounded-full text-[10px] border bg-green-50 text-green-700 border-green-200 flex items-center gap-1">✓ Verified</span> : 
                        <button onClick={() => handleVerifyTransaction(row.id)} disabled={verifyingId === row.id} className={`px-3 py-1 rounded text-[10px] font-medium border transition-all ${verifyingId === row.id ? "bg-slate-100 text-slate-400 border-slate-200 cursor-wait" : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:border-blue-300"}`}>{verifyingId === row.id ? "Verifying..." : "Verify Now"}</button>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div><h3 className="font-semibold text-slate-700 flex items-center gap-2">📤 Recent Expenses</h3><p className="text-xs text-slate-400 mt-0.5">Campaign expenditures & Bills</p></div>
                    <button onClick={() => setIsExpenseModalOpen(true)} className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm"><span>+</span> Add Expense</button>
                </div>
                <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <span className="col-span-1">Category</span><span className="col-span-1">Description</span><span className="col-span-1">Date</span><span className="col-span-1 text-right">Amount</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {expenseList.length > 0 ? expenseList.map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3.5 items-center hover:bg-slate-50 transition-colors text-xs">
                            <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${row.category === 'Rally' ? 'bg-red-500' : row.category === 'Ads' ? 'bg-blue-500' : row.category === 'Logistics' ? 'bg-green-500' : row.category === 'Materials' ? 'bg-orange-500' : row.category === 'Staff' ? 'bg-purple-500' : 'bg-slate-400'}`}></span><span className="font-medium text-slate-700">{row.category}</span></div>
                            <span className="text-slate-500 truncate">{row.desc}</span><span className="text-slate-400">{row.date}</span><span className="text-right font-bold text-red-600">{row.amount}</span>
                        </div>
                    )) : <div className="p-4 text-center text-slate-400 text-xs italic">No expenses recorded.</div>}
                </div>
            </Card>
          </section>

          {/* RIGHT COLUMN */}
          <section className="lg:col-span-4 space-y-6">
            <Card className="p-5 flex flex-col h-auto min-h-[500px] text-[15px]">
                <h3 className="font-semibold text-slate-700 mb-4">💸 Expense Distribution</h3>
                {expensesChart.length > 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40 mb-6 group cursor-pointer">
                            <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                                {expensesChart.map((item, i) => {
                                    const offset = cumulativePercent;
                                    cumulativePercent += item.pct;
                                    return <circle key={i} cx="21" cy="21" r="15.915" fill="transparent" stroke={item.color} strokeWidth="5" strokeDasharray={`${item.pct} ${100 - item.pct}`} strokeDashoffset={-offset} onMouseEnter={() => setHoveredSlice(item)} onMouseLeave={() => setHoveredSlice(null)} className="transition-all duration-300 hover:opacity-80 hover:stroke-[6]"/>;
                                })}
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center"><span className="text-xs font-bold text-slate-400 block">{hoveredSlice ? hoveredSlice.label : "Total"}</span><span className={`text-sm font-bold ${hoveredSlice ? 'text-slate-800' : 'text-slate-600'}`}>{hoveredSlice ? `${hoveredSlice.amount} L` : `${(totalExpenseValue / 100000).toFixed(1)} L`}</span></div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2 text-xs">
                            {expensesChart.map((item, i) => (<div key={i} className={`flex items-center gap-2 p-1 rounded ${hoveredSlice?.label === item.label ? 'bg-slate-100' : ''}`}><div className={`w-2 h-2 rounded-full ${item.twColor}`}></div><span className="text-slate-600">{item.label}</span><span className="ml-auto font-medium text-slate-800">{item.amount}L</span></div>))}
                        </div>
                    </div>
                ) : <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">No expenses added</div>}
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-4 flex items-center justify-between">Compliance Status<span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Good</span></h3>
              <div className="space-y-3 mb-4">{["Disclosures submitted", "Expenses declared", "Deadline met"].map((item) => (<div key={item} className="flex items-center gap-3"><span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</span><span className="text-xs font-medium text-slate-600">{item}</span></div>))}</div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-11/12 bg-emerald-500 rounded-full" /></div><p className="text-right text-[10px] text-emerald-600 mt-1 font-medium">92% Complete</p>
            </Card>
          </section>
        </div>
      </div>

      {/* --- MODAL 1: ADD EXPENSE --- */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-slate-800">Add New Expense</h3>
                    <button onClick={() => setIsExpenseModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                        <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" value={newExpense.category} onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}>
                            <option>Rally</option><option>Ads</option><option>Logistics</option><option>Materials</option><option>Staff</option><option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                        <input required type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Stage Decor" value={newExpense.desc} onChange={(e) => setNewExpense({...newExpense, desc: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Amount (₹)</label>
                            <input required type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                            <input required type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={newExpense.date} onChange={(e) => setNewExpense({...newExpense, date: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg mt-2 transition-colors">Confirm Expense</button>
                </form>
            </div>
        </div>
      )}

      

    </div>
  );
}