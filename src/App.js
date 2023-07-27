import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './helpers/PrivateRoute';
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/emails/Dashboard";
import { ROUTES } from './constants/Constants';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<LogIn />} />
                    <Route path={ROUTES.SIGNUP} element={<SignUp />} />
                    <Route path={ROUTES.DASHBOARD} element={<PrivateRoute />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path={ROUTES.ROOT} element={<PrivateRoute />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;