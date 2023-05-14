
import CalendarCard from "../AdminBoardComponents/CalendarCard";
import HomeCard from "../AdminBoardComponents/HomeCard";
import NotificationsCard from "../AdminBoardComponents/NotificationsCard";
import TesisCard from "../TesisView/TesisCard";

const AdminBoard = () => {
    return (
        <div className="w-full p-6 flex flex-row">
            <div className="block w-3/6 mr-6">
                <HomeCard title="Tesis de Alumnos de Maestría" webLink="view-tesis-masters"/>
                <NotificationsCard title="Sistema de Notificaciones"/>
            </div>
            <div className="block w-3/6 mr-6">
                <HomeCard title="Tesis de Alumnos de Doctorado" webLink="view-tesis-phd"/> 
                <CalendarCard title="Calendario de actividades"/>           
            </div>                        

        </div>
    );
};

export default AdminBoard;