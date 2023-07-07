import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useRouter } from 'next/router'

let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// console.log(todayStr);

const interviews = [];
const totalInterviewers = 3;
const totalInterviewees = 20;

 

const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD of today

 

for (let i = 1; i <= totalInterviewees; i++) {
  const interviewerNo = (i % totalInterviewers) + 1;
  const intervieweeNo = i;
  const startTime = new Date(todayStr); // Set the desired start time
  startTime.setHours(9 + Math.floor(i / totalInterviewers)); // Assuming interviews start at 9 AM and each interview takes 1 hour
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 1); // Assuming each interview takes 1 hour

 

  interviews.push({
    id: createEventId(),
    title: `Interview ${intervieweeNo}`,
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    InterviewerNo: interviewerNo,
    IntervieweeNo: intervieweeNo,
  });
}

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: todayStr
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00',
//     end: todayStr + 'T14:00:00'
//   }
// ]

export function createEventId() {
  return String(eventGuid++)
}

export default function CalendarApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  console.log(localStorage.getItem("ID"))
  const id = parseInt(localStorage.getItem("ID"));

  const INITIAL_EVENTS = interviews.filter(item => item.InterviewerNo === id)
  // const INITIAL_EVENTS = interviews;

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <div className='demo-app'>
      {renderSidebar()}
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
          */
        />
      </div>
    </div>
  );

  function renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }
}