import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
}

describe('Pruebas sobre useUiStore', () => {
    test('debe', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });

    });

    test('openDateModal debe cambiar a true la propiedad del store isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal debe cambiar a false la propiedad del store isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });

    test(' toggleDateModal debe cambiart el estado actual de la propiedad isDateModalOpen', ()=>{
        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result }= renderHook( () => useUiStore() , {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        })

        const { toggleDateModal } = result.current;

        act( () => {
            toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();
        
    })
});