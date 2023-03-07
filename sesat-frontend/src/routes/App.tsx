import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import { TesisRegistryPage } from "../Pages/TesisRegistryPage";
export default function App() {
  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/register" element={<TesisRegistryPage />} />
    </Routes>
  );
}
