import { useState } from "react";

const DUMMY_USER = {
  username: "Aarya1234",
  password: "qwerty@24",
};

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 8);

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
      onSuccess(); // 🔥 THIS OPENS PROFILE
    } else {
      setError("Captcha incorrect");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          Donor Login
        </h2>

        {step === "login" && (
          <>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Login
            </button>
          </>
        )}

        {step === "captcha" && (
          <>
            <div className="bg-gray-100 text-center py-2 rounded mb-3 font-mono">
              {captcha}
            </div>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Enter captcha"
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={verifyCaptcha}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}
