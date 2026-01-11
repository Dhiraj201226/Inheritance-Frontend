import { useState } from "react";

const DUMMY_USER = {
  username: "Aarya1234",
  password: "qwerty@24",
};

const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

export default function DonorAuth({ onClose, onSuccess }) {
  const [step, setStep] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (
      form.username === DUMMY_USER.username &&
      form.password === DUMMY_USER.password
    ) {
      setCaptcha(generateCaptcha());
      setStep("captcha");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const verifyCaptcha = () => {
    if (captchaInput === captcha) {
      // Triggers the parent function to redirect
      onSuccess(); 
    } else {
      setError("Captcha incorrect");
    }
  };

  return (
    // 'fixed inset-0' ensures this sits on top of Home.jsx
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm relative shadow-2xl animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          {step === "login" ? "Donor Secure Login" : "Human Verification"}
        </h2>

        {step === "login" && (
          <div className="space-y-4">
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Verify Credentials
            </button>
          </div>
        )}

        {step === "captcha" && (
          <div className="space-y-4">
            <div className="bg-slate-100 border border-slate-200 text-slate-600 text-center py-3 rounded-lg text-xl font-mono tracking-widest select-none">
              {captcha}
            </div>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter the code above"
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button
              onClick={verifyCaptcha}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Complete Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}