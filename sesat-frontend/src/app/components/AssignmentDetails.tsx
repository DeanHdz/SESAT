"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TitleBar } from "./TitleBar";

const AssignmentDetails = ({
  title,
  avance,
}: {
  title: string;
  avance: string;
}) => {


  {/*const [listaProgramas, setListaProgramas] = useState<SESAT.Programa[]>();  */ }
  const [programs, setProgram] = useState<string>();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const navigate = useRouter();



  const handleSubmit = (e: any) => {
    navigate.push('/admin-dashboard/create-assignment');
  };


  return (
    <div>
      <TitleBar title="Propiedades de la asignación" />
      <div className="w-full flex flex-col items-center lg:flex-row rounded border border-light-gray-22 border-solid mt-6">


        <div className="px-6 w-11/12 lg:w-3/6 lg:flex lg:flex-col py-6 lg:mr-6 ">
          <label className="mb-3 block text-lg font-bold">Título</label>
          <label className="mb-10 block text-lg font-normal">
            {title}
          </label>
          <label className="mb-3 block text-lg font-bold">
            Instrucciones
          </label>
          <p>
            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. 
          </p>
        </div>

        <div className="px-6 w-11/12 lg:w-3/6 py-6">
          <label className="mb-3 block text-lg font-bold">
            Fecha de publicación:
          </label>
          <p>dd/mm/yyyy</p>

          <label className="mb-3 block text-lg font-bold">Hora:</label>
          <p className="mb-10">hh:mi</p>

          <label className="mb-3 block text-lg font-bold">
            Fecha de entrega:
          </label>
          <p>dd/mm/yyyy</p>

          <label className="mb-3 block text-lg font-bold">Hora:</label>
          <p>hh:mi</p>

        </div>



      </div>
      <div className="w-full mt-6 flex justify-end">
        <button
          onClick={handleSubmit}          
          className=" bg-dark-blue-10 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        >
          Editar propiedades
        </button>
      </div>

    </div>
  );
};

export default AssignmentDetails;