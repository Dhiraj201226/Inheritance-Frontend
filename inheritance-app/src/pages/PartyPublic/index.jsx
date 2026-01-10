import Card from "../../components/Card";
import StatCard from "../../components/StatCard";
import modi from "../../assets/modi.png";
import lotus from "../../assets/lotus.png";

export default function PartyPublic() {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏛️</span>
            <h1 className="font-semibold text-[25px] text-slate-700">
              Political Donations
            </h1>
          </div>
          <div className="flex items-center gap-6 text-[15px]">
            <span className="text-slate-500">Explore Public Data</span>
            <button className="bg-blue-100 text text-blue-700 px-4 py-1.5 rounded-lg">
              Terms New
            </button>
          </div>
        </Card>

        {/* Party Info */}
        <Card className="p-6 flex gap-6">
          <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center text-4xl">
            <img src={lotus} alt="Lotus" className="w-16 h-16" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              BJP (Bharatiya Janata Party)
            </h2>
            
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-[22px]">
                Narendra Modi
              </span>
              <img src={modi} alt="Modi" className="w-12 h-12 rounded-full border" />
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Funds" value="₹ 1,55,23,000" />
          <StatCard title="Funds Retrieved" value="₹ 3,10,23,000" />
          <StatCard title="Funds Spent" value="₹ 1,55,00,000" />
        </div>

        {/* Description */}
        <Card className="p-4 text-slate-600 text-[15px] leading-relaxed">
          Comprehensive analysis of declared political donations, funding sources, and campaign expenditures filed with the Election Commission. This data reflects public disclosures regarding party financing and election spending.
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Funding Overview */}
          <Card className="p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-700 mb-6">
              Funding Overview
            </h3>

            {/* Chart Container */}
            <div className="h-64 flex items-end gap-3">
              {[
                { year: '2017', pct: 20, amount: '40,000' },
                { year: '2018', pct: 40, amount: '80,000' },
                { year: '2019', pct: 35, amount: '70,000' },
                { year: '2020', pct: 60, amount: '1,20,000' },
                { year: '2021', pct: 55, amount: '1,10,000' },
                { year: '2022', pct: 70, amount: '1,40,000' },
                { year: '2023', pct: 90, amount: '1,80,000' },
              ].map((item, i) => (
                // Column Wrapper
                <div key={i} className="w-full flex flex-col items-center gap-2 group relative h-full justify-end">
                  
                  {/* Tooltip (Appears on Hover) */}
                  <div className="absolute bottom-[calc(100%-20px)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap z-10 shadow-lg transform -translate-y-1">
                    ₹ {item.amount}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                  </div>

                  {/* The Bar */}
                  <div
                    className="bg-blue-400 w-full rounded-t-md group-hover:bg-blue-600 transition duration-200"
                    style={{ height: `${item.pct}%` }}
                  />

                  {/* The Year Label */}
                  <span className="text-xs text-slate-500 font-medium">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-4">
                Donations declared to the Election Commission per fiscal year.
            </p>
          </Card>

          {/* Spending Declarations with Pie Chart */}
          <Card className="p-4 flex flex-col h-full">
            <h3 className="font-semibold text-slate-700 mb-1">
              Spending Declarations
            </h3>
            <p className="text-2xl font-bold text-slate-800 mb-6">
              ₹ 1,55,00,000
            </p>

            <div className="flex flex-col items-center">
              {/* CSS Conic Gradient Pie Chart */}
              {/* Rally 55 (35.5%), Ads 40 (25.8%), Logistics 30 (19.4%), Materials 20 (12.9%), Staff 10 (6.5%) */}
              <div 
                className="w-40 h-40 rounded-full mb-6 relative shadow-sm hover:shadow-md transition-shadow"
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
                 {/* Donut Hole */}
                 <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 text-center">Total<br/>155 L</span>
                 </div>
              </div>

              {/* Legend */}
              <div className="w-full space-y-2 text-sm ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span className="text-slate-600">Rally</span>
                  </div>
                  <span className="font-medium text-slate-700">55 Lac</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <span className="text-slate-600">Advertisement</span>
                  </div>
                  <span className="font-medium text-slate-700">40 Lac</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="text-slate-600">Logistics</span>
                  </div>
                  <span className="font-medium text-slate-700">30 Lac</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                    <span className="text-slate-600">Materials</span>
                  </div>
                  <span className="font-medium text-slate-700">20 Lac</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                    <span className="text-slate-600">Staff</span>
                  </div>
                  <span className="font-medium text-slate-700">10 Lac</span>
                </div>
              </div>
            </div>

          </Card>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Recent Donations */}
          <Card className="p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-700 mb-3">
              Recent Donations
            </h3>

            {[
              ["Adani", "20-5-2024", "₹ 24,000"],
              ["Reliance", "10-5-2024", "₹ 60,000"],
              ["Tata", "20-12-2023", "₹ 45,000"],
              ["Infosys", "20-9-2023", "₹ 45,000"],
            ].map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
  
                <span className="text-slate-700">{row[0]}</span>
                <span className="text-slate-400 text-sm">{row[1]}</span>
                <span className="font-semibold">{row[2]}</span>
              </div>
            ))}
          </Card>
{/* Complaint */}
          <Card className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
               <h3 className="font-semibold text-slate-900 ">
                 Report Discrepancy
               </h3>

            </div>
            
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Noticed an inconsistency in the donation data? Help ensure election transparency by flagging unreported funds or mismatched values.
            </p>

            <button className="w-full bg-slate-800 text-white py-2.5 rounded-lg mb-4 hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center gap-2">
              <span>⚠️</span> File a Complaint
            </button>

            <div className="mt-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Process Guarantee
              </p>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">🛡️</span> 
                  <span>100% Identity Protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500 text-lg">⚖️</span> 
                  <span>Direct EC Escalation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500 text-lg">📎</span> 
                  <span>Evidence-based Review</span>
                </li>
              </ul>
            </div>
          </Card>
         </div>
      </div>
    </div>
  );
    }