import { useState } from "react";

const PARTIES = ["Citizen Alliance", "Party A", "Party B", "Party C"];
const PRESET_AMOUNTS = [500, 1000, 5000, 10000]; // INR presets

export default function Donation() {
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState(1000);

  return (
    <div className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border p-8">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Donate with Regulated Privacy
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-6">

            {/* PARTY SELECT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Political Party
              </label>
              <select
                value={party}
                onChange={(e) => setParty(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Political Party</option>
                {PARTIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Preset amount
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`px-4 py-2 rounded border text-sm ${
                      amount === amt
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Custom amount (₹)"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* WALLET BUTTON */}
            <button
              className="w-full md:w-64 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              Connect Wallet
            </button>

            <p className="text-xs text-gray-500">
              Donor identity is verified and recorded. Public disclosure is governed by legal thresholds.
            </p>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-gray-50 border rounded-xl p-6 space-y-4 h-fit">
            <h3 className="font-semibold text-gray-800">
              Donation summary
            </h3>

            <div className="text-sm space-y-2">
              <p>
                <span className="text-gray-600">Party:</span>{" "}
                <strong>{party || "-"}</strong>
              </p>
              <p>
                <span className="text-gray-600">Amount:</span>{" "}
                <strong>₹{amount.toLocaleString("en-IN")}</strong>
              </p>
            </div>

            <div className="text-sm bg-white border rounded-lg p-3">
              <p className="font-medium mb-1">Privacy Status</p>
              <p className="text-gray-600">
                Recorded (Non-Public Below Threshold)
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() =>
              alert(
                `Donation Confirmed ✅\n\nParty: ${party}\nAmount: ₹${amount.toLocaleString("en-IN")}`
              )
            }
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg"
          >
            Confirm Donation
          </button>
        </div>
      </div>
    </div>
  );
}
