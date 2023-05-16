import { Link } from "react-router-dom";

const HomeCard = ({title, webLink}:{title:string, webLink:string}) => {
    return (
        <Link to={webLink} className="mb-6 bg-light-blue-10 w-full flex flex-col items-center justify-center p-6 h-[250px] rounded border border-light-gray-22 border-solid hover:bg-light-blue-15">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg"><path d="M6,22h15v-2H6.012C5.55,19.988,5,19.805,5,19s0.55-0.988,1.012-1H19h1h1v-1v-2V4c0-1.103-0.897-2-2-2H6 C4.794,2,3,2.799,3,5v3v6v3v2C3,21.201,4.794,22,6,22z M5,8V5c0-0.805,0.55-0.988,1-1h13v11v1H5v-2V8z"></path><path d="M8 6H17V8H8z"></path></svg>
            <label className="m-3 block text-2xl font-bold cursor-pointer">{title}</label>   

        </Link>
    );
};

export default HomeCard;