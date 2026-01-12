import React, { useState } from 'react';
import { Info, ChevronDown, UserSquare2 } from 'lucide-react';

export default function Complaint() {
  const [selectedParty, setSelectedParty] = useState('');

  return (
    <div className="min-h-screen bg-[#f8fbfe] font-sans">
      {/* --- NAVIGATION BAR --- */}

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1e58a9] mb-4">Report an Issue</h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Submit your complaints and grievances about political misconduct, corruption, or other issues of concern. 
            Help us ensure transparency and accountability.
          </p>
        </div>

        {/* --- FORM CONTAINER --- */}
        <div className="space-y-8">
          
          {/* INFO ALERT BOX */}
          <div className="bg-[#e9f2ff] border border-[#cbdcf5] rounded-lg p-4 flex items-start gap-4 shadow-sm">
            <div className="bg-[#3a82ee] rounded-full p-1 mt-0.5">
              <Info className="text-white w-4 h-4" />
            </div>
            <p className="text-[#3b5d8f] text-sm font-medium">
              Identity verification is required to submit a complaint. Your identity will not be publicly displayed.
            </p>
          </div>

          {/* SECTION: VERIFY IDENTITY */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-gray-700 font-bold text-sm whitespace-nowrap">Verify Your Identity</h2>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-blue-100 rounded-lg bg-white hover:bg-gray-50 shadow-sm transition group">
                {/* Aadhaar Logo Placeholder */}
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" alt="Aadhaar" className="h-6" />
                <span className="text-gray-700 text-sm font-semibold">Verify with Aadhaar</span>
              </button>
              
              <button className="flex items-center justify-center gap-3 py-3 border border-blue-100 rounded-lg bg-white hover:bg-gray-50 shadow-sm transition">
                <div className="flex items-center justify-center bg-[#2b6cb0] text-white rounded w-7 h-5">
                    <UserSquare2 size={14} />
                </div>
                <span className="text-gray-700 text-sm font-semibold">Verify with Voter ID</span>
              </button>
            </div>
          </div>

          {/* SECTION: POLITICAL PARTY */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-gray-700 font-bold text-sm whitespace-nowrap">Select Political Party <span className="text-gray-400 font-normal">(Optional)</span></h2>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            
            <div className="relative">
              <select 
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 ring-blue-100 bg-white"
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
              >
                <option value="">Select Party</option>
                <option value="BJP">Bharatiya Janata Party (BJP)</option>
                <option value="INC">Indian National Congress (INC)</option>
                <option value="SS">Shiv Sena (SS)</option>
                <option value="NCP">Nationalist Congress Party (NCP)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* SECTION: REFERENCE ID */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-gray-700 font-bold text-sm whitespace-nowrap">Reference ID <span className="text-gray-400 font-normal">(Optional)</span></h2>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            <input 
              type="text" 
              placeholder="Enter reference ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-blue-100 placeholder-gray-400 shadow-inner"
            />
          </div>

          {/* SECTION: DESCRIPTION */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-gray-700 font-bold text-sm whitespace-nowrap">Complaint Description</h2>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            <textarea 
              rows="6"
              placeholder="Describe your complaint in detail..."
              className="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 ring-blue-100 placeholder-gray-400 resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center pt-4">
            <button className="w-1/2 py-3.5 bg-gradient-to-b from-[#3a7bd5] to-[#2a68c0] text-white font-bold rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm tracking-wide">
              Submit Complaint
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
