import React from 'react'
import Header from '../../components/DetailsHeader';
import './styles.css'
import { browserHistory } from 'react-router'
import request from "superagent";
import { REST_URL } from '../../config';

export default class User extends React.Component {
    constructor(props) {
        super(props)
        let userDetails = JSON.parse(localStorage.getItem('selectedUser'));
        if(props.params.userId)
            this.state = {
                firstName:userDetails.first_name,
                lastName: userDetails.last_name,
                email: userDetails.email,
                password: userDetails.password,
                isAdmin: userDetails.is_admin
            }
        else {
            this.state = {
                firstName:null,
                lastName: null,
                email: null,
                password: null,
                isAdmin: null
            }
        }
        this.cancelOrDeleteUser = this.cancelOrDeleteUser.bind(this);
        this.addOrUpdateUser = this.addOrUpdateUser.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIsAdminChange = this.handleIsAdminChange.bind(this);
    }

    componentWillUnmount() {
        localStorage.removeItem('selectedUser');
    }
    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleIsAdminChange(e) {
        this.setState({ isAdmin: e.target.value });
    }

    cancelOrDeleteUser(){
        let user = JSON.parse(localStorage.getItem('user'));
        //delete
        if(this.props.params.userId){
            request
                .delete(REST_URL + '/deleteUser')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set({"Authorization": "Basic "+ user.authdata})  
                .send({id:this.props.params.userId})
                .end((err, res)=> {
                    if (err)
                        console.log(err)
                    else {
                        console.log(res);
                        let result = JSON.parse(res.text)
                        if (result.affectedRows) {
                            //alert("user added")
                            var x = document.getElementById("delete-user");
                            x.className = "show";
                            setTimeout(function(){
                                 x.className = x.className.replace("show", "");
                                 browserHistory.push("/users") 
                        }, 1500);
                        } else {
                            alert("failed to delete user")
                        }
                    }
                });
        } else {
            browserHistory.push("/users")
        }
    }
    addOrUpdateUser(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(this.props.params.userId){
            let data = {
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                password: this.state.password,
                isAdmin: this.state.isAdmin,
                id:this.props.params.userId
            }
            request
                .post(REST_URL + '/updateUser')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set({"Authorization": "Basic "+ user.authdata})  
                .send(data)
                .end((err, res)=> {
                    if (err)
                        console.log(err)
                    else {
                        console.log(res);
                        let result = JSON.parse(res.text)
                        if (result.affectedRows) {
                            //alert("user added")
                            var x = document.getElementById("update-user");
                            x.className = "show";
                            setTimeout(function(){
                                 x.className = x.className.replace("show", ""); 
                        }, 3000);
                        } else {
                            alert("failed to update user")
                        }
                    }
                });
        } else {
            let data = {
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                isAdmin: this.state.isAdmin
            }
            request
                .post(REST_URL + '/addUser')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set({"Authorization": "Basic "+ user.authdata})  
                .send(data)
                .end((err, res)=> {
                    if (err)
                        console.log(err)
                    else {
                        console.log(res);
                        let result = JSON.parse(res.text)
                        if (result.userId) {
                            var x = document.getElementById("add-user");
                            x.className = "show";
                            setTimeout(function(){
                                 x.className = x.className.replace("show", ""); 
                                 browserHistory.push("/users")
                        }, 3000);
                            //
                        } else {
                            alert("failed to add user")
                        }
                    }
                });
        }
    }
    render() {
        let userId = this.props.params.userId
        let {firstName, lastName, email, password, isAdmin} = this.state
        let userDetails = JSON.parse(localStorage.getItem('selectedUser'));
        let title = userId ? userDetails.first_name + " " + userDetails.last_name : "Add User"
        return (
            <div>
                <Header
                    title={title}
                    backLink='/users'
                    type='user'
                />
                <div className="container add-user">
                    <form className="w3-container">
                        <label>First Name</label>
                        <input className="w3-input" type="text" value={firstName}  onChange={this.handleFirstNameChange}/>
                        <label>Last Name</label>
                        <input className="w3-input" type="text" value={lastName} onChange={this.handleLastNameChange}/>
                        <label>Email</label>
                        {userId?
                            <input className="w3-input readonly" type="email" value={email} readonly/>
                             :
                            <input className="w3-input" type="email" value={email} onChange={this.handleEmailChange}/>
                        }
                        
                        <label>password</label>
                        <input className="w3-input" type="password" value={password} onChange={this.handlePasswordChange}/>
                        <label>Admin User</label>
                        <select class="w3-select" name="option" onChange={this.handleIsAdminChange} value={isAdmin}>
                            <option value="" disabled selected>Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </form>
                    <div className="w3-container actions">
                            <button className="w3-btn w3-blue" onClick={()=>{this.addOrUpdateUser()}}>{userId? "Update User":"Add User"}</button>
                            <button className="w3-btn w3-gray cancel"
                                    onClick={()=>{this.cancelOrDeleteUser()}}
                            >
                                {userId? "Delete User":"Cancel"}
                            </button>
                    </div>
                    <div id="add-user">User added</div>
                    <div id="update-user">User updated.</div>
                    <div id="delete-user">User deleted.</div>
                </div>
            </div>
        )
    }
}