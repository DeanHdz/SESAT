'use client';
import { ExternalUser } from "../../../../../../../../types/ISESAT";
import { ChangeEvent, useState } from "react";

export default function AddUserForm({ user }: { user: ExternalUser }) {

  let modalidad = "Indeterminado";
  switch (user.dedicacion) {
    case "MT":
      modalidad = "Medio Tiempo";
      break;
    case "TC":
      modalidad = "Tiempo Completo";
      break;
  }
  let estado = "Indeterminado";
  switch (user.status) {
    case "Eg":
      estado = "Egresado";
      break;
    case "Al":
      estado = "Alumno";
      break;
    case "Bt":
      estado = "Baja Temporal";
      break;
    case "Ba":
      estado = "Baja Definitiva";
      break;
  }

  const avances: string[] = [];
  switch(user.grado_estudio)
  {
    case "Maestría":
      switch(user.dedicacion)
      {
        case "MT":
          avances.push("Seminario de Investigación");
          avances.push("Avance 1");
          avances.push("Seminario de Tesis I (20% de Avance)");
          avances.push("Avance 3");
          avances.push("Seminario de Tesis II (50% de Avance)");
          avances.push("Avance 5");
          avances.push("Seminario de Tesis III (90% de Avance)");
          break;
        case "TC":
          avances.push("Seminario de Investigación");
          avances.push("Seminario de Tesis I (20% de Avance)");
          avances.push("Seminario de Tesis II (50% de Avance)");
          avances.push("Seminario de Tesis III (90% de Avance)");
          break;
      }
      break;
    case "Doctorado":
      avances.push("Seminario de Avance de Tesis 1");
      avances.push("Seminario de Avance de Tesis 2");
      avances.push("Seminario de Avance de Tesis 3");
      avances.push("Seminario de Avance de Tesis 4");
      avances.push("Seminario de Avance de Tesis 5");
      avances.push("Seminario de Avance de Tesis 6");
      avances.push("Seminario de Avance de Tesis 7");
      avances.push("Seminario de Avance de Tesis 8");
      break;
  }
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const options = (
    <select
      className="block w-3/6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      placeholder="Seleccione un avance"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="" className="text-gray-500">Seleccione una opción</option>
      {avances.map((avance, i) => (
        <option key={i + 1} value={i} className="text-gray-800">
          {avance}
        </option>
      ))}
    </select>
  );

  const [check, setCheck] = useState<boolean | undefined>(false);


  return (
    <div className="w-full gray__border  bg-light-blue-10">
      <div className="w-full mt-4 pl-8 text-2xl font-bold text-dark-blue-10 italics">
        Datos del alumno:
      </div>
      <div className="flex flex-row justify-center">
        <div className="w-3/6 h-fit pl-8 pt-6">
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">Nombre:</span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.nombre}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Apellidos:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.apellidos}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">Correo:</span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.email}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Grado Estudio:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.grado_estudio}
            </span>
          </p>
        </div>
        <div className="w-3/6 h-fit pl-8 pt-6">
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Programa:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.programa}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Modalidad:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {modalidad}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Generación:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">
              {user.gen}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-bold text-dark-blue-10 text-lg">
              Estado Actual:
            </span>
            <br />
            <span className="text-base text-dark-blue-20 italic">{estado}</span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <span className="pl-8">
          <input type="checkbox" defaultChecked={check} className="checkbox checkbox-md" 
            onClick={() => {
              setCheck(!check);
            }}          
          />
          <span className="ml-2 text-base text-dark-blue-20 italic">¿El alumno tiene avances previos a ingresar al sistema?</span>
        </span>
      </div>
      {check ? 
        (
          <div className="pl-8 my-2">
            {options}
          </div>
        ) : (
          ""
        )
      }
      <div className="w-full flex justify-end pr-8 mb-4">
        <button type="button" className="primary__btn">
          Registrar alumno en SESAT
        </button>
      </div>
    </div>
  );
}
