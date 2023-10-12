
import Link from "next/link";

const CardAsesor = ({ title, correo, webLink}: { title: string; correo: string; webLink: string;}) => {
  return (
    <Link
      href={webLink}
      className="mb-6 bg-light-blue-10 flex flex-col pb-5 rounded border hover:bg-light-blue-15"
    >

      <label className="m-3 block text-1xl font-bold cursor-pointer mb-0 bt-0">
        {title}
      </label>

      <label className="m-3 block text-l cursor-pointer mb-0 bt-0">
        {correo}
      </label>
     
    </Link>
  );
};

export default CardAsesor;
