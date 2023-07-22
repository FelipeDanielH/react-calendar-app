import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: AuthSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
};

describe('Pruebas sobre authStore', () => {

    beforeEach(() => localStorage.clear());

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

        const mockStore = getMockStore({ ...notAuthenticatedState });

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

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    test('startLogin debe de fallar la autenticacion', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        await act(async () => {
            await result.current.startLogin({ email: 'sjadf@gmail.com', password: '123454678' });
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario no existe con ese email',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );


    });


    test('startRegister debe crear un usuario', async () => {

        const newUser = {
            name: 'Usuario',
            email: 'usuario@gmail.com',
            password: '123456789'
        }

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '123434576',
                name: 'usuario',
                token: 'token'
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        })

        const { errorMessage, status, user } = result.current;

        spy.mockRestore();

    });

    test('startRegister debe fallar la creacion', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario ya existe',
            status: 'not-authenticated',
            user: {}
        })
    });

    test('checkAuthToken debe fallar si no hay token', async () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} > {children} </Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user, } = result.current;

        expect({ errorMessage, status, user, }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
        })
    });

    test('debe autenticar al usuario si hay un token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken()
        });

        console.log(result.current);

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64aae3bebec14cdab18f99f8' },
        });



    });

});