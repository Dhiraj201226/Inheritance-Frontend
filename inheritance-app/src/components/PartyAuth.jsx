import { useState } from "react";

// 1. DUMMY CREDENTIALS FOR PARTY
const DUMMY_PARTY_USER = {
  username: "BJP_Admin",
  password: "Election@2024",
};

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export default function PartyAuth({ onClose, onSuccess }) {
  const [step, setStep] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 2. CHECK CREDENTIALS
    if (
      form.username === DUMMY_PARTY_USER.username &&
      form.password === DUMMY_PARTY_USER.password
    ) {
      setCaptcha(generateCaptcha());
      setStep("captcha");
      setError("");
    } else {
      setError("Invalid Party ID or password");
    }
  };

  const verifyCaptcha = () => {
    // 3. VERIFY CAPTCHA (Case insensitive for better UX)
    if (captchaInput.toUpperCase() === captcha) {
      onSuccess(); // 🔥 THIS OPENS PARTY PRIVATE DASHBOARD
    } else {
      setError("Captcha incorrect. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl border border-slate-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        {/* Header with Icon */}
        <div className="text-center mb-6">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                🏛️
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
            Party Admin Login
            </h2>
            <p className="text-sm text-slate-500">
                Secure access for authorized personnel only
            </p>
        </div>

        {/* STEP 1: LOGIN FORM */}
        {step === "login" && (
          <div className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Party ID / Username</label>
                <input
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="e.g. BJP_Admin"
                value={form.username}
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
                />
            </div>
            
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input
                type="password"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                />
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 text-sm py-2 px-3 rounded flex items-center gap-2">
                    ⚠️ {error}
                </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-slate-200"
            >
              Access Dashboard
            </button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
                By logging in, you agree to ECI compliance terms.
            </p>
          </div>
        )}

        {/* STEP 2: CAPTCHA VERIFICATION */}
        {step === "captcha" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-slate-100 border border-slate-200 text-center py-4 rounded-lg mb-2 relative overflow-hidden group">
              {/* Noise pattern background for realism */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>
              
              <span className="text-3xl font-mono font-bold tracking-[0.5em] text-slate-700 relative z-10 select-none">
                {captcha}
              </span>
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Security Check</label>
                <input
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-center font-mono tracking-widest uppercase"
                placeholder="Enter the code above"
                autoFocus
                onChange={(e) => setCaptchaInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && verifyCaptcha()}
                />
            </div>
            
            {error && (
                <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}

            <button
              onClick={verifyCaptcha}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-orange-100"
            >
              Verify & Enter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}