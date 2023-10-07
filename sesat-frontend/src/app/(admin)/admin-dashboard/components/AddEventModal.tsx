"use client";
import React, { FormEvent, useEffect, useState } from "react";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { EventoEndpoint } from "../../../../../utils/evento.endpoint";
import { DateTime } from "luxon";

const AddEventModal = ({
  startDate,
  endDate,
  isClicked,
}: {
  startDate: Date;
  endDate: Date;
  isClicked: boolean;
}) => {
  let days = [
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
    let test = await EventoEndpoint.postEvento(
      {
        id_usuario: 100001,
        titulo: title,
        descripcion: description,
        fecha_inicio: start,
        fecha_termino: end ? end : start,
      },
      ""
    );
    //router.push("/admin-dashboard");
  };

  return (
    <dialog id="add_event_modal" className="modal">
      <div className="modal-box max-w-[400px]">
        <div className="w-full flex flex-row h-fit">
          <div>
            <div className="font-bold text-3xl">
              {startDate?.getDate().toString()}
            </div>
            <div className="font-light text-sm">
              {days[startDate?.getDay()!]}
            </div>
          </div>
          {!isClicked && (
            <>
              <label className="mx-auto  flex items-center font-thin text-sm">
                hasta
              </label>
              <div>
                <div className="font-bold text-3xl">
                  {endDate?.getDate().toString()}
                </div>
                <div className="font-light text-sm">
                  {days[endDate?.getDay()!]}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="border-b gray__border mb-3"></div>
        <h3 className="font-bold text-lg">Añadir Nuevo Evento</h3>
        <h3 className="font-thin text-[12px]">Presione ESC para cancelar</h3>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <form
            method="submit"
            onSubmit={handleSubmit}
            className="flex flex-col w-full"
          >
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

            <div className="w-full flex justify-end mt-3">
              <button className="primary__btn" type="submit">
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddEventModal;
