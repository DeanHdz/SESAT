import React from "react";
import Link from "next/link";

const AssignmentPath = ({idAsignacion}:{idAsignacion: number}) => {
  return (
    <Link href={`alumno-dashboard/alumno-assignment/${idAsignacion}`}>
    <button className="bg-[#004A8C] hover:bg-dark-blue-10 rounded-[15px] p-2 px-5 shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none">
      <div className="text-center text-[#ffffff]">
        Ver
      </div>
    </button>
    </Link>
  );
};

export default AssignmentPath;