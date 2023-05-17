import PhdStudentsList from "../Components/AdminBoardComponents/StudentsProfileList";
import Drawer from "../Components/Drawer/Drawer";

const PhdStudentListPage = () => {
    return (
        <div className="flex flex-row">
            <div className="w-3/12">
                <Drawer />
            </div>
            <div className="w-9/12">
                <PhdStudentsList title="Alumnos de Doctorado"/>                
            </div>

        </div>
    );
};

export default PhdStudentListPage;