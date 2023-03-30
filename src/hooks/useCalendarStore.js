import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const {events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        if(calendarEvent._id){
            // Actualizazndo
            dispatch( onUpdateEvent( {...calendarEvent} ) );
        }else{
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id:new Date().getTime() }) )
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        
        // Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
