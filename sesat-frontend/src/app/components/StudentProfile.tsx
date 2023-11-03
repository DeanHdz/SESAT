import React from "react";
import { ThesisFullHistory } from "../(asesor)/asesor-dashboard/students/masters-degree/[idAlumno]/page";

type InfoProps = {
  tesis: ThesisFullHistory;
}

const StudentProfile = (props: InfoProps) => {
  return (
    <div className="w-full px-8 py-10 mt-4 mb-4 bg-light-blue-10 bg-opacity-50 gray__border !rounded-[15px] flex flex-col lg:flex-row">
      <div className="w-full lg:w-fit flex items-center justify-center lg:items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M24 27a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" /><path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20ZM33.63 39.21A17.915 17.915 0 0 1 24 42a17.916 17.916 0 0 1-9.832-2.92c-.24-.3-.483-.61-.73-.93A2.144 2.144 0 0 1 13 36.845c0-1.077.774-1.98 1.809-2.131c6.845-1 11.558-.914 18.412.035A2.077 2.077 0 0 1 35 36.818c0 .48-.165.946-.463 1.31c-.307.374-.61.735-.907 1.082Zm3.355-2.744c-.16-1.872-1.581-3.434-3.49-3.698c-7.016-.971-11.92-1.064-18.975-.033c-1.92.28-3.335 1.856-3.503 3.733A17.94 17.94 0 0 1 6 24c0-9.941 8.059-18 18-18s18 8.059 18 18a17.94 17.94 0 0 1-5.015 12.466Z" /></g></svg>
      </div>

      <div className="w-full ml-2 mr-2 flex-wrap">
        <label className="mb-2 block">
          Nombre:
        </label>
        <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
          <span className="font-semibold align-middle">{`${props.tesis.nombre} ${props.tesis.apellido_paterno} ${props.tesis.apellido_materno}`}</span>
        </div>
        <label className="mb-2 block">
          Correo:
        </label>
        <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
          <span className="font-semibold align-middle">{props.tesis.correo}</span>
        </div>
        <label className="mb-2 block">
          Programa:
        </label>
        <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
          <span className="font-semibold align-middle">{props.tesis.nombre_programa}</span>
        </div>
        <label className="mb-2 block">
          Estado:
        </label>
        <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
          <span className="font-semibold align-middle">{props.tesis.estado_activo === true ? 'Inscrito' : 'No inscrito'}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;