import StudentAssignamentsList from "../Components/AdminBoardComponents/StudentsAssignamentsList";
import Drawer from "../Components/Drawer/Drawer";

const Assignments = () => {
    return (
        <div className="flex flex-row">
            <div className="w-3/12">
                <Drawer />
            </div>
            <div className="w-9/12">
                <StudentAssignamentsList title="Administrar Asignaciones"/>                
            </div>
        </div>
    );
};

export default Assignments;