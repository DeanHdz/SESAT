"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react'
import ViewEventModal from "./ViewEventModal";
import AddEventModal from "./AddEventModal";
import AddPeriodoModal from "./AddPeriodoModal";



/**
 * Docs
 * https://github.com/fullcalendar/fullcalendar-react
 *
 * https://fullcalendar.io/docs/react
 */

//Nota: el evento select siempre ocurre al interactuar con los dias del calendario, es decir ocurre
//al hacer click en un dia o al seleccionar un rango de dias, 
//el evento dateClick solo ocurre al hacer click
//Si ambos estan implementados, ocurre primero el select, despues el click

//REF:
//https://fullcalendar.io/docs/select-callback
//https://fullcalendar.io/docs/dateClick

export default function Calendar() {


  const [startDate, setstartDate] = useState<Date | undefined>(new Date())
  const [endDate, setendDate] = useState<Date | undefined>()
  const [eventTitle, seteventTitle] = useState<string | undefined>(undefined)
  const [isClicked, setClick] = useState(false);

  const events = [{ title: "Inicio de semestre", start: new Date() }]; //fetch para llenar datos

  // a custom render function
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <div className="w-full h-full cursor-pointer px-2 flex flex-col">
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </div>
      </>
    );
  }

  function showEventDetails(eventClickInfo: any) {
    seteventTitle(eventClickInfo.event.title);
    setstartDate(eventClickInfo.event.start);
    (document.getElementById('view_event_modal') as HTMLDialogElement).showModal();

  }

  function showNewEventModal(info: any) {
    setClick(false);
    setstartDate(info.start);
    setendDate(info.end);
    (document.getElementById('add_event_modal') as HTMLDialogElement).showModal()
  }

  function showNewPeriodoModal(info: any) {
    //setClick(false);
    //setstartDate(info.start);
    //setendDate(info.end);
    (document.getElementById('new_periodo_modal') as HTMLDialogElement).showModal()
  }

  function handleDateClick() {
    setClick(true);
  };


  return (
    <>
      <div className="alert shadow-lg mb-6 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">¡No hay un periodo definido!</h3>
          <div className="text-xs">El periodo anterior ha concluido, debe establecer uno nuevo para este semestre</div>
        </div>
        <button className="btn btn-sm" onClick={showNewPeriodoModal}>Establecer Periodo</button>
      </div>

      <div className="flex flex-row gray__border p-4 mb-6 items-center bg-light-gray-10">
        <div className="mr-4">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>
        </div>
        <div className="flex flex-row w-full">
          <div>
            <h3 className="font-bold">Inicio y fin de semestre</h3>  
            <div className="text-xs">Periodo de entregas de avance de tesis</div>          
          </div>
          <div className="mx-auto flex items-center">
            <h3 className="font-bold">dd/mm/yyyy  -  dd/mm/yyyy</h3>            
          </div>
        </div>
        <button className="primary__btn ml-auto">Modificar</button>
      </div>

      <AddPeriodoModal startDate={startDate as Date} endDate={endDate as Date} />


      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={0}                                      //Domingo
        weekends={true}
        events={events}
        dateClick={handleDateClick}                       //Al hacer click
        locale={esLocale}                                 //español
        selectable={true}
        eventContent={renderEventContent}
        eventClick={showEventDetails}
        select={showNewEventModal}                        //Al hacer click o select
        headerToolbar={{
          start: 'today',
          center: 'title',
          end: 'prev,next'
        }}
      //timeZone="America/Mexico_City"
      />

      {/*Añadir eventos */}
      <AddEventModal startDate={startDate as Date} endDate={endDate as Date} isClicked={isClicked} />

      {/*Ver el evento */}
      <ViewEventModal eventTitle={eventTitle as string} startDate={startDate as Date} />
    </>
  );
}
