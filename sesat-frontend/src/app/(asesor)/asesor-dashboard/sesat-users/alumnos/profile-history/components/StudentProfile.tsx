import React from "react";

const StudentProfile = () => {
  return (
    <div>
      <div className="w-full rounded-[15px] p-3 mt-4 mb-4 bg-white gray__border flex">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M24 27a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/><path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20ZM33.63 39.21A17.915 17.915 0 0 1 24 42a17.916 17.916 0 0 1-9.832-2.92c-.24-.3-.483-.61-.73-.93A2.144 2.144 0 0 1 13 36.845c0-1.077.774-1.98 1.809-2.131c6.845-1 11.558-.914 18.412.035A2.077 2.077 0 0 1 35 36.818c0 .48-.165.946-.463 1.31c-.307.374-.61.735-.907 1.082Zm3.355-2.744c-.16-1.872-1.581-3.434-3.49-3.698c-7.016-.971-11.92-1.064-18.975-.033c-1.92.28-3.335 1.856-3.503 3.733A17.94 17.94 0 0 1 6 24c0-9.941 8.059-18 18-18s18 8.059 18 18a17.94 17.94 0 0 1-5.015 12.466Z"/></g></svg>
        </div>
        <div className="w-full ml-2 mr-2 flex-wrap">
          <label className="mb-2 block">
            Alumno:
          </label>
          <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
                <span className="font-semibold align-middle">Dean Joshua Hernandez</span>
          </div>
          <label className="mb-2 block">
            Correo:
          </label>
          <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
                <span className="font-semibold align-middle">a314118@alumnos.uaslp.mx</span>
          </div>
          <label className="mb-2 block">
            Programa actual:
          </label>
          <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
                <span className="font-semibold align-middle">Maestría en Ingeniería de software</span>
          </div>
          <label className="mb-2 block">
            Asesor actual:
          </label>
          <div className="rounded-[15px] bg-[#E8EDEF] p-2 px-4 ml-2 mr-2">
                <span className="font-semibold align-middle">Silvia Luz Vaca Rivera</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;