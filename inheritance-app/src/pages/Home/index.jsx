import React from "react";
import { Link } from "react-router-dom";
import tech from "assets/image.png";
import {
  CircleStackIcon,
  HeartIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-white w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-5xl mb-12">
        <img
          src={tech}
          alt="OpenAudit data flow"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8">

        <Link to="/PublicViewer">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-4 p-4 bg-blue-200 rounded-full">
              <CircleStackIcon className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Explore Public Data
            </h3>
          </div>
        </Link>

        <Link to="/Donation">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-4 p-4 bg-blue-200 rounded-full">
              <HeartIcon className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Donate
            </h3>
          </div>
        </Link>

        <Link to="/PartyPrivate">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-4 p-4 bg-blue-200 rounded-full">
              <BuildingOffice2Icon className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Party Login
            </h3>
          </div>
        </Link>

        <Link to="/Admin">
          <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-4 p-4 bg-blue-200 rounded-full">
              <ShieldCheckIcon className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Admin Portal
            </h3>
          </div>
        </Link>

      </div>

      <div className="flex-grow" />
    </div>
  );
}
