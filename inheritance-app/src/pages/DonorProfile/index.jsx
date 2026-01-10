const donor = {
  name: "John Smith",
  totalAmount: 85200,
  totalDonations: 42,
  partiesSupported: 3,
  activeYears: "2016 - 2021",
};

export default function DonorProfile({ onClose, onContinue }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-4xl shadow-xl">

        <h1 className="text-3xl font-semibold mb-6">
          {donor.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Total Donated" value={`$${donor.totalAmount}`} />
          <Stat label="Donations" value={donor.totalDonations} />
          <Stat label="Parties" value={donor.partiesSupported} />
          <Stat label="Years Active" value={donor.activeYears} />
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Continue to Donate
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
