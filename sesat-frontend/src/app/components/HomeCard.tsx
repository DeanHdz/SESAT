import Link from "next/link";

const HomeCard = ({title, webLink}:{title:string, webLink:string}) => {
    return (
        <Link href={webLink} className="mb-6 bg-light-blue-10 w-[45vw] lg:w-full flex flex-col items-center justify-center p-6 h-[250px] rounded border border-light-gray-22 border-solid hover:bg-light-blue-15">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg">
            

            <path d="M5,22h14c1.103,0,2-0.897,2-2V5c0-1.103-0.897-2-2-2h-2c0-0.553-0.447-1-1-1H8C7.447,2,7,2.447,7,3H5C3.897,3,3,3.897,3,5 v15C3,21.103,3.897,22,5,22z M5,5h2v2h10V5h2v15H5V5z"></path><path d="M11 13.586L9.207 11.793 7.793 13.207 11 16.414 16.207 11.207 14.793 9.793z"></path>
            </svg>
            <label className="m-3 block text-2xl text-center font-bold cursor-pointer">{title}</label>   

        </Link>
    );
};

export default HomeCard;