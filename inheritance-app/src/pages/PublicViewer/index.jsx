import react from "react";
export default function PublicViewer(){
return(
    <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Public Viewer Page</h1>
            <p className="text-slate-500">Welcome to the public viewer page. Here you can view public information and content.</p>
        </div>
    </div>
);
}