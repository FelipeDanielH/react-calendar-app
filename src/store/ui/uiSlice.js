import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state, actions) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state, actions) => {
            state.isDateModalOpen = false;
        }
    }
});

export const { isDateModalOpen, onCloseDateModal, onOpenDateModal } = uiSlice.actions;