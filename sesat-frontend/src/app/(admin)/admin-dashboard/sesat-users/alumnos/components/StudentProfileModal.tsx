"use client";

import { useState, useEffect } from "react";
import {
  RetrievedCommittee,
  Tesis,
  Usuario,
} from "../../../../../../../types/ISESAT";
import Cookies from "js-cookie";
import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import revalidator from "../../../actions";
import { useRouter } from "next/navigation";
import { findTesisPerStudent } from "../../../../../../../utils/tesis.endpoint";
import { retrieveCommittee } from "../../../../../../../utils/comite.endpoint";
import { useDebounce } from "use-debounce";

const StudentProfileModal = ({ user }: { user: Usuario }) => {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showChangeStatusSuccessModal, setShowChangeStatusSuccessModal] =
    useState(false);
  const [showChangeStatusErrorModal, setShowChangeStatusErrorModal] =
    useState(false);

  const [modifyCommittee, setModifyCommittee] = useState<boolean>();

  /* Student Info Section */

  const handleStatusChange = async () => {
    console.log("idusuario: " + user.id_usuario);
    const res = await UsuarioEndpoint.changeStatus(token, user.id_usuario);
    setShowChangeStatusModal(!showChangeStatusModal);
    if (res != null)
      setShowChangeStatusSuccessModal(!showChangeStatusSuccessModal);
    else setShowChangeStatusErrorModal(!showChangeStatusErrorModal);
  };

  const changeStatusErrorModal = (
    <div
      className="relative z-51"
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
                    Operación fallida
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Ha ocurrido un error, por favor intente nuevamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowChangeStatusErrorModal(!showChangeStatusErrorModal);
                  revalidator("PaginatedMastersList");
                  revalidator("PaginatedPhdList");
                  router.refresh();
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

  const changeStatusModal = (
    <div
      className="z-51 relative"
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
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      El status del alumno cambiará a{" "}
                      <span className="font-bold text-dark-blue-10">
                        {user.datos_alumno && user.datos_alumno.estado_activo
                          ? "Inactivo"
                          : "Activo"}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                onClick={handleStatusChange}
              >
                Cambiar
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowChangeStatusModal(!showChangeStatusModal);
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

  const changeStatusSuccessModal = (
    <div
      className="relative z-51"
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
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="40"
                    zoomAndPan="magnify"
                    viewBox="0 0 30 30.000001"
                    height="40"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.0"
                  >
                    <defs>
                      <clipPath id="id1">
                        <path
                          d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 "
                          clipRule="nonzero"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#id1)">
                      <path
                        fill="rgb(0%, 40%, 20%)"
                        d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 "
                        fillOpacity="1"
                        fillRule="nonzero"
                      />
                    </g>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Operación exitosa
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      El status del alumno ha sido modificado con éxito.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowChangeStatusSuccessModal(
                    !showChangeStatusSuccessModal
                  );
                  revalidator("PaginatedMastersList");
                  revalidator("PaginatedPhdList");
                  router.refresh();
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

  const [showStudentInfoSection, setShowStudentInfoSection] =
    useState<boolean>(true);
  const studentInfoSection = (
    <div className="mt-2 px-2 max-h-[500px] overflow-y-auto">
      <p className="font-semibold text-dark-blue-10 text-lg">
        Datos del Alumno
      </p>
      <div className="w-full border border-gray-200 p-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Clave única
              </p>
              <p className="italic">{user.id_usuario}</p>
            </div>
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Nombre
              </p>
              <p className="italic">
                {`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Programa
              </p>
              <p className="italic">
                {user.datos_alumno && user.datos_alumno.programa
                  ? user.datos_alumno.programa.nombre_programa
                  : "Error Obteniendo el Programa"}
              </p>
            </div>
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Grado Estudio
              </p>
              <p className="italic">
                {user.datos_alumno && user.datos_alumno.id_grado_estudio === 1
                  ? "Maestría"
                  : "Doctorado"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Modalidad
              </p>
              <p className="italic">
                {user.datos_alumno && user.datos_alumno.id_modalidad === 1
                  ? "Tiempo Completo"
                  : "Medio Tiempo"}
              </p>
            </div>
            <div className="w-3/6">
              <p className="font-semibold text-dark-blue-10 text-base">
                Generación
              </p>
              <p className="italic">
                {user.datos_alumno
                  ? user.datos_alumno.generacion
                  : "Error Obteniendo la Generación"}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-1 rounded-lg">
            <p className="font-semibold text-dark-blue-10 text-base">Status</p>
            <p className="italic">
              {user.datos_alumno && user.datos_alumno.estado_activo
                ? "Activo"
                : "Inactivo"}
              <span>
                <button
                  className="px-2 text-dark-blue-10 text-[11px] font-bold ml-3 hover:shadow"
                  onClick={() => {
                    setShowModal(!showModal);
                    setShowChangeStatusModal(!showChangeStatusModal);
                  }}
                >
                  Cambiar
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
      <p className="font-semibold text-dark-blue-10 text-lg mt-2">
        Reestablecer Datos del Alumno
      </p>
      <div className="w-full border border-gray-200 p-2">
        <div className="flex flex-col flex-1">
          <p className="italic text-[12px] text-black">
            Esta opción sólo debería usarse en caso de que el alumno cambie de
            programa o haya terminado el posgrado y esté por entrar a otro.
            <br />
            Es un proceso <span className="text-red-600">irreversible.</span>
          </p>
          <div className="w-full flex justify-end px-6">
            <button
              className="px-2 text-red-600 text-[11px] font-bold hover:shadow"
              onClick={() => {}}
            >
              Reestablecer Datos de Alumno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  /* Student Info Section */

  /* Committee Section */
  const [showCommitteeSection, setShowCommitteeSection] =
    useState<boolean>(false);

  const [tesis, setTesis] = useState<Tesis>();
  const [comite, setComite] = useState<RetrievedCommittee>();

  useEffect(() => {
    const getTesis = async () => {
      const tesisData = await findTesisPerStudent(token, user.id_usuario);
      return tesisData;
    };

    const fetchData = async () => {
      if (showCommitteeSection) {
        const tesisData = await getTesis();
        setTesis(tesisData);
      }
    };

    fetchData();
  }, [showCommitteeSection]);

  useEffect(() => {
    console.log("tesis:");
    console.log(tesis);

    const getCommittee = async () => {
      const committeeData = await retrieveCommittee(
        token,
        tesis ? tesis.id_tesis : 0
      );
      return committeeData;
    };

    const fetchData = async () => {
      if (tesis) {
        const committeeData = await getCommittee();
        setComite(committeeData);
      }
    };

    fetchData();
  }, [tesis]);

  /* Search */
  const [text, setText] = useState<string | null>(null);
  const [query] = useDebounce(text, 750);
  const [retrievedAsesor, setRetrievedAsesor] = useState<Usuario[] | null>();

  useEffect(() => {
    const getUsuario = async (op: number) => {
      switch (op) {
        case 1: //find by Id
          const usuarioByIdData: Promise<Usuario[]> =
            UsuarioEndpoint.getUserById(query ? parseInt(query) : 0, token);
          const fetchedUsuarioById = await usuarioByIdData;
          if (fetchedUsuarioById != null) 
            setRetrievedAsesor(fetchedUsuarioById);
          break;
        case 2: //Find by Name
          const usuarioByNameData: Promise<Usuario[]> =
            UsuarioEndpoint.getUserByName(token, query ? query : "");
          const fetchedUsuarioByName = await usuarioByNameData;
          if (fetchedUsuarioByName != null)
            setRetrievedAsesor(fetchedUsuarioByName);
          break;
      }
    };
    if (query != null && query != "") {
      if (!isNaN(Number(query))) {
        //is Nan Shit
        getUsuario(1);
      } else {
        getUsuario(2);
      }
    }
  }, [query]); //,router

  /*const removeUser = (userId: number) => {
    // Find the index of the user with the specified ID
    const userIndex = participants.findIndex(
      (user: Usuario) => user.id_usuario === userId
    );

    if (userIndex !== -1) {
      // Create a new array without the user at the found index
      setParticipants((prevUsers) => [
        ...prevUsers.slice(0, userIndex),
        ...prevUsers.slice(userIndex + 1),
      ]);
    }
  };*/

  const searchBar = (
    <div className="mb-2 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
      <input
        type="search"
        placeholder="Nombre o Clave/RPE"
        className="rounded-full border-b border-light-gray-22 border-solid px-6"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="flex items-center ml-2">
        <svg
          stroke="#d5d3dd"
          fill="#d5d3dd"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path>
        </svg>
      </div>
    </div>
  );
  /* Search */

  const committeeSection = (
    <div className="mt-2 px-2 max-h-[500px] overflow-y-auto">
      <p className="font-semibold text-dark-blue-10 text-lg">
        Datos del Alumno
      </p>
      {tesis && tesis.fecha_registro != null ? (
        <div className="w-full">
          <p className="font-semibold text-dark-blue-10 text-base px-2 mt-2">
            Tesis
          </p>
          <div className="w-full border border-gray-200 p-2">
            <p className="italic">{tesis.titulo}</p>
          </div>
          {modifyCommittee ? (
            <>
              <p className="font-semibold text-dark-blue-10 text-base px-2 mt-2">
                Asesor
              </p>
              <div className="w-full border border-gray-200 p-2 mb-2">

              </div>
              <p className="font-semibold text-dark-blue-10 text-base px-2 mt-2">
                Comite
              </p>
              <div className="w-full border border-gray-200 p-2 mb-2">

              </div>
            </>
          ) : (
            <>
              {comite &&
              tesis.alumno &&
              tesis.alumno.datos_alumno &&
              tesis.alumno.datos_alumno.id_grado_estudio == 1 ? (
                <>
                <p className="font-semibold text-dark-blue-10 text-base px-2 mt-2">
                  Comite
                </p>
                <div className="w-full border border-gray-200 p-2 mb-2">
                  <div>
                    <p className="font-semibold text-dark-blue-10 text-[14px] mb-1">
                      Asesor
                    </p>
                    <p className="italic">
                      {comite.asesor
                        ? comite.asesor.id_usuario
                        : "No se ha definido el Asesor"}
                      <span className="ml-2 border-l border-gray-200 px-3">
                        {comite.asesor
                          ? `${comite.asesor.nombre} ${comite.asesor.apellido_paterno} ${comite.asesor.apellido_materno}`
                          : ""}
                      </span>
                    </p>
                    <p className="font-semibold text-dark-blue-10 text-[14px] my-1">
                      Co-asesor
                    </p>
                    <p className="italic">
                      {comite.coasesor
                        ? comite.coasesor.id_usuario
                        : "No se ha definido el Asesor"}
                      <span className="ml-2 border-l border-gray-200 px-3">
                        {comite.coasesor
                          ? `${comite.coasesor.nombre} ${comite.coasesor.apellido_paterno} ${comite.coasesor.apellido_materno}`
                          : ""}
                      </span>
                    </p>
                    <p className="font-semibold text-dark-blue-10 text-[14px] my-1">
                      Sinodal
                    </p>
                    <p className="italic">
                      {comite.sinodal1
                        ? comite.sinodal1.id_usuario
                        : "No se ha definido el Asesor"}
                      <span className="ml-2 border-l border-gray-200 px-3">
                        {comite.sinodal1
                          ? `${comite.sinodal1.nombre} ${comite.sinodal1.apellido_paterno} ${comite.sinodal1.apellido_materno}`
                          : ""}
                      </span>
                    </p>
                    <p className="font-semibold text-dark-blue-10 text-[14px] my-1">
                      Sinodal
                    </p>
                    <p className="italic">
                      {comite.sinodal2
                        ? comite.sinodal2.id_usuario
                        : "No se ha definido el Asesor"}
                      <span className="ml-2 border-l border-gray-200 px-3">
                        {comite.sinodal2
                          ? `${comite.sinodal2.nombre} ${comite.sinodal2.apellido_paterno} ${comite.sinodal2.apellido_materno}`
                          : ""}
                      </span>
                    </p>
                    <p className="font-semibold text-dark-blue-10 text-[14px] my-1">
                      Suplente
                    </p>
                    <p className="italic">
                      {comite.suplente
                        ? comite.suplente.id_usuario
                        : "No se ha definido el Asesor"}
                      <span className="ml-2 border-l border-gray-200 px-3">
                        {comite.suplente
                          ? `${comite.suplente.nombre} ${comite.suplente.apellido_paterno} ${comite.suplente.apellido_materno}`
                          : ""}
                      </span>
                    </p>
                    <div className="w-full flex justify-end px-4">
                      <button
                        className="px-2 text-dark-blue-10 text-[11px] font-bold hover:shadow"
                        onClick={() => {
                          setModifyCommittee(!modifyCommittee);
                        }}
                      >
                        Modificar Comité
                      </button>
                    </div>
                  </div>
                </div>
                </>
              ) : (
                "Datos Inconsistentes"
              )}
            </>
          )}
        </div>
      ) : (
        <div className="w-full">
          <p className="font-semibold text-dark-blue-10 text-base">Tesis</p>
          <p className="italic">
            El alumno aún no ha realizado su registro de Tesis
          </p>
        </div>
      )}
    </div>
  );
  /* Committee Section */

  /* Tabs */
  const [cssTab0, setCssTab0] = useState("");
  const [cssTab1, setCssTab1] = useState("");
  const [tab, setTab] = useState<number>(0);

  const setActiveTab = (tab: number) => {
    switch (tab) {
      case 1:
      default:
        setTab(1);
        setCssTab0("tab-active");
        setCssTab1("");
        break;
      case 2:
        setTab(2);
        setCssTab0("");
        setCssTab1("tab-active");
        break;
    }
  };

  useEffect(() => {
    setActiveTab(tab);
  }, []);

  const Tabs = (
    <div className="tabs mt-4 px-2">
      <button
        className={`text-bold text-dark-blue-10 text-lg tab tab-lifted ${cssTab0}`}
        onClick={() => {
          setActiveTab(1);
          if (!showStudentInfoSection) {
            setShowStudentInfoSection(!showStudentInfoSection);
            setShowCommitteeSection(!showCommitteeSection);
          }
        }}
      >
        Actualizar Datos del Alumno
      </button>
      <button
        className={`text-bold text-dark-blue-10 text-lg tab tab-lifted ${cssTab1}`}
        onClick={() => {
          setActiveTab(2);
          if (!showCommitteeSection) {
            setShowStudentInfoSection(!showStudentInfoSection);
            setShowCommitteeSection(!showCommitteeSection);
          }
        }}
      >
        Modificar Comité del Alumno
      </button>
    </div>
  );
  /* Tabs */

  return (
    <>
      <button
        className="bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-full shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modificar
      </button>
      {showChangeStatusModal ? <>{changeStatusModal}</> : ""}
      {showChangeStatusSuccessModal ? <>{changeStatusSuccessModal}</> : ""}
      {showChangeStatusErrorModal ? <>{changeStatusErrorModal}</> : ""}
      {showModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-w-[600px] my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-2 outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-2 border-b-2 border-gray-300">
                  <h3 className="text-2xl font-semibold text-dark-blue-10">
                    Editar datos del Alumno
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 hover:text-black text-gray-300 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
                {Tabs}
                {showStudentInfoSection ? studentInfoSection : ""}
                {showCommitteeSection ? committeeSection : ""}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default StudentProfileModal;
