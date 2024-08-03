import React, { useLayoutEffect, useState } from 'react';
import './App.css';

import { AuthProvider } from "./context/AuthContext.jsx";
import { PrivateRoute, RedirectAuthRoute } from "./utils/PrivateRoute.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './sections/Login/Login.jsx';
import Navbar from "./sections/Navbar/Navbar.jsx";
import Projects from "./sections/Project/Project.jsx";
import ProjectDetails from "./sections/Project/ProjectDetails/ProjectDetails.jsx";
import GoogleLogin from "@/sections/Login/GoogleLogin.jsx";


function App() {

    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <RedirectAuthRoute path="/login" component={Login} />
                    <Route path="/google" component={GoogleLogin} />
                    <PrivateRoute path="/" component={Projects} exact />
                    <PrivateRoute path="/projects" component={Projects} exact />
                    <PrivateRoute path="/projects/:projectID" component={ProjectDetails} exact />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
