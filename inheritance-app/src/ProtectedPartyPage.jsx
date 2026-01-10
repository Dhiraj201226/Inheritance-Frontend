import { useState } from "react";
import PartyPrivate from "./pages/PartyPrivate"; // Your dashboard code
import PartyAuth from "./components/PartyAuth";   // The login code I gave you

export default function ProtectedPartyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Function called when Login is successful
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  // If user is ALREADY authenticated, show the dashboard immediately
  if (isAuthenticated) {
    return <PartyPrivate />;
  }

  // Otherwise, show the "Restricted Access" Landing Page
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      
      {/* 1. RESTRICTED ACCESS CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Restricted Access
        </h1>
        <p className="text-slate-500 mb-8">
          This dashboard is reserved for authorized Party Administrators. Please verify your credentials to proceed.
        </p>
        
        <button 
          onClick={() => setShowAuthModal(true)}
          className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          Login as Party Admin
        </button>
      </div>

      {/* 2. AUTH MODAL (Conditionally Rendered) */}
      {showAuthModal && (
        <PartyAuth 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleLoginSuccess} 
        />
      )}

    </div>
  );
}