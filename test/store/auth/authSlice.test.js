import { AuthSlice, clearErrorMessage, onChecking, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { initialState, authenticatedState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas sobre authSlice', () => {

    test('debe regresar el estado inicial', () => {
        expect(AuthSlice.getInitialState()).toEqual(initialState);
    });

    test('debe realizar un login', () => {
        const state = AuthSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated', // 'authenticated', 'not-authenticated'
            user: testUserCredentials,
            errorMessage: undefined,
        })
    });

    test('debe realizar logout', () => {
        const errorMessage = 'Credenciales no validas';
        const state = AuthSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated'
            user: {},
            errorMessage: errorMessage
        });
    });

    test('debe limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no validas';
        const state = AuthSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = AuthSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined);

    });

    test('debe volver al estado onChecing', () => {

        let state = AuthSlice.reducer(authenticatedState, onChecking());
        expect(state).toEqual({
            status: 'checking', // 'authenticated', 'not-authenticated'
            user: {},
            errorMessage: undefined,
        });
    });
});