"use client";
import React, { FormEvent, useEffect, useState } from "react";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { EventoEndpoint } from "../../../../../utils/evento.endpoint";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { AsesorEventDto, CreateEventByType, Tesis, Usuario } from "../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../utils/usuario.endpoint";
import revalidator from "../actions";
import { getAsesorTesisList } from "../../../../../utils/comite.endpoint";

const AddEventModal = ({
  startDate,
  endDate,
  isClicked,
  token,
  id_usuario,
}: {
  startDate: Date;
  endDate: Date;
  isClicked: boolean;
  token: string;
  id_usuario: number;
}) => {
  const router = useRouter();

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const days = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState<Date>(startDate);
  const [end, setEndDate] = useState<Date | undefined>(endDate);
  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean | undefined>(false);
  const [fetchTesis, setFetchTesis] = useState<boolean>(false);
  const [tesisList, setTesisList] = useState<Tesis[] | null>(null);
  const [selectedTesis, setSelectedTesis] = useState<number>(-1);

  useEffect(() => {
    const getTesisList = async () => {
      const list: Tesis[] = await getAsesorTesisList(token, id_usuario);
      setTesisList(list);
    };
    getTesisList();
  }, [fetchTesis]);

  useEffect(() => {
    setStartDate(
      new Date(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      )
    );
  }, [startDate]);

  useEffect(() => {
    setEndDate(endDate);
  }, [endDate]);

  const handleStartDate = (event: any) => {
    let date = event.target.value.split("-");
    console.log(date);
    setStartDate(new Date(date[0], date[1] - 1, date[2]));
  };

  const handleEndDate = (event: any) => {
    let date = event.target.value.split("-");
    console.log(date);
    setEndDate(new Date(date[0], date[1] - 1, date[2]));
  };

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
    <div className="tabs mt-4">
      <button
        className={`text-bold text-dark-blue-10 text-lg tab tab-lifted ${cssTab0}`}
        onClick={() => {
          setActiveTab(1);
          if (showListSection) setShowListSection(!showListSection);
          if (!showAddSection) setShowAddSection(!showAddSection);
        }}
      >
        Añadir Participantes
      </button>
      <button
        className={`text-bold text-dark-blue-10 text-lg tab tab-lifted ${cssTab1}`}
        onClick={() => {
          setActiveTab(2);
          if (showAddSection) setShowAddSection(!showAddSection);
          if (!showListSection) setShowListSection(!showListSection);
        }}
      >
        Ver Listado de Participantes
      </button>
    </div>
  );
  /* Tabs */

  /* Section States */
  const [showAddSection, setShowAddSection] = useState<boolean | undefined>(
    true
  );
  const [showListSection, setShowListSection] = useState<boolean | undefined>(
    false
  );
  /* Section States */

  /* AddSection */

  /* Search */
  const [text, setText] = useState<string | null>(null);
  const [query] = useDebounce(text, 750);
  const [usuario, setUsuario] = useState<Usuario[] | null>();

  useEffect(() => {
    const getUsuario = async (op: number) => {
      switch (op) {
        case 1: //find by Id
          const usuarioByIdData: Promise<Usuario[]> =
            UsuarioEndpoint.getUserById(query ? parseInt(query) : 0, token);
          const fetchedUsuarioById = await usuarioByIdData;
          if (fetchedUsuarioById != null) setUsuario(fetchedUsuarioById);
          break;
        case 2: //Find by Name
          const usuarioByNameData: Promise<Usuario[]> =
            UsuarioEndpoint.getUserByName(token, query ? query : "");
          const fetchedUsuarioByName = await usuarioByNameData;
          if (fetchedUsuarioByName != null) setUsuario(fetchedUsuarioByName);
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

  const removeUser = (userId: number) => {
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
  };

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

  const [addSectionGate, setAddSectionGate] = useState<number>(0);
  const [btn1Active, setBtn1Active] = useState<boolean>(false);
  const [btn2Active, setBtn2Active] = useState<boolean>(false);

  const [participants, setParticipants] = useState<Usuario[]>([]);

  const AddSection = (
    <div>
      <div className="w-full">
        {participants.length === 0 ? (
          <>
            <p className="my-3 italics text-dark-blue-10 font-semibold">
              Elegir a los participantes por comité de Tesis:
            </p>
            {tesisList ? (
              <div className="max-h-[200px] overflow-y-auto">
                {selectedTesis === -1 ? (
                  tesisList?.map((tesis: Tesis, i: number) => (
                    <div key={i} className="flex gray__border p-2">
                      <div className="w-full flex px-2">
                        <div className="w-5/6">
                          <span className="text-[12px] text-dark-blue-10 italic">
                            {tesis.titulo}
                          </span>
                          <br />
                          <span className="px-2 text-[11px] font-semibold">
                            {tesis.alumno
                              ? `${tesis.alumno.nombre} ${tesis.alumno.apellido_paterno} ${tesis.alumno.apellido_materno}`
                              : ""}
                          </span>
                        </div>
                        <div className="w-1/6 h-full flex justify-center align-middle items-center">
                          <button
                            className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center p-1"
                            onClick={() => {
                              setSelectedTesis(i);
                              setAddSectionGate(addSectionGate + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gray__border p-2">
                      <div className="w-full flex px-2">
                        <div className="w-5/6">
                          <span className="text-[12px] text-dark-blue-10 italic">
                            {tesisList[selectedTesis].titulo}
                          </span>
                          <br />
                          <span className="px-2 text-[11px] font-semibold">
                            {tesisList[selectedTesis].alumno
                              ? `${tesisList[selectedTesis].alumno.nombre} ${tesisList[selectedTesis].alumno.apellido_paterno} ${tesisList[selectedTesis].alumno.apellido_materno}`
                              : ""}
                          </span>
                        </div>
                        <div className="w-1/6 h-full flex justify-center align-middle items-center text-[12px] italic text-dark-blue-10">
                          Seleccionada
                        </div>
                      </div>
                    </div>
                    <div className="w-full py-2 flex items-center justify-center align-middle">
                      <button
                        type="button"
                        className={`${
                          btn1Active
                            ? "bg-dark-blue-10 text-white border border-white"
                            : "text-dark-blue-10 border-blue-700 border"
                        } font-bold rounded-lg text-sm text-center px-2 py-2`}
                        onClick={() => {
                          setBtn1Active(!btn1Active);
                        }}
                      >
                        Presentación de Avance
                      </button>
                    </div>
                    {btn1Active ? (
                      <p className="italics text-[11px] text-dark-blue-10 w-full text-center">El evento establecerá la fecha de presentación para la asignación activa si es posible o actualizará la fecha establecida.</p>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            ) : (
              "No es asesor de ningnua tesis."
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {addSectionGate === 0 ? (
        <>
          <p className="my-2 italics font-semibold text-dark-blue-10">
            Buscar participantes:
          </p>
          {searchBar}
          <div className="max-h-[250px] overflow-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="text-dark-blue-20 w-[25px]">
                  <th></th>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Apellidos</th>
                  <th className="text-center">Añadir</th>
                </tr>
              </thead>
              <tbody>
                {usuario?.map((user: Usuario) => (
                  <tr>
                    <td className="w-[25px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    </td>
                    <td className="text-center">{user?.nombre}</td>
                    <td className="text-center">{`${user?.apellido_paterno} ${user?.apellido_materno}`}</td>
                    <td className="text-center">
                      {participants.length > 0 &&
                      participants.some(
                        (newUser: Usuario) =>
                          newUser.id_usuario === user.id_usuario
                      ) ? (
                        ""
                      ) : (
                        <button
                          className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center p-1"
                          onClick={() => {
                            if (
                              !participants.some(
                                (newUser: Usuario) =>
                                  newUser.id_usuario === user.id_usuario
                              )
                            )
                              setParticipants((prevArray) => [
                                ...prevArray,
                                user,
                              ]);
                          }}
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );

  /* AddSection */

  /* ListSection */
  const ListSection = (
    <div className="gray__border p-2">
      <p className="font-semibold">Se asignará a los usuarios seleccionados:</p>
      {tesisList && selectedTesis !== -1 ? (
        <>
        <p className="text-[14px]">Alumno y miembros del comité de la Tesis:</p>
        <div className="flex gray__border p-2">
        <div className="w-full flex px-2">
          <div className="w-5/6">
            <span className="text-[12px] text-dark-blue-10 italic">
              {tesisList[selectedTesis].titulo}
            </span>
            <br />
            <span className="px-2 text-[11px] font-semibold">
              {tesisList[selectedTesis].alumno
                ? `${tesisList[selectedTesis].alumno.nombre} ${tesisList[selectedTesis].alumno.apellido_paterno} ${tesisList[selectedTesis].alumno.apellido_materno}`
                : ""}
            </span>
          </div>
          <div className="w-1/6 h-full flex justify-center align-middle items-center">
          <button
            className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center p-1"
            onClick={() => {
              setSelectedTesis(-1);
              setAddSectionGate(addSectionGate - 1);
              if(btn1Active)
              {
                setBtn1Active(!btn1Active)
              }
            }}
          >
            -
          </button>
          </div>
        </div>
      </div>
      </>
      ) : (
        ""
      )}     
      {participants.length > 0 ? (
        <div className="max-h-[250px] overflow-auto mt-2">
          <table className="table table-zebra">
            <thead>
              <tr className="text-dark-blue-20 w-[25px]">
                <th></th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Apellidos</th>
                <th className="text-center">Remover</th>
              </tr>
            </thead>
            <tbody>
              {participants?.map((user: Usuario) => (
                <tr>
                  <td className="w-[25px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </td>
                  <td className="text-center">{user?.nombre}</td>
                  <td className="text-center">{`${user?.apellido_paterno} ${user?.apellido_materno}`}</td>
                  <td className="text-center">
                    <button
                      className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center p-1"
                      onClick={() => {
                        removeUser(user.id_usuario);
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  /* ListSection */

  const [showSuccessModal, setShowSuccessModal] = useState<boolean | undefined>(
    false
  );
  const [showErrorModal, setShowErrorModal] = useState<boolean | undefined>(
    false
  );
  const [showErrorModal2, setShowErrorModal2] = useState<boolean | undefined>(
    false
  );

  const successModal = (
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
                      El evento ha sido agregado al sistema con éxito.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <a
                href="/admin-dashboard"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  router.refresh();
                }}
              >
                Cerrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const errorModal = (
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
              <a
                href="/admin-dashboard"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  router.refresh();
                }}
              >
                Cerrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const errorModal2 = (
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
                    Operación fallida
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      La fecha de fin debe ser distinta a 00:00:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <a
                href="/admin-dashboard"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  router.refresh();
                }}
              >
                Cerrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modal = (
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
              <div className="w-full flex justify-start">{Tabs}</div>
              <div className="flex flex-col mt-2">
                {showAddSection ? <>{AddSection}</> : ""}
                {showListSection ? <>{ListSection}</> : ""}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                onClick={() => {
                  setShowModal(!showModal);
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

  useEffect(() => {
    if (start) {
      const newEndDate = new Date(start.getTime() + 30 * 60000);
      setEndDate(newEndDate);
    }
  }, [start]);

  useEffect(() => {
    if (end != undefined && end < start) {
      const newEndDate = new Date(start.getTime() + 30 * 60000);
      setEndDate(newEndDate);
    }
  }, [end]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let evento = null;
    let escape = 0;
    if (
      end?.getHours() == 0 &&
      end?.getMinutes() == 0 &&
      end?.getSeconds() == 0
    ) {
      escape = 1;
    } else if (
      btn1Active == false &&
      btn2Active == false &&
      participants.length == 0
    ) {
      evento = await EventoEndpoint.postEvento(
        {
          id_usuario: id_usuario, //!
          id_creador: id_usuario, //!
          titulo: title,
          fecha_inicio: start,
          fecha_termino: end ? end : start,
        },
        token
      );
    }
    else if(tesisList && selectedTesis !== -1 && btn1Active){
      console.log("here");
      const EventoDto: AsesorEventDto = {
        id_tesis: tesisList[selectedTesis].id_tesis,
        presentation: true,
        id_usuario: id_usuario,
        title: title,
        start: start,
        end: end ? end : start
      } 
      console.log(EventoDto)
      evento = await EventoEndpoint.postAsesorEvent(token, EventoDto)
    }
    else if(tesisList && selectedTesis !== -1)
    {
      const EventoDto: AsesorEventDto = {
        id_tesis: tesisList[selectedTesis].id_tesis,
        presentation: false,
        id_usuario: id_usuario,
        title: title,
        start: start,
        end: end ? end : start
      } 
      evento = await EventoEndpoint.postAsesorEvent(token, EventoDto)
    }
    else if (participants.length > 0) {
      const createEventoDto: CreateEventByType = {
        users: participants,
        type: 3,
        id: id_usuario,
        id_creador: id_usuario,
        title: title,
        start: start,
        end: end ? end : start,
      };
      evento = await EventoEndpoint.postEventByType(createEventoDto, token);
    }
    //Rework From Here

    if (evento != null) {
      revalidator("Eventos");
      setShowSuccessModal(!showSuccessModal);
    } else if (escape == 0) setShowErrorModal(!showErrorModal);
    else setShowErrorModal2(!showErrorModal2);
  };

  return (
    <dialog id="add_event_modal" className="modal">
      {showModal ? <>{modal}</> : ""}
      {showSuccessModal ? <>{successModal}</> : ""}
      {showErrorModal ? <>{errorModal}</> : ""}
      {showErrorModal2 ? <>{errorModal2}</> : ""}
      <div className="modal-box max-w-[500px]">
        <div className="w-full flex border-b-2 border-gray-300">
          <h3 className="flex justify-start font-extrabold text-lg w-5/6 text-dark-blue-10">
            Crear Nuevo Evento
          </h3>
          <div className="flex justify-end">
            <a
              href="/admin-dashboard"
              className="text-gray-300 appearance-none outline-none hover:text-dark-blue-20"
              onClick={() => {
                router.refresh();
              }}
            >
              Cerrar
            </a>
          </div>
        </div>
        <div className="w-full flex flex-row h-fit">
          <div className="flex flex-col justify-center">
            <div className="font-bold text-xl text-center">
              {months[start.getMonth()]}
            </div>
            <div className="font-bold text-3xl text-center">
              {start.getDate().toString()}
            </div>
            <div className="font-light text-sm text-center">
              {days[start.getDay()!]}
            </div>
            <input
              className="w-[44px] h-[32px] border-none select-none outline-none"
              type="date"
              value={start.toISOString().split("T")[0]}
              onChange={handleStartDate}
            />
          </div>
          {!isClicked && (
            <>
              <label className="mx-auto  flex items-center font-thin text-sm">
                hasta
              </label>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xl text-center">
                  {months[end ? end.getMonth() : start.getMonth()]}
                </div>
                <div className="font-bold text-3xl text-center">
                  {end?.getDate().toString()}
                </div>
                <div className="font-light text-sm text-center">
                  {days[end?.getDay()!]}
                </div>
                <input
                  className="w-[44px] h-[32px] border-none select-none outline-none"
                  type="date"
                  value={end?.toISOString().split("T")[0]}
                  onChange={handleEndDate}
                />
              </div>
            </>
          )}
        </div>
        <div className="border-b gray__border mb-3"></div>
        <div className="modal-action flex flex-col w-full">
          {/* if there is a button in form, it will close the modal */}
          {changeDate ? (
            <div>
              <a>Fecha Termino</a>
              <input type="date" value={endDate.toISOString()} />
            </div>
          ) : (
            ""
          )}
          <form method="submit" onSubmit={handleSubmit} className="">
            <div className="h-fit flex flex-row w-full items-center mb-3">
              <div className="w-[24px] mr-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.005 5.995h-1v2h1v8h-1v2h1c1.103 0 2-.897 2-2v-8C22.005 6.893 21.107 5.995 20.005 5.995zM6.005 9.995H15V13.995H6.005z"></path>
                  <path d="M17.005,17.995v-12V4H20V2h-8v2h3.005v1.995h-11c-1.103,0-2,0.897-2,2v8c0,1.103,0.897,2,2,2h11V20H12v2h8v-2h-2.995 V17.995z M4.005,15.995v-8h11v8H4.005z"></path>
                </svg>
              </div>
              <input
                type="text"
                value={title}
                placeholder="Título"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="gray__border input-bordered w-full"
              />
            </div>
            {/**Fecha Inicio */}
            <div className="h-fit flex flex-row w-full items-center mb-3">
              <div className="w-[24px] mr-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                  <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                </svg>
              </div>
              <p>Inicio</p>
              <Flatpickr
                className="gray__border w-full ml-3"
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                  static: true,
                  minTime: "00:05",
                }}
                //data-enable-time

                placeholder="Inicio"
                value={start}
                onChange={([date]) => {
                  console.log("The date is " + date);
                  setStartDate(date);
                }}
              />
            </div>

            {/**Fecha Fin */}
            <div className="h-fit flex flex-row w-full items-center mb-3">
              <div className="w-[24px] mr-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                  <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                </svg>
              </div>
              <p>Fin</p>
              <Flatpickr
                className="gray__border w-full ml-3"
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                  static: true,
                }}
                placeholder="Fin  "
                value={end}
                onChange={([date]) => {
                  setEndDate(date);
                }}
              />
            </div>

            <button
              className="btn btn-sm btn-active btn-ghost"
              type="button"
              onClick={() => {
                setShowModal(!showModal);
                if (!fetchTesis) setFetchTesis(!fetchTesis);
              }}
            >
              Agregar Participantes
            </button>

            <div className="w-full flex justify-end mt-3">
              <button className="primary__btn" type="submit">
                Crear evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddEventModal;
