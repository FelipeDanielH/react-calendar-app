import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../../src/store";
import { renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { initialState } from "../fixtures/authStates";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: AuthSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas sobre authStore', () => {
    test('debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        });
    });
});