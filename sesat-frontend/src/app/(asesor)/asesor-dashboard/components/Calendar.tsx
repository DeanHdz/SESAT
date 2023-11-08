"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Evento } from "../../../../../types/ISESAT";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import ViewEventModal from "./ViewEventModal";
import AddEventModal from "../../../components/AddEventModal";

export default function Calendar(
  this: any,
  { eventos, token }: { eventos: Evento[], token: string }
) {
  const [showModal, setShowModal] = useState(false);
  const [eventInfo, setEventInfo] = useState(Object);
  const [startDate, setstartDate] = useState<Date | undefined>(new Date());
  const [endDate, setendDate] = useState<Date | undefined>();
  const [eventTitle, seteventTitle] = useState<string | undefined>(undefined);
  const [creatorId,setCreatorId] = useState<number>();
  const [isClicked, setClick] = useState(false);

  let events = [];
  events = eventos.map((evento) => {
    return {
      id: `${evento.id_evento}`,
      id_creador: evento.id_creador,
      title: evento.titulo,
      start: new Date(evento.fecha_inicio),
      end: evento.fecha_termino
        ? new Date(evento.fecha_termino)
        : new Date(evento.fecha_inicio),
    };
  });

  const handleClick = (arg: EventClickArg): void => {
    setShowModal(true);
    setEventInfo(
      eventos.filter((evento) => `${evento.id_evento}` === arg.event.id)
    );
    console.log(
      eventos.filter((evento) => `${evento.id_evento}` === arg.event.id)
    );
  };
  //Nota: el evento select siempre ocurre al interactuar con los dias del calendario, es decir ocurre
  //al hacer click en un dia o al seleccionar un rango de dias,
  //el evento dateClick solo ocurre al hacer click
  //Si ambos estan implementados, ocurre primero el select, despues el click

  //REF:
  //https://fullcalendar.io/docs/select-callback
  //https://fullcalendar.io/docs/dateClick

  // a custom render function
  function renderEventContent(eventInfo: any) {
    const title = eventInfo.event.title.split("!!");
    console.log("title")
    console.log(title)
    return (
      <>
        <div className="w-full h-full cursor-pointer px-2 flex flex-col overflow-hidden">
          <b>{eventInfo.timeText}</b>
          <i>{title[0]}</i>
        </div>
      </>
    );
  }

  function showEventDetails(eventClickInfo: any) {
    seteventTitle(eventClickInfo.event.title);
    setstartDate(eventClickInfo.event.start);
    setendDate(eventClickInfo.event.end);
    (
      document.getElementById("view_event_modal") as HTMLDialogElement
    ).showModal();
  }

  function showNewEventModal(info: any) {
    setClick(false);
    setstartDate(info.start);
    setendDate(
      new Date(
        info.end.getFullYear(),
        info.end.getMonth(),
        info.end.getDate() - 1
      )
    );
    (
      document.getElementById("add_event_modal") as HTMLDialogElement
    ).showModal();
  }

  function handleDateClick() {
    setClick(true);
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={0} //Domingo
        weekends={true}
        events={events}
        dateClick={handleDateClick} //Al hacer click
        locale={esLocale} //español
        selectable={true}
        eventContent={renderEventContent}
        eventClick={showEventDetails}
        select={showNewEventModal} //Al hacer click o select
        //allDayContent
        //nextDayThreshold={"23:00"}
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        //timeZone="UTC"
      />

      {/*Añadir eventos */}
      <AddEventModal
        startDate={startDate as Date}
        endDate={endDate as Date}
        isClicked={isClicked}
      />

      {/*Ver el evento */}
      <ViewEventModal
        eventTitle={eventTitle as string}
        startDate={startDate as Date}
        endDate={endDate ? endDate : null}
        token={token}
      />
      {/*event={?}*/}
    </>
  );
}

