"use client";
import AdminAssignmentCard from "./AdminAssignmentCard";


const StudentsPhdAssignmentsList = ({ title, program }: { title: string, program: string }) => {
    return (
        <div className="w-full flex flex-col mb-10">
            <label className="mb-3 block text-4xl font-bold">{program}</label>
            <label className=" block text-xl font-bold">{title}</label>
            <div className="mt-1 p-2 border-t border-light-gray-22 border-solid w-full flex justify-start">                
            </div>

            <AdminAssignmentCard title="Registro" avance={0} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 1" avance={1} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 2" avance={2} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 3" avance={3} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 4" avance={4} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 5" avance={5} status={1}/>
            <AdminAssignmentCard title="Seminario de Avance de Tesis 6" avance={6} status={1}/>
           
        </div>
    );
};

export default StudentsPhdAssignmentsList;