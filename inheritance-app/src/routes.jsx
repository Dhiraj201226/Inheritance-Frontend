import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PublicViewer from "./pages/PublicViewer";
import Donation from "./pages/Donation";
import PartyPrivate from "./pages/PartyPrivate";
import Admin from "./pages/Admin";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/PublicViewer" element={<PublicViewer />} />
      <Route path="/Donation" element={<Donation />} />
      <Route path="/PartyPrivate" element={<PartyPrivate />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/About" element={<About />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/HowItWorks" element={<HowItWorks />} />
    </Routes>
  );
}
