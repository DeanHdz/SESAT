import React from "react";
import Link from "next/link";

type UserProps = {
  idAlumno: number;
  route: string;
}

const HistoryPath = (props: UserProps) => {
  return (
    <Link href={`/asesor-dashboard/students/${props.route}/${props.idAlumno}`}>
    <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
      <div className="text-center text-[#ffffff]">
        Ver Tesis/Historial
      </div>
    </button>
    </Link>
  );
};

export default HistoryPath;