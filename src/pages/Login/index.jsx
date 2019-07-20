import React from 'react'
import './styles.css'
import { REST_URL } from '../../config';
import { browserHistory } from 'react-router'
import request from "superagent";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: null, password: null }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        console.log("login called")
        console.log("email", this.state.email)
        console.log("email", this.state.password)
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        request
            .post(REST_URL + '/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(data)
            .end(function (err, res) {
                if (err)
                    console.log(err)
                else {
                    console.log(res);
                    let result = JSON.parse(res.text)
                    if (result.loginSuccess) {
                        if (result.user.is_admin) {
                            browserHistory.push("/users")
                        } else {
                            browserHistory.push("/tickets")
                        }
                    } else {
                        alert("login failed")
                    }
                }
            });
    }

    handleEmailChange(e) {
        console.log("handleEmailChange")
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="login container">
                <h1 className="align-center">Welcome to Nfinity Helpdesk</h1>
                <form>
                    <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                    <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <button className="form-control btn-primary" type="button" onClick={this.handleLogin}>Login</button>
                </form>
            </div>
        )
    }
}