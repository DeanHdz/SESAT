"use client";

import revalidator from "../actions";
import { Evento, Usuario } from "../../../../../types/ISESAT";
import { EventoEndpoint } from "../../../../../utils/evento.endpoint";
import { getFormattedHours } from "../../../../../utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoggedUser } from "../../../../../types/ISESAT";
import { LoginEndpoint } from "../../../../../utils/login.endpoint";

const ViewEventModal = ({
  eventTitle,
  startDate,
  endDate,
  token,
}: {
  eventTitle: string;
  startDate: Date;
  endDate: Date | null;
  token: string,
}) => {
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

  /*const getRelatedEvents = async () => {
    const eventosData: Promise<Evento[]> = EventoEndpoint.getEventosByTitle(
      "",
      eventTitle
    ); //hard admin id
    const eventos = await eventosData;
    return eventos;
  };*/
  const split = eventTitle ? eventTitle.split("!!") : [];

  const [eventList, setEventList] = useState<Evento[]>([]);
  const [participants, setParticipants] = useState<Usuario[]>([]);
  const [loggedUser, setLoggeduser] = useState<LoggedUser>();
  
  useEffect(() => {
    const getLoggedUser = async () => {
      const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
      return user;
    }
    const getParticipants = async () => {
      const participantesData = await EventoEndpoint.getParticipants(
        token,
        eventTitle
      );
      return participantesData;
    };
    const getRelatedEvents = async () => {
      const eventosData = await EventoEndpoint.getEventosByTitle(
        token,
        eventTitle
      );
      return eventosData;
    };

    const fetchData = async () => {
      if (eventTitle) {
        const retrievedLoggedUser = await getLoggedUser()
        setLoggeduser(retrievedLoggedUser);
        const events = await getRelatedEvents();
        setEventList(events);
        const retrievedParticipants = await getParticipants();
        setParticipants(retrievedParticipants);
      }
    };

    fetchData();
  }, [eventTitle]);

  /*eventTitle ? getRelatedEvents() : ""*/
  const router = useRouter();

  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [showModal1, setShowModal1] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleDeletion = async () => {
    const eventosData = await EventoEndpoint.deleteEventosByTitle(
      "",
      eventTitle
    );
    if (eventosData != null) {
      revalidator("Eventos");
      setShowSuccessModal(!showSuccessModal);
    } else setShowErrorModal(!showErrorModal);
  };

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
                    Confirmar eliminación
                  </h3>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      El evento será eliminado para todos los participantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto"
                onClick={handleDeletion}
              >
                Eliminar
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
                      Por favor intente nuevamente.
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
                      El evento ha sido eliminado del sistema con éxito.
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

  return (
    <dialog id="view_event_modal" className="modal">
      {showModal1 ? <>{modal1}</> : ""}
      {showErrorModal ? <>{errorModal}</> : ""}
      {showSuccessModal ? <>{successModal}</> : ""}
      <div className="modal-box max-h-[500px] max-w-[500px] overflow-auto">
        <div className="w-full flex border-b-2 border-gray-300">
          <h3 className="flex justify-start font-extrabold text-lg w-5/6 text-dark-blue-10">
            Ver Detalles de Evento
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
        <div className="w-full flex flex-row h-fit py-2">
          <div className="flex flex-col justify-center">
            <div className="font-bold text-xl text-center">
              {months[startDate.getMonth()]}
            </div>
            <div className="font-bold text-3xl text-center">
              {startDate.getDate().toString()}
            </div>
            <div className="font-light text-sm text-center">
              {days[startDate.getDay()!]}
            </div>
          </div>
          {endDate != null ? (
            <>
              <label className="mx-auto flex items-center font-thin text-sm">
                hasta
              </label>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xl text-center">
                  {months[endDate.getMonth()]}
                </div>
                <div className="font-bold text-3xl text-center">
                  {endDate.getDate().toString()}
                </div>
                <div className="font-light text-sm text-center">
                  {days[endDate.getDay()!]}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="border-b gray__border mb-3"></div>
        {!showParticipants ? (
          <>
            <h3 className="font-bold text-lg ">{split[0]}</h3>
            <p>
              <span>{getFormattedHours(startDate)}</span> -{" "}
              <span>{endDate ? getFormattedHours(endDate) : ""}</span>
            </p>
          </>
        ) : (
          <div className="max-h-[250px] overflow-auto mt-2">
            <table className="table table-zebra">
              <thead>
                <tr className="text-dark-blue-20 w-[25px]">
                  <th></th>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Apellidos</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="w-full flex justify-end mt-3">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
            onClick={() => {
              setShowParticipants(!showParticipants);
            }}
          >
            {!showParticipants ? "Ver Participantes" : "Ver Detalles"}
          </button>
          {eventList &&
          eventList.length > 0 &&
          eventList[0].id_creador === loggedUser?.id_usuario ? (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-dark-blue-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
              onClick={() => {
                setShowModal1(!showModal1);
              }}
            >
              Eliminar Evento
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ViewEventModal;