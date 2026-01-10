import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import PublicViewer from "./pages/PublicViewer";
import Donation from "./pages/Donation";
import PartyPrivate from "./pages/PartyPrivate";
import Admin from "./pages/Admin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="PublicViewer" element={<PublicViewer />} />
        <Route path="Donation" element={<Donation />} />
        <Route path="PartyPrivate" element={<PartyPrivate />} />
        <Route path="Admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
