import { Link } from "react-router-dom";

const CalendarCard = ({title}:{title:string}) => {
    return (

        <Link to={"#"} className="mb-6 bg-light-blue-10 w-full flex flex-col items-center justify-center p-6 h-[250px] rounded border border-light-gray-22 border-solid hover:bg-light-blue-15">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg"><path d="M7 11H9V13H7zM7 15H9V17H7zM11 11H13V13H11zM11 15H13V17H11zM15 11H17V13H15zM15 15H17V17H15z"></path><path d="M5,22h14c1.103,0,2-0.897,2-2V8V6c0-1.103-0.897-2-2-2h-2V2h-2v2H9V2H7v2H5C3.897,4,3,4.897,3,6v2v12 C3,21.103,3.897,22,5,22z M19,8l0.001,12H5V8H19z"></path></svg>
            <label className="m-3 block text-2xl font-bold cursor-pointer">{title}</label>            

        </Link>
    );
};

export default CalendarCard;