import { useState } from "react";
import { Link } from "react-router-dom";

// ✅ correct relative import (case-sensitive)
import DonorAuth from "../Verification/donorAuth";

// icons
import {
  CircleStackIcon,
  HeartIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// ✅ correct image path
import tech from "../../assets/image.png";

export default function Home() {
  const [showDonateAuth, setShowDonateAuth] = useState(false);

  return (
    <div className="bg-white w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">

      {/* HERO IMAGE */}
      <div className="w-full max-w-5xl mb-12">
        <img
          src={tech}
          alt="OpenAudit data flow"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* MAIN CARDS */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* PUBLIC DATA */}
        <Link to="/PublicViewer">
          <Card
            icon={CircleStackIcon}
            title="Explore Public Data"
          />
        </Link>

        {/* DONATE (POPUP) */}
        <div onClick={() => setShowDonateAuth(true)}>
          <Card
            icon={HeartIcon}
            title="Donate"
          />
        </div>

        {/* PARTY LOGIN */}
        <Link to="/PartyPrivate">
          <Card
            icon={BuildingOffice2Icon}
            title="Party Login"
          />
        </Link>

        {/* ADMIN */}
        <Link to="/Admin">
          <Card
            icon={ShieldCheckIcon}
            title="Admin Portal"
          />
        </Link>

      </div>

      {/* DONOR AUTH MODAL */}
      {showDonateAuth && (
        <DonorAuth onClose={() => setShowDonateAuth(false)} />
      )}
    </div>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function Card({ icon: Icon, title }) {
  return (
    <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
      <div className="mb-4 p-4 bg-blue-200 rounded-full">
        <Icon className="w-8 h-8 text-slate-800" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>
    </div>
  );
}
