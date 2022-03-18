import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = (email, password) => {

    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        await fetchSinToken('auth/new', { name, email, password }, 'POST')
            .then(resp => resp.json())
            .then(body => {
                if (body.ok) {
                    Swal.fire('Registro', 'Usuario creado correctamente', 'success');

                    localStorage.setItem('token', body.token);
                    localStorage.setItem('token-init-date', new Date().getTime());

                    setTimeout(() => {
                        dispatch(startLogin(email, password));
                    }, 2000);

                } else {
                    Swal.fire('Error', body.msg, 'error');
                }
            })
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        await fetchConToken('auth/renew')
            .then(resp => resp.json())
            .then(body => {
                if (body.ok) {

                    localStorage.setItem('token', body.token);
                    localStorage.setItem('token-init-date', new Date().getTime());

                    setTimeout(() => {
                        dispatch(login({
                            uid: body.uid,
                            name: body.name
                        }));
                    }, 2000);

                } else {
                    dispatch(checkingFinish())
                }
            })
    }
}


export const checkingFinish = () => ({type: types.authCheckingFinished});



const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();

        dispatch(startLogout());
        dispatch(logout());
    }   
}

const logout = () => ({type: types.authLogout});