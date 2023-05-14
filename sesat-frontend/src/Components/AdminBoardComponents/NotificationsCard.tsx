import { Link } from "react-router-dom";

const NotificationsCard = ({title}:{title:string}) => {
    return (
        <Link to={"#"} className="mb-6 bg-light-blue-10 w-full flex flex-col items-center justify-center p-6 h-[250px] rounded border border-light-gray-22 border-solid hover:bg-light-blue-15">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg"><path d="M255.9 456c31.1 0 48.1-22 48.1-53h-96.3c0 31 17 53 48.2 53zM412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.4-11-24.7-24.4-24.6-13.4-.2-24.4 11.2-24.4 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.3 0 25.7-18.8 15.8-31.8z"></path></svg>
            <label className="m-3 block text-2xl font-bold cursor-pointer">{title}</label>   

        </Link>
    );
};

export default NotificationsCard;
