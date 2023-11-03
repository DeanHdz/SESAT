'use client';
import { ExternalUser } from "../../../../../../../../types/ISESAT";
import { useState } from "react";
import { CreateExternalUser } from "../../../../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../../../../utils/usuario.endpoint";
import { useRouter } from 'next/navigation';

export default function AddUserForm({ user, id }: { user: ExternalUser, id: number }) {
  const router = useRouter();
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

  const handleSubmit = async () => {
    const data: CreateExternalUser = {
      id: id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      dedicacion: user.dedicacion,
      programa: user.programa,
      grado_estudio: user.grado_estudio,
      gen: user.gen,
      status: user.status,
      skipToAvance: selectedOption != "" ? parseInt(selectedOption) : null,
    }

    const res = await UsuarioEndpoint.postExternalStudent("[Token]", data);
    setShowModal(!showModal);
    if(res)
      setShowSuccessModal(!showSuccessModal);
  }

  const options = (
    <select
      className="block w-3/6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      placeholder="Seleccione un avance"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="" className="text-gray-500">Seleccione una opción</option>
      {avances.map((avance, i) => (
        <option key={i + 1} value={i+1} className="text-gray-800">
          {avance}
        </option>
      ))}
    </select>
  );

  const modal = (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Verificar Acción</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Verifique que los datos del alumno sean correctos. El alumno será agregado al sistema con estado <span className="font-bold text-dark-blue-10">activo</span>.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button 
                type="button" 
                className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                onClick={
                  handleSubmit
                }
              >
                Agregar
              </button>
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [check, setCheck] = useState<boolean | undefined>(false);
  const [showModal, setShowModal] = useState<boolean | undefined>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean | undefined>(false);

  const successModal = (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0">
                    <defs>
                      <clipPath id="id1">
                        <path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clipRule="nonzero"/>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#id1)">
                      <path fill="rgb(0%, 40%, 20%)" d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fillOpacity="1" fillRule="nonzero"/>
                    </g>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Operación exitosa</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">El alumno ha sido agregado al sistema con éxito.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"> 
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowSuccessModal(!showSuccessModal);
                  router.push("/admin-dashboard/sesat-users/alumnos/register");
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        <button 
          type="button" 
          className="primary__btn"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          Registrar alumno en SESAT
        </button>
      </div>
      {showModal ? 
        (
          <>
            {modal}
          </>
        ) : (
          ""
        )
      }
      {showSuccessModal ? 
        (
          <>
            {successModal}
          </>
        ) : (
          ""
        )
      }
    </div>
    
  );
}
