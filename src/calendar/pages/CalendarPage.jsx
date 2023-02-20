import { useState } from 'react';

import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';

const events = [{
  title: 'Cumple',
  notes: 'Hay que comprar tortita',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Felipe'
  }
}]



export const CalendarPage = () => {

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
    console.log({
      onDoubleClick: event
    });
  }
  
  const onSelect = (event) => {
    console.log({ click: event})
  }
  
  const onViewChanged = (event) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }

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
    </>
  )
}