"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/navigation";

export default function CasesCalendar({casesOnDate}) {

  const router = useRouter();

  const handleEventClick = (clickInfo) => {
    const eventTitle = clickInfo.event.title;
    const eventStart = clickInfo.event.start.toLocaleDateString('en-CA');
    router.push(`/search?court=${encodeURIComponent(eventTitle)}&next_date=${eventStart}`)
  }

  const eventContent = (eventInfo) => {
    const count = eventInfo.event.extendedProps.count;
    return (
      <div className="flex flex-row sm:flex-col md:felx-col justify-stretch items-center w-full hover:cursor-pointer">
  <span className="text-sm flex-grow">{eventInfo.event.title}</span>
  
  {count && (
    <span className=" ml-2 min-w-5 max-w-5 w-5 h-5 bg-calendar_count flex justify-center items-center rounded-full bg-lightGray text-sm text-calendar_count_text sm:mt-2 md:mt-2 md:flex  sm:hidden">
      {count}
    </span>
  )}
</div>

    );
  };

  return (
    <main className="flex mx-10 my-12 justify-center">
      <div className=" lg:overflow-hidden sm:overflow-visible l:min-w-[1100px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          initialView="dayGridMonth"
          contentHeight="auto"
          events={casesOnDate.map((entry) => ({
            title: entry.court,
            count: entry.court_count,
            start: entry.next_date,
          }))}
          eventClick={handleEventClick}
          eventContent={eventContent}
        />
      </div>
    </main>
  );

}
