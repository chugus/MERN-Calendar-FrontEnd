import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

import { startChecking } from '../actions/auth'



export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h1>Cargando...</h1>
    }


    return (
        <Routes>
            <Route path='/login' element={
                <PublicRoute uid={uid} >
                    <LoginScreen />
                </PublicRoute>
            } />
            <Route path='/' element={
                <PrivateRoute uid={uid}>
                    <CalendarScreen />
                </PrivateRoute>
            } />
        </Routes>
    )
}
