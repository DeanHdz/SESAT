"use client";
import { ChangeEvent, useState } from "react";
import { CreateForeignAsesor, UsuarioPrueba } from "../../../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import { useRouter } from "next/navigation";
import revalidator from "../../../actions";

export const AsesorRegistryForm = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (event: any) => {
    setUserType(event.target.value);
  };

  //
  const [selectedUser, setSelectedUser] = useState<UsuarioPrueba | null>(null);
  const [claveUnica, setClaveUnica] = useState("");
  const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
  const [usuariosPrueba, setUsuariosPrueba] = useState<
    UsuarioPrueba[] | undefined
  >();
  //

  const [foreignNombre, setForeignNombre] = useState<string | undefined>(
    undefined
  );
  const [foreignApPaterno, setForeignApPaterno] = useState<string | undefined>(
    undefined
  );
  const [foreignApMaterno, setForeignApMaterno] = useState<string | undefined>(
    undefined
  );
  const [foreignCorreo, setForeignCorreo] = useState<string | undefined>(
    undefined
  );
  const [foreignOrganizacion, setForeignOrganizacion] = useState<
    string | undefined
  >(undefined);
  const [foreignTelefono, setForeignTelefono] = useState<string | undefined>(
    undefined
  );

  const [showModal1, setShowModal1] = useState<boolean | undefined>(false);
  const [errorState1, setErrorState1] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean | undefined>(false);

  const postForeignAsesor = async () => {
    const foreignAsesorDto: CreateForeignAsesor = {
      nombre: foreignNombre ? foreignNombre : "",
      apellido_materno: foreignApMaterno ? foreignApMaterno : "",
      apellido_paterno: foreignApPaterno ? foreignApPaterno : "",
      telefono: foreignTelefono ? parseInt(foreignTelefono) : 0,
      correo: foreignCorreo ? foreignCorreo : "",
      organizacion: foreignOrganizacion ? foreignOrganizacion : "", 
    }

    const asesor = await UsuarioEndpoint.postForeignAsesor("[Token]", foreignAsesorDto)

    if(asesor != null)
      setShowSuccessModal(!showSuccessModal);
  }

  const modal1 = (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Verificar Acción
                  </h3>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      Verifique que los datos del asesor externo sean correctos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-2 gray__border w-full px-2 py-2 flex flex-col md:flex-row">
                <div className="flex flex-col lg:w-3/6">
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Nombre:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignNombre}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Apellido Materno:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignApMaterno}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Correo:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignCorreo}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col lg:w-3/6">
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Apellido Paterno:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignApPaterno}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Teléfono:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignTelefono}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-bold text-dark-blue-10 text-sm">
                      Institución/Organización:
                    </span>
                    <br />
                    <span className="text-base text-dark-blue-20 italic">
                      {foreignOrganizacion}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                onClick={postForeignAsesor}
              >
                Agregar
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowModal1(!showModal1);
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
                    <p className="text-sm text-gray-500">El asesor ha sido agregado al sistema con éxito.</p>
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
                  revalidator("FetchedExternalAsesor");
                  router.push("/admin-dashboard/sesat-users/asesores/register");
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

  const handleSubmit = () => {
    if (userType === "asesor") {

    }
    else if (userType === "externo") {
      setErrorState1(!errorState1);
      if (
        foreignNombre != undefined &&
        foreignApMaterno != undefined &&
        foreignApPaterno != undefined &&
        foreignCorreo != undefined &&
        foreignOrganizacion != undefined &&
        foreignTelefono?.length === 10
      ){
        setErrorState1(!errorState1);
        setShowModal1(!showModal1);
      } 
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="h-fit w-full gray__border mt-10 p-6">
          <span className="font-bold text-dark-blue-10 text-lg">
            Complete los siguientes datos para realizar el registro.
          </span>
          <div className="mt-2 flex lg:items-center flex-col lg:flex-row w-full h-fit">
            <span className="relative top-2">
              ¿El asesor es actualmente profesor del área de posgrados?
            </span>
            <select
              onChange={handleUserTypeChange}
              className="select select-bordered max-w-sm lg:ml-3 mt-3"
            >
              <option value="" disabled selected>
                Seleccione
              </option>
              <option value={"asesor"}>Sí</option>
              <option value={"externo"}>
                No, pertenece a otra institución/organización
              </option>
            </select>
          </div>

          {userType === "asesor" && (
            <div className={`h-fit w-full my-10`}>
              <div className="flex flex-col mt-10">
                <span className="mt-3">
                  Ingrese la clave única o el nombre asesor para buscar,
                  seleccione una opción.
                </span>
                <div className="mt-6">
                  <input
                    type="number"
                    placeholder="Clave única"
                    maxLength={6}
                    className="gray__border input-bordered w-full max-w-lg"
                    value={claveUnica}
                    onChange={(e) => {
                      setClaveUnica(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 bg-white gray__border p-3">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/*Table head */}
                    <thead>
                      <tr className="text-dark-blue-20">
                        <th></th>
                        <th>Clave Única</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosPrueba?.map((user) => (
                        <tr
                          key={user.clave_unica}
                          onClick={() => setSelectedUser(user)}
                          /** Visualizar la seleccion de un renglon*/
                          className={
                            selectedUser?.clave_unica === user.clave_unica
                              ? "bg-white cursor-pointer"
                              : "cursor-pointer"
                          }
                        >
                          <td>{user.clave_unica}</td>
                          <td>{`${user.nombre} ${user.apellido_pat} ${user.apellido_mat}`}</td>
                          <td>{user.correo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {userType === "externo" && (
            <div className={`h-fit w-full my-6 gray__border px-2 py-2`}>
              <span className="mt-3">
                Ingrese los siguientes datos del asesor.
              </span>
              { errorState1 ? (<><br /><span className="mt-1 text-red-600">Campos incompletos o incorrectos</span></>) : ("") }
              <div className="flex flex-col lg:flex-row w-full my-2 gap-x-2">
                <div className="flex flex-col lg:w-3/6">
                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Nombre
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={foreignNombre}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignNombre(e.target.value);
                      }}
                      required
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>

                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Apellido Materno
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Apellido Materno"
                      value={foreignApMaterno}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignApMaterno(e.target.value);
                      }}
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>

                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Correo
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Correo"
                      value={foreignCorreo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignCorreo(e.target.value);
                      }}
                      required
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:w-3/6">
                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Apellido Paterno
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Apellido Paterno"
                      value={foreignApPaterno}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignApPaterno(e.target.value);
                      }}
                      required
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>

                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Teléfono
                        <span className="text-[10px]"> (10 dígitos)</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="Número de teléfono a 10 dígitos"
                      maxLength={10}
                      minLength={10}
                      value={foreignTelefono}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignTelefono(e.target.value);
                      }}
                      required
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>

                  <div>
                    <label className="label relative top-2">
                      <span className="label-text text-dark-blue-10 italic font-semibold">
                        Institución/Organización
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={foreignOrganizacion}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForeignOrganizacion(e.target.value);
                      }}
                      required
                      className="gray__border input-bordered w-full lg:max-w-[400px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full mt-6 flex justify-end">
            <button
              type="button"
              className="primary__btn"
              onClick={handleSubmit}
            >
              Registrar asesor en SESAT
            </button>
          </div>
        </div>
      </div>
      {showModal1 ? <>{modal1}</> : ""}
      {showSuccessModal ? 
        (
          <>
            {successModal}
          </>
        ) : (
          ""
        )
      }
    </>
  );
};

export default AsesorRegistryForm;
