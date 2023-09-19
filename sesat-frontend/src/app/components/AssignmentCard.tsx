import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Asignacion, LoggedUser, Tesis } from "../../../types/ISESAT";




const AssignmentCard = () => {
  const navigate = useRouter();  

  const [user, setUser] = useState<LoggedUser>(
    JSON.parse(sessionStorage.getItem("loggedUser") || "{}")
  );
  const [tesis, setTesis] = useState<Tesis>();

  const GetTesis = async () => {
    {
      /**
       *     if (user)
      setTesis(await getTesisPerStudent(user.usuario.clave, ""));
       */
    }

  };

  const [asignacion, setAsignacion] = useState<Asignacion>();

  const GetAsignacion = async () => {
    /*
    if (tesis && tesis.asignaciones_tesis.length > 0)
      setAsignacion(
        await AsignacionEndpoint.getAsignacion(
          tesis.asignaciones_tesis[tesis.asignaciones_tesis.length - 1]
            .id_asignacion,
          ""
        )
      );

      */
  };

  useEffect(() => {
    GetTesis();
  }, []);

  useEffect(() => {
    GetAsignacion();
  }, [tesis]);

  if (asignacion) {
    return (
      <div className="flex flex-row mb-6 mt-6 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
        <div className="flex w-[50px] text-dark-blue-10 justify-center items-center">
          <svg
            style={{ color: "blue" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M80,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H80Z"
              opacity="0.2"
              fill="blue"
            ></path>
            <line
              x1="112"
              y1="112"
              x2="176"
              y2="112"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="112"
              y1="144"
              x2="176"
              y2="144"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <rect
              x="40"
              y="40"
              width="176"
              height="176"
              rx="8"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></rect>
            <line
              x1="80"
              y1="40"
              x2="80"
              y2="216"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
          </svg>
        </div>
        <div className="ml-6 block w-auto">
          <p className="font-bold"> {asignacion.titulo} </p>
          <p> {user.usuario.datos_alumno?.programa?.nombreprograma} </p>
          <p className="mt-1 text-sm"> {asignacion.cierre.toString()} </p>
        </div>
        <div className="ml-auto flex justify-end items-center">
          <button
          className="btn shadow rounded"
          onClick={(e)=>
          {
            /*
            navigate("/assignment", {
              state:
              {
                asignacion: asignacion
              }
            })
            */
          }}
          > Ver detalles </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row mb-6 mt-6 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid gap-10 align-middle items-center font-SESAT font-bold text-xl">
        <div className="flex w-[50px] text-dark-blue-10 justify-center items-center">
          <svg
            style={{ color: "blue" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M80,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H80Z"
              opacity="0.2"
              fill="blue"
            ></path>
            <line
              x1="112"
              y1="112"
              x2="176"
              y2="112"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="112"
              y1="144"
              x2="176"
              y2="144"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <rect
              x="40"
              y="40"
              width="176"
              height="176"
              rx="8"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></rect>
            <line
              x1="80"
              y1="40"
              x2="80"
              y2="216"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
          </svg>
        </div>
        No hay ninguna asignación activa
      </div>
    );
  }
};

export default AssignmentCard;
