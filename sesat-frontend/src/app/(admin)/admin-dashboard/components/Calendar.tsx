"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Evento } from "../../../../../types/ISESAT";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useState } from "react";

/**
 * Docs
 * https://github.com/fullcalendar/fullcalendar-react
 *
 * https://fullcalendar.io/docs/react
 */

export default function Calendar(
  this: any,
  { eventos }: { eventos: Evento[] }
) {
  const [showModal, setShowModal] = useState(false);
  const [eventInfo, setEventInfo] = useState(Object);
  //const events = [{ title: "Meeting", start: new Date(), end: new Date("2023-10-04T23:59:59") }];
  let events = [];
  events = eventos.map((evento) => {
    return {
      id: `${evento.id_evento}`,
      title: evento.titulo,
      start: new Date(evento.fecha_inicio),
      end: evento.fecha_termino
        ? new Date(evento.fecha_termino)
        : new Date(evento.fecha_inicio),
    };
  });

  console.log(events);

  const handleClick = (arg: EventClickArg): void => {
    setShowModal(true);
    setEventInfo(
      eventos.filter((evento) => `${evento.id_evento}` === arg.event.id)
    );
    console.log(
      eventos.filter((evento) => `${evento.id_evento}` === arg.event.id)
    );
  };

  const handleDay = (arg: { dateStr: any }): void => {
    alert(arg.dateStr);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        //eventContent={renderEventContent}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={handleClick}
        dateClick={handleDay}
      />
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-96 mx-auto max-w-full">
              <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {eventInfo[0].titulo}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="p-5">
                  <p className="mb-2"></p>
                  <p className="mb-2">Usuario: {eventInfo[0].id_evento}</p>
                  <p className="mb-2">Inicio: {eventInfo[0].fecha_inicio}</p>
                  <p className="mb-4">Fin: {eventInfo[0].fecha_termino}</p>
                  <button
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
                    onClick={() => setShowModal(false)}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
