import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history'

import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Project from './components/Project';
import AuthService from './services/AuthService';

const Auth = new AuthService();

const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.loggedIn()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default () =>
    <Switch history={createBrowserHistory}>
        <Route path="/" exact component={Register} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <SecretRoute path="/project" exact component={Project} />
        <Route path="/logout" exact component={Logout} />
    </Switch>;