import AdminAssignmentCard from "../NewAssignment/AdminAssignmentCard";

const StudentsPhdAssignamentsList = ({ title, program }: { title: string, program: string }) => {
    return (
        <div className="w-full p-6 flex flex-col">
            <label className="mb-3 block text-4xl font-bold">{program}</label>
            <label className=" block text-xl font-bold">{title}</label>
            <div className="mt-1 p-2 border-t border-light-gray-22 border-solid w-full flex justify-start">                
            </div>

            <AdminAssignmentCard title="Registro" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 1" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 2" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 3" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 4" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 5" />
            <AdminAssignmentCard title="Seminario de Avance de Tesis 6" />
           
        </div>
    );
};

export default StudentsPhdAssignamentsList;