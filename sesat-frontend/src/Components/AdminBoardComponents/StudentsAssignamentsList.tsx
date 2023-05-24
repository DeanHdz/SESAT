import AdminAssignmentCard from "../NewAssignment/AdminAssignmentCard";

const StudentAssignamentsList = ({ title, program }: { title: string, program: string }) => {
    return (
        <div className="w-full p-6 flex flex-col">
            <label className="mb-3 block text-4xl font-bold">{program}</label>
            <label className=" block text-xl font-bold">{title}</label>
            <div className="mt-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
                <label className=" block text-xl font-light">Alumnos de tiempo completo</label>
            </div>

            <AdminAssignmentCard title="Registro" />
            <AdminAssignmentCard title="Seminario de Tesis I (20% de avance)" />
            <AdminAssignmentCard title="Seminario de Tesis II (50% de avance)" />
            <AdminAssignmentCard title="Seminario de Tesis III (90% de avance)" />

            <div className="mt-14 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-start">
                <label className=" block text-xl font-light">Alumnos de medio tiempo</label>
            </div>

            <AdminAssignmentCard title="Registro" />
            <AdminAssignmentCard title="Avance 1" />
            <AdminAssignmentCard title="Seminario de Tesis I (20% de la tesis)" />
            <AdminAssignmentCard title="Avance 3" />
            <AdminAssignmentCard title="Seminario de Tesis II (50% de la tesis)" />
            <AdminAssignmentCard title="Avance 5" />
            <AdminAssignmentCard title="Seminario de Tesis III (90% de la tesis)" />            
        </div>
    );
};

export default StudentAssignamentsList;