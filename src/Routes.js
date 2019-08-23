import React from 'react'
import { Route, IndexRedirect, Router, browserHistory } from 'react-router'
import { } from 'react-router'
import Login from './pages/Login';
import Users from './pages/Users';
import Tickets from './pages/Tickets';
import User from './pages/User';
import Ticket from './pages/Ticket'
export default (
    <Router history={browserHistory}>
        <Route path='/' component={Login} >
        </Route>
        <Route
            path='/login'
            page='login'
            type='login'
            component={Login}
        />
        <Route
            path='/users'
            page='users'
            type='users'
            component={Users}
        />
        <Route
            path='/user'
            page='user'
            type='user'
            component={User}
        />
        <Route
            path='/user/:userId'
            page='user'
            type='user'
            component={User}
        />
        <Route
            path='/tickets'
            page='tickets'
            type='tickets'
            component={Tickets}
        />
        <Route
            path='/ticket'
            page='ticket'
            type='ticket'
            component={Ticket}
        />
        <Route
            path='/ticket/:ticketId'
            page='ticket'
            type='ticket'
            component={Ticket}
        />
    </Router>
)

