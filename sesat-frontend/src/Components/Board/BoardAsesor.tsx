
import CalendarCard from "../AdminBoardComponents/CalendarCard";
import HomeCard from "../AdminBoardComponents/HomeCard";

const AsesorBoard2 = () => {
    return (
        <div className="w-full p-6 flex justify-center">
    <div className="flex flex-row">
        <div className="w-1/3 mr-4">
            <HomeCard title="Asesorados Maestría" webLink="view-tesis-masters" />
        </div>
        <div className="w-1/3 mr-4">
        <HomeCard title="Asesorados Doctorado" webLink="view-tesis-phd" />
        </div>
        <div className="w-1/3">
        <CalendarCard title="Calendario de actividades"/>  
        </div>
    </div>
</div>


    );
};

export default AsesorBoard2;