import StudentsProfileList from "../Components/AdminBoardComponents/StudentsProfileList";
import Drawer from "../Components/Drawer/Drawer";

const MStudentListPage = () => {
    return (
        <div className="flex flex-row">
            <div className="w-3/12">
                <Drawer />
            </div>
            <div className="w-9/12">
                <StudentsProfileList title="Alumnos de Maestría"/>                
            </div>
        </div>
    );
};

export default MStudentListPage;