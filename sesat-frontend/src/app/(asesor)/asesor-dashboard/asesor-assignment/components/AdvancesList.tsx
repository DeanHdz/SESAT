import React from "react";
import Link from "next/link";
import PrevAdvance from "./PrevAdvance";

const AdvancesList = () => {
  return (
    <div className="block mt-6 w-10/12 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
      <label className="mb-0 block text-base font-bold">
        Versiones anteriores de la tesis
      </label>
      <label className="mt-6 mb-2 block text-base font-light">
        Listado de avances
      </label>
      

      <PrevAdvance idAsignacion={3}/>

      
    </div>
  );
};

export default AdvancesList;