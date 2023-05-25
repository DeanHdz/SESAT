import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import TesisRegistryPage from "../Pages/TesisRegistryPage";
import AssignmentPage from "../Pages/AssignmentPage";
import BoardPage from "../Pages/BoardPage";
import BoardPageAsesor from "../Pages/BoardPageAsesor";
import CreateAssignment from "../Pages/CreateAssignment";
import Assignments from "../Pages/Assignments";
import TesisViewPage from "../Pages/TesisViewPage";
import UserRegistryPage from "../Pages/UserRegistryPage";
import ProfilePage from "../Pages/ProfilePage";
import AdminPageUsers from "../Pages/AdminSearchPage";
import AsesorPage from "../Pages/AsesorSearchPage";
import DocumentViewPage from "../Pages/DocumentViewPage";
import NewUserPage from "../Pages/NewUserPage";
import FillReportPage from "../Pages/FillReportPage";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import SendPDFToDBPage from "../Pages/SendPDFToDBPage";
import AdminBoardPage from "../Pages/AdminBoardPage";
import StudentTesisMPage from "../Pages/StudentTesisMPage";
import StudentTesisPhdPage from "../Pages/StudentTesisPhdPage";
import StudentTesisMAsesor from "../Pages/StudentTesisMAsesor";
import StudentTesisAsesorPage from "../Pages/StudentTesisAsesorPage";
import StudentRegistryPage from "../Pages/StudentRegistryPage";
import AsesorRegistryPage from "../Pages/AsesorRegistryPage";
import ExternalAsesorRegistryPage from "../Pages/ExternalAsesorRegistryPage";
import MStudentListPage from "../Pages/MStudentListPage";
import PhdStudentListPage from "../Pages/PhdStudentListPage";
import NotificationSystemPage from "../Pages/NotificationSystemPage";
import PhdAssignments from "../Pages/PhdAssignments";

{/* /view_document/:id/:type   --> id_asignacion, tipo documento(formato(1), acta(2), tesis(3))*/}
export default function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/asesor-board" element={<BoardPageAsesor />} />
        <Route path="/register" element={<TesisRegistryPage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
        <Route path="/view_tesis" element={<TesisViewPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin-search" element={<AdminPageUsers />} />
        <Route path="/asesor-search" element={<AsesorPage />} />

        <Route path="/view_document/" element={<DocumentViewPage />} />         
        <Route path="/welcome" element={<NewUserPage />} />
        <Route path="/fill-report" element={<FillReportPage />} />
        <Route path="/send-pdf" element={<SendPDFToDBPage />} />
        <Route path="/admin-board" element={<AdminBoardPage />} />
        <Route path="/admin-board/user-register" element={<UserRegistryPage />} />

        <Route path="/admin-board/user-register/student" element={<StudentRegistryPage />} />
        <Route path="/admin-board/user-register/asesor" element={< AsesorRegistryPage/>} />
        <Route path="/admin-board/user-register/external-asesor" element={<ExternalAsesorRegistryPage />} />

        <Route path="/admin-board/create_assignment" element={<CreateAssignment />} />
        <Route path="/admin-board/assignments" element={<Assignments />} />
        <Route path="/admin-board/assignments-phd" element={<PhdAssignments />} />
        <Route path="/admin-board/view-tesis-masters" element={<StudentTesisMPage />} />
        <Route path="/admin-board/view-tesis-phd" element={<StudentTesisPhdPage />} />
        <Route path="/admin-board/view-tesis-masters/view_tesis" element={<TesisViewPage />} />        
        <Route path="/admin-board/view-tesis-phd/view_tesis" element={<TesisViewPage />} />  
        <Route path="/admin-board/view-students-M" element={<MStudentListPage />} />
        <Route path="/admin-board/view-students-Phd" element={<PhdStudentListPage />} />
        <Route path="/board-asesor/view-tesis-masters" element={<StudentTesisMAsesor />} />
        <Route path="/board-asesor/view-tesis-phd" element={<StudentTesisAsesorPage />} />
        <Route path="/board-asesor/view-tesis-masters/view_tesis" element={<TesisViewPage />} />  
        <Route path="/board-asesor/view-tesis-phd/view_tesis" element={<TesisViewPage />} />  
      </Routes>
    </ScrollToTop>
  );
}

