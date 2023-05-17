import StudentsCardList from "../Components/AdminBoardComponents/StudentsCardList";
import Drawer from "../Components/Drawer/Drawer";

const StudentTesisPhdPage = () => {
    return (
        <div className="flex flex-row">
            <div className="w-3/12">
                <Drawer />
            </div>
            <div className="w-9/12">
                <StudentsCardList title="Tesis de Doctorado"/>                
            </div>

        </div>
    );
};

export default StudentTesisPhdPage;