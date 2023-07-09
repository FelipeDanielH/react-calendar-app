import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas sobre calendarSlice', () => {

    test('debe regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);

    });

    test('onSetActiveEvent debe activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);

    });

    test('onAddNewEvent debe agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Cumple 3',
            notes: 'Hay que comprar tortita de nuevo',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            notes: 'Nota 3'
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent(newEvent) );
        expect( state.events ).toEqual([...events, newEvent])

    });

    test('onUpdateEvent debe actualizar el evento', () => {
        const updatedEvent = {
            id: '1',
            title: 'Cumple 3',
            notes: 'Hay que comprar tortita de nuevo',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            notes: 'Nota 3'
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent(updatedEvent) );
        expect( state.events ).toContain( updatedEvent );

    });
});