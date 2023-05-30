import { useEffect, useState } from "react";
import { AsignacionEndpoint } from "../../api/asignacion.endpoint";
import { SESAT } from "../../Interfaces/ISESAT";

const AssignmentInfoBlock = ({asignacion}:{asignacion:SESAT.Asignacion}) => {
  return (
    <div className="">
      <article className="prose">
        <h1 className="font-SESAT mt-2">{asignacion.titulo}</h1>
        <h3 className="ml-4">{asignacion.descripcion}</h3>
      </article>
      <div className=" mt-4 w-full bg-[#f8f9fa] shadow-md px-6 py-6">
        <div className="pt-[7px]">
          <button className="btn bg-[#8c969f] border-transparent w-1/8 h-[30px]">
            Marcar como hecho
          </button>
        </div>
        <div className="divider mt-2 mb-2"></div>
        <div className="font-bold">
          Abierto:{" "}
          <span className="font-normal text-gray-500">
            {" "}
            {asignacion.apertura.toLocaleString()}{" "}
          </span>
        </div>
        <div className="font-bold mt-2">
          Pendiente:{" "}
          <span className="font-normal text-gray-500">
            {" "}
            {asignacion.cierre.toLocaleString()}{" "}
          </span>
        </div>
        <div className="divider mt-2 mb-2"></div>
        <button className="btn no-animation bg-[#f9c107] border-transparent w-1/8 h-[30px] hover:bg-[#f9c107] hover:border-transparent text-gray-700 hover:cursor-default">
          {asignacion?.estado_entrega}
        </button>
      </div>
      <input
        type="file"
        className="file-input mt-10 hover:border hover:border-[#003067] border border-light-gray-22 border-solid"
      />
    </div>
  );
};

export default AssignmentInfoBlock;
