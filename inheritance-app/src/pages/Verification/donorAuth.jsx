import { useState } from "react";

const DUMMY_USER = {
  username: "Aarya1234",
  password: "qwerty@24",
};

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 8);

const DonorAuth = ({ onClose }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [step, setStep] = useState("credentials");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (
      form.username === DUMMY_USER.username &&
      form.password === DUMMY_USER.password
    ) {
      const cap = generateCaptcha();
      setCaptcha(cap);
      setStep("captcha");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const verifyCaptcha = () => {
    if (captchaInput === captcha) {
      alert("Login successful (dummy)");
      onClose(); // close modal after success
    } else {
      setError("Captcha incorrect");
    }
  };

  return (
    // OVERLAY
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-gray-700"
        >
          ×
        </button>

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          {mode === "login" ? "Donor Login" : "Sign Up"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Verify your identity to continue
        </p>

        {/* TOGGLE */}
        <div className="flex mb-6 rounded-lg overflow-hidden border">
          <button
            onClick={() => {
              setMode("login");
              setStep("credentials");
              setError("");
            }}
            className={`flex-1 py-2 ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`flex-1 py-2 ${
              mode === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* SIGNUP */}
        {mode === "signup" && (
          <div className="space-y-4">
            <input className="input" placeholder="Full Name" />
            <input className="input" placeholder="Username" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn-primary w-full">Submit</button>
            <p className="text-xs text-gray-500 text-center">
              (Signup is UI-only for now)
            </p>
          </div>
        )}

        {/* LOGIN */}
        {mode === "login" && step === "credentials" && (
          <div className="space-y-4">
            <input
              className="input"
              placeholder="Username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleLogin} className="btn-primary w-full">
              Login
            </button>
          </div>
        )}

        {/* CAPTCHA */}
        {mode === "login" && step === "captcha" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="font-mono text-lg tracking-widest">
                {captcha}
              </span>
              <button
                onClick={() => setCaptcha(generateCaptcha())}
                className="text-blue-600 text-sm"
              >
                Refresh
              </button>
            </div>

            <input
              className="input"
              placeholder="Enter captcha"
              onChange={(e) => setCaptchaInput(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button onClick={verifyCaptcha} className="btn-primary w-full">
              Verify & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorAuth;
