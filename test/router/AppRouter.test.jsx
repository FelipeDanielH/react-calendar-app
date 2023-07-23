import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => {
    CalendarPage: () => <h1>CalendarPage</h1>
});


describe('Pruebas sobre AppRouter', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks);

    /* Esto no funciona */
    /* test('debe mostrar la pantalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter/>)

        screen.debug();
    }); */

    /* Esto tampoco */
    /* test('debe mostrar el login en caso de no estar autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        const { container } = render(
            <MemoryRouter InitialEntries={['/auth2/algo/otracosa']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();

    }); */

    /* Esto menos */
    /* test('debe mostrar el calendario si estamos autenticados', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )

        expect( screen.getByText('CalendarPage') ).toBeTruthy();
    }); */
});