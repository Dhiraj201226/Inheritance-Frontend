import Card from "../../components/Card";
import StatCard from "../../components/StatCard";

export default function PartyPublic() {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏛️</span>
            <h1 className="font-semibold text-lg text-slate-700">
              Political Donations
            </h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-500">Explore Public Data</span>
            <button className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg">
              Terms New
            </button>
          </div>
        </Card>

        {/* Party Info */}
        <Card className="p-6 flex gap-6">
          <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center text-4xl">
            🌸
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              BJP (Bharatiya Janata Party)
            </h2>
            <p className="text-slate-500 mt-1">Onat Prennem</p>

            <div className="flex items-center gap-3 mt-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
                Anans Depuri
              </span>
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Tends" value="₹ 1,55,23,000" />
          <StatCard title="Funds Retrivial" value="₹ 3,40,00,000" />
          <StatCard title="Funds Seemt" value="₹ 1,55,00,000" />
        </div>

        {/* Description */}
        <Card className="p-4 text-slate-500 text-sm">
          Feroling, merket bedtethon on lino, uno ppaning szes bersiment
          impofiate fyon the ontests on.
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Funding Overview */}
          <Card className="p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-700 mb-2">
              Funding Overview
            </h3>

            <div className="h-40 bg-slate-100 rounded-lg flex items-end gap-2 p-3">
              {[20, 40, 35, 60, 55, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="bg-blue-400 w-full rounded-md"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Die niealfinsnsvith slarinee inoidiiers besnet boras, aiand on pay
            </p>
          </Card>

          {/* Spending */}
          <Card className="p-4">
            <h3 className="font-semibold text-slate-700 mb-1">
              Spending Declarations
            </h3>
            <p className="text-2xl font-bold text-slate-800 mb-3">
              ₹ 1,55,00,000
            </p>

            <div className="h-32 bg-blue-100 rounded-full flex items-center justify-center text-sm text-slate-600">
              Pie Chart
            </div>

            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
              DIB 11880%
            </button>
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
              ["BUPISIP", "1668-666", "₹ 24,000"],
              ["BUPISIP", "6744-894", "₹ 60,000"],
              ["BUPISIP", "0679-380", "₹ 45,000"],
              ["BUPISIP", "9466-890", "₹ 45,000"],
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
          <Card className="p-4">
            <h3 className="font-semibold text-slate-700 mb-2">
              Complaint & Reporting
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Sparto pecidictior siablaries copinetory peciires for wee nee.
            </p>

            <button className="w-full bg-blue-400 text-white py-2 rounded-lg mb-3">
              Submit Condition
            </button>

            <ul className="text-sm text-slate-600 space-y-2">
              <li>✔ Vatually hambordon neest</li>
              <li>✔ Theralcimppororatriry</li>
              <li>✔ Yog bcagtasn eties</li>
            </ul>
          </Card>

        </div>

      </div>
    </div>
  );
}
