import React from "react";
import Link from "next/link";

const AdvancesList = () => {
    return (
        <div className="block mt-0 w-10/12 bg-light-blue-10 rounded px-8 py-4 mb-10 h-fit border border-light-gray-22 border-solid">
            <label className="mb-0 block text-base font-bold">
              Versiones anteriores de la tesis
            </label>
            <label className="mt-6 mb-2 block text-base font-light">
              Listado de avances
            </label>
            <select className="mt-0 select h-1/4 py-2 px-2 shadow appearance-none border-primary rounded w-full mb-10">
              <option disabled selected>
                Seleccione para previsualizar
              </option>
              <option>Avance 1</option>
              <option>Avance 2</option>
              <option>Avance 3</option>
            </select>
          </div>
    );
};

export default AdvancesList;