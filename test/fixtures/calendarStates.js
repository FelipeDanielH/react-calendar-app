export const events = [
    {
        id: 1,
        title: 'Cumple',
        notes: 'Hay que comprar tortita',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        notes: 'Nota 1'
    },
    {
        id: 1,
        title: 'Cumple de felipe',
        notes: 'Hay que comprar tortita tambien',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        notes: 'Nota 2'
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}