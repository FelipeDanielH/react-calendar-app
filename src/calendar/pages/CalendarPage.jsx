import { useState } from 'react';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';
import { useEffect } from 'react';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore(); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || Views.MONTH ); 

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347Cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style };
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }
  
  const onSelect = (event) => {
    setActiveEvent( event );
  }
  
  const onViewChanged = (event) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }

  useEffect(() => {
    startLoadingEvents()
  }, []);
  

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal/>
      <FabAddNew />
      <FabDelete />
    </>
  )
}