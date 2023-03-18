import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import TesisRegistryPage  from "../Pages/TesisRegistryPage";
import AssignmentPage from "../Pages/AssignmentPage";
import BoardPage from "../Pages/BoardPage";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/register" element={<TesisRegistryPage />} />
      <Route path="/assignment" element={<AssignmentPage />} />
    </Routes>
  );
}
