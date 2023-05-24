import StudentsPhdAssignamentsList from "../Components/AdminBoardComponents/StudentsPhdAssignamentsList";
import Drawer from "../Components/Drawer/Drawer";

const PhdAssignments = () => {
    return (
        <div className="flex flex-row">
            <div className="w-3/12">
                <Drawer />
            </div>
            <div className="w-9/12">
                <StudentsPhdAssignamentsList title="Asignaciones para este semestre" program="Alumnos de Doctorado"/>                
            </div>
        </div>
    );
};

export default PhdAssignments;