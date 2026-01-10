import react from "react";
import PartyPrivate from "../PartyPublic";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export default function PublicViewer(){
return(
    <Link to="/PartyPublic">
        <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="mb-4 p-4 bg-blue-200 rounded-full">
              <BuildingOffice2Icon className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Party Page
            </h3>
          </div>
    </Link>
);
}