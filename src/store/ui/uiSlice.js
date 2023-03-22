import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        increment: (state, /* action */) => {
            state.counter += 1;
        },
    }
});

export const { increment } = uiSlice.actions;