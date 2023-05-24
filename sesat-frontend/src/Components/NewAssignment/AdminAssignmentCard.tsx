import { useNavigate } from "react-router-dom";

const AdminAssignmentCard = ({ title }: { title: string }) => {
    const navigate = useNavigate();
    function handleClick(){
        navigate('/admin-board/create_assignment');
    }
    return (
        <div className="flex flex-row mt-3 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
            <div className="w-1/2 flex">
                <div className="flex w-[50px] text-dark-blue-10 justify-center items-center">
                    <svg style={{ color: "blue" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M80,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H80Z" opacity="0.2" fill="blue"></path><line x1="112" y1="112" x2="176" y2="112" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="112" y1="144" x2="176" y2="144" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect><line x1="80" y1="40" x2="80" y2="216" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </div>
                <div className="ml-6 w-auto">
                    <p style={{ fontWeight: "bold" }}>{title}</p>
                    <p className="mt-1 text-sm">Vence el dd/mm/yyyy</p>
                </div>
            </div>
            <div className="ml-3 flex items-center justify-center">
                <p>Estado actual</p>
            </div>
            <div className="ml-auto flex justify-end items-center">
                <button className="btn shadow rounded" onClick={handleClick}>Crear</button>
            </div>
        </div>
    );
};

export default AdminAssignmentCard;