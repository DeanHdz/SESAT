import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import TesisRegistryPage  from "../Pages/TesisRegistryPage";
import AssignmentPage from "../Pages/AssignmentPage";
import BoardPage from "../Pages/BoardPage";
import CreateAssignment from "../Pages/CreateAssignment";
import TesisViewPage from "../Pages/TesisViewPage";
import UserRegistryPage from "../Pages/UserRegistryPage";
import ProfilePage from "../Pages/ProfilePage";
import AdminPageUsers from "../Pages/AdminSearchPage";
import AsesorPage from "../Pages/AsesorSearchPage";
import DocumentViewPage from "../Pages/DocumentViewPage";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/register" element={<TesisRegistryPage />} />
      <Route path="/assignment" element={<AssignmentPage />} />
      <Route path="/create_assignment" element={<CreateAssignment />} />
      <Route path="/view_tesis" element={<TesisViewPage />} />
      <Route path="/user-register" element={<UserRegistryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin-search" element={<AdminPageUsers />} />
      <Route path="/asesor-search" element={<AsesorPage />} />
      <Route path="/view_document" element={<DocumentViewPage />} />
    </Routes>
  );
}
