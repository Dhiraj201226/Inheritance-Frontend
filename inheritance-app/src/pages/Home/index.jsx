import { Link } from "react-router-dom";

import {
  CircleStackIcon,
  HeartIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import tech from "../../assets/image2.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      
      {/* 1. NAVBAR / HEADER */}
      {/* Moved outside the main grid so it sits at the top correctly */}
      

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {/* 2. HERO IMAGE */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <img
            src={tech}
            alt="OpenAudit data flow"
            className="w-full rounded-2xl shadow-xl border border-gray-100 object-cover"
          />
        </div>

        {/* 3. MAIN CARDS GRID */}
        {/* Now strictly contains only the card items */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <Link to="/PublicViewer">
            <Card 
              icon={CircleStackIcon} 
              title="Explore Public Data" 
              description="View transparent audit logs and records."
            />
          </Link>

          <Link to="/verify-donor">
            <Card 
              icon={HeartIcon} 
              title="Donate" 
              description="Support the cause with verified transactions."
            />
          </Link>

          <Link to="/PartyPrivate">
            <Card 
              icon={BuildingOffice2Icon} 
              title="Party Login" 
              description="Authorized access for political parties."
            />
          </Link>

          <Link to="/Admin">
            <Card 
              icon={ShieldCheckIcon} 
              title="Admin Portal" 
              description="System configuration and oversight."
            />
          </Link>

        </div>
      </main>
    </div>
  );
}

// Slightly enhanced Card component
function Card({ icon: Icon, title, description }) {
  return (
    <div className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer h-full">
      <div className="mb-4 p-3 bg-blue-100 rounded-full text-blue-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}