import { useState } from "react";
import { Link } from "react-router-dom"; // Keep this for other links

// Components
import DonorAuth from "../Verification/donorAuth"; // Adjust path if needed
import DonorProfile from "../DonorProfile";
// import Donation from "../Donation"; // Not needed if we use state for steps

// Icons & Assets
import {
  CircleStackIcon,
  HeartIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import tech from "../../assets/image2.png";

export default function Home() {
  // 🔑 State determines which popup is showing
  // options: "none" | "auth" | "profile"
  const [donateStep, setDonateStep] = useState("none");

  return (
    <div className="bg-white w-full py-12 px-4 sm:px-6 lg:px-8 relative">
      
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
        
        {/* Public Viewer - Uses standard Link Routing */}
        <Link to="/PublicViewer">
          <Card icon={CircleStackIcon} title="Explore Public Data" />
        </Link>

        {/* DONATE - Uses State (onClick) instead of Link */}
        {/* FIX 1: Removed <Link> wrapper. Added onClick to trigger state. */}
      <Link to="/verify-donor"> 
          <Card icon={HeartIcon} title="Donate" />
        </Link>

        {/* Party Login - Uses standard Link Routing */}
        <Link to="/PartyPrivate">
          <Card icon={BuildingOffice2Icon} title="Party Login" />
        </Link>

        {/* Admin - Uses standard Link Routing */}
        <Link to="/Admin">
          <Card icon={ShieldCheckIcon} title="Admin Portal" />
        </Link>
      </div>

    </div>
  );
}

// Simple Card Component (No changes needed)
function Card({ icon: Icon, title }) {
  return (
    <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer h-full justify-center">
      <div className="mb-4 p-4 bg-blue-200 rounded-full">
        <Icon className="w-8 h-8 text-slate-800" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
  );
}