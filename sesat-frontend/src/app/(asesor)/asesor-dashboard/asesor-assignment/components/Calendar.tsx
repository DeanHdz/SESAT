"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

/**
 * Docs
 * https://github.com/fullcalendar/fullcalendar-react
 *
 * https://fullcalendar.io/docs/react
 */

export default function Calendar() {
  const events = [{ title: "Meeting", start: new Date() }];
  // a custom render function
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={events}
      /** eventContent={renderEventContent}*/
    />
  );
}
