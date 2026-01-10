import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/Home";
import PublicViewer from "./pages/PublicViewer";
import PartyPrivate from "./pages/PartyPrivate";
import Admin from "./pages/Admin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* EVERYTHING BELOW THIS USES HEADER + FOOTER */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="PublicViewer" element={<PublicViewer />} />
          <Route path="PartyPrivate" element={<PartyPrivate />} />
          <Route path="Admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
