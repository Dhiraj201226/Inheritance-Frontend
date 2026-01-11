import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import PartyPublic from "./pages/PartyPublic";   
import PartyPrivate from "./pages/PartyPrivate";
import PublicViewer from "./pages/PublicViewer";
import Donation from "./pages/Donation";
import Admin from "./pages/Admin";
import DonorProfile from "./pages/DonorProfile";
import ProtectedPartyPage from "./ProtectedPartyPage.jsx"; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
        
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>
          <Route path="/DonorProfile" element={<DonorProfile/>}/>
          {/* Public Pages */}
          <Route path="/PartyPublic" element={<PartyPublic />} />
          <Route path="/PublicViewer" element={<PublicViewer/>}/>
          <Route path="/Donation" element={<Donation/>}/>
          <Route path="/Admin" element={<Admin/>}/>

          <Route path="/PartyPrivate" element={<ProtectedPartyPage/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}