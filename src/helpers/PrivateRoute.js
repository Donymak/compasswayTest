import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {clearState, fetchUser} from "../reducers/auth/AuthSlice";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {ROUTES} from "../constants/Constants";

export const PrivateRoute = () => {
    const auth = localStorage.getItem('token')
    const {isError} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate(ROUTES.LOGIN);
        } else {
            dispatch(fetchUser());
        }
    }, [dispatch, navigate, auth]);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            navigate(ROUTES.LOGIN);
        }
    }, [dispatch, navigate, isError]);

    return auth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}