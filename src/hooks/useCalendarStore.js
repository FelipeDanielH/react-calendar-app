import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent } from "../store";

export const useCalendarStore = () => {

    const {events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    return {
        // Propiedades
        events,
        activeEvent,
        
        // Metodos
        setActiveEvent,
    }
}
