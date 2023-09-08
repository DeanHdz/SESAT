import HomeCard from "./HomeCard";



const AsesorBoard2 = () => {
    return (
        <div className="w-full p-6 flex justify-center">
    <div className="flex flex-row gap-4">
        <div className="w-1/3">
            <HomeCard title="Asesorados Maestría" webLink="view-tesis-masters" />
        </div>
        <div className="w-1/3">
            <HomeCard title="Asesorados Doctorado" webLink="view-tesis-phd" />
        </div>
        <div className="w-1/3">
            {/** <CalendarCard title="Asignaciones Activas"/> */}
        </div>
    </div>
</div>


    );
};

export default AsesorBoard2;