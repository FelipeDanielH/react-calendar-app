import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { initialState, notAutheticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

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

    beforeEach( () => localStorage.clear());

    test('debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState });

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


    test('startLogin debe de realizar el login correctamente', async () => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAutheticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64aae3bebec14cdab18f99f8' },
        })

        expect( localStorage.getItem('token')).toEqual( expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual( expect.any(String));
    });

    test('startLogin debe de fallar la autenticacion', async () => { 
        localStorage.clear();

        const mockStore = getMockStore({ ...notAutheticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        await act( async () => {
            await result.current.startLogin({email: 'sjadf@gmail.com', password: '123454678'});
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario no existe con ese email',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        );


     });
});