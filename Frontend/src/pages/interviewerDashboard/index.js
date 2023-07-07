import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {
    Typography
  } from '@mui/material';

const now = new Date();

let eventGuid = 0



export function createEventId() {
    return String(eventGuid++)
}

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

const INITIAL_EVENTS = interviews.filter(item => item.InterviewerNo === 2)

const Page = () => {

    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);

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
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
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
    return (
        <>
            <Head>
                <title>
                    Interviewer Dashboard
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Grid
                        xs={12}
                        md={12}
                        lg={12}
                    >
                        <Typography variant="h3" align="center">
                            Welcome Interviewer
                        </Typography>
                        <br />
                        <br />
                        <Typography variant="h3" align="center">
                            Interview Schedule
                        </Typography>
                        <br />
                        <br />
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
                    </Grid>

                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
