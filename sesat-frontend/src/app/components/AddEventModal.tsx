"use client";
import React, { FormEvent, useEffect, useState } from "react";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { EventoEndpoint } from "../../../utils/evento.endpoint";

const AddEventModal = ({
  startDate,
  endDate,
  isClicked,
}: {
  startDate: Date;
  endDate: Date;
  isClicked: boolean;
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
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState<Date>(startDate);
  const [description, setDescription] = useState<string>("");
  const [end, setEndDate] = useState<Date | undefined>(endDate);
  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean | undefined>(false);
  const [relatedPersons, addRelatedPersons] = useState();

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

  /* console.log(start.toISOString());
  console.log("-----------------");
  console.log(end?.toISOString());
  console.log("-----------------");
  console.log(new Date().toString()); */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      end?.getHours() == 0 &&
      end?.getMinutes() == 0 &&
      end?.getSeconds() == 0
    ) {
      alert("Por favor ingrese una fecha de fin que no sea 00:00:00");
    } else {
      await EventoEndpoint.postEvento(
        {
          id_usuario: 100001,
          titulo: title,
          descripcion: description,
          fecha_inicio: start,
          fecha_termino: end ? end : start,
        },
        ""
      );
    }
    //router.push("/admin-dashboard");
  };

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
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      Verifique que los datos del alumno sean correctos. El
                      alumno será agregado al sistema con estado{" "}
                      <span className="font-bold text-dark-blue-10">
                        activo
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
                onClick={() => {
                  setShowModal(!showModal);
                }}
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

  return (
    <dialog id="add_event_modal" className="modal">
      <div className="modal-box max-w-[400px]">
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
        <h3 className="font-bold text-lg">Añadir Nuevo Evento</h3>
        <h3 className="font-thin text-[12px]">Presione ESC para cancelar</h3>

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
                placeholder="Fin"
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
              }}
            >
              Agregar Personas
            </button>

            <div className="w-full flex justify-end mt-3">
              <button className="primary__btn" type="submit">
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal ? <>{modal}</> : ""}
    </dialog>
  );
};

export default AddEventModal;
