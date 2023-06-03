import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout,clearErrorMessage } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth', {email, password} );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid}) );

        }catch( error){
            dispatch( onLogout(error.response.data?.msg || 'Error desconocido'))
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }
    }

    const startRegister = async ({ name, email, password}) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password} );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid}) );
        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || 'Error desconocido'))
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }
    }


    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Metodos
        startLogin,
        startRegister
    }
}