import StudentProfile from "./StudentProfile";

const StudentsProfileList = ({title}:{title: string}) => {
    return (
        <div className="w-full p-6 flex flex-col">
            <label className="m-3 block text-2xl font-bold cursor-pointer">{title}</label>  
            <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
                <input type="search" placeholder="Buscar alumnos" className="rounded"/>
            </div>
            <StudentProfile />
            <StudentProfile />
            <StudentProfile />
            <StudentProfile />
            <StudentProfile />
            <StudentProfile />
        </div>
    );
};

export default StudentsProfileList;