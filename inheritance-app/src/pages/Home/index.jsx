import { useState } from "react";
import { Link } from "react-router-dom";

import DonorAuth from "../Verification/donorAuth";
import DonorProfile from "../DonorProfile";

import {
  CircleStackIcon,
  HeartIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import tech from "../../assets/image2.png";

export default function Home() {
  // 🔑 single source of truth
  // none | auth | profile
  const [donateStep, setDonateStep] = useState("none");

  return (
    <div className="bg-white w-full py-12 px-4 sm:px-6 lg:px-8">

      {/* HERO IMAGE */}
      <div className="w-full max-w-5xl mx-auto mb-12">
        <img
          src={tech}
          alt="OpenAudit data flow"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* MAIN CARDS */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">

        <Link to="/PublicViewer">
          <Card icon={CircleStackIcon} title="Explore Public Data" />
        </Link>

        {/* DONATE */}
        <div onClick={() => setDonateStep("auth")}>
          <Card icon={HeartIcon} title="Donate" />
        </div>

        <Link to="/PartyPrivate">
          <Card icon={BuildingOffice2Icon} title="Party Login" />
        </Link>

        <Link to="/Admin">
          <Card icon={ShieldCheckIcon} title="Admin Portal" />
        </Link>

      </div>

      {/* STEP 1: AUTH */}
      {donateStep === "auth" && (
        <DonorAuth
          onClose={() => setDonateStep("none")}
          onSuccess={() => setDonateStep("profile")}
        />
      )}

      {/* STEP 2: PROFILE */}
      {donateStep === "profile" && (
        <DonorProfile
          onClose={() => setDonateStep("none")}
          onContinue={() => {
            alert("Next step: Donation page");
            setDonateStep("none");
          }}
        />
      )}
    </div>
  );
}

function Card({ icon: Icon, title }) {
  return (
    <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
      <div className="mb-4 p-4 bg-blue-200 rounded-full">
        <Icon className="w-8 h-8 text-slate-800" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
  );
}
