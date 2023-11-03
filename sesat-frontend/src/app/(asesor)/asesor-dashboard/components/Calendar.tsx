"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ViewEventModal from "@/app/components/ViewEventModal";
import { useState } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";

/**
 * Docs
 * https://github.com/fullcalendar/fullcalendar-react
 *
 * https://fullcalendar.io/docs/react
 */

export default function Calendar() {
  const [startDate, setstartDate] = useState<Date | undefined>(new Date());
  const [endDate, setendDate] = useState<Date | undefined>();
  const [eventTitle, seteventTitle] = useState<string | undefined>(undefined);
  const events = [{ title: "Meeting", start: new Date() }];
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
    (
      document.getElementById("view_event_modal") as HTMLDialogElement
    ).showModal();
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        firstDay={0}
        weekends={true}
        events={events}
        locale={esLocale}
        eventClick={showEventDetails}
        eventContent={renderEventContent}
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        /** eventContent={renderEventContent}*/
      />
      <ViewEventModal
        eventTitle={eventTitle as string}
        startDate={startDate as Date}
      />
      ;
    </>
  );
}
