import React from 'react'
import request from "superagent";
import { REST_URL } from '../../config';
import {mysqlDateToJsDate} from '../../utils'
import header from '../../components/Header'
import { browserHistory } from 'react-router'
import Header from '../../components/Header';

export default class Users extends React.Component{
    constructor(props){
        super(props)
        this.state = {users: []}
    }

    componentDidMount(){
        request
            .get( REST_URL+'/userList')
            .send()
            .end((err, res) => {
                if(err)
                    console.log(err)
                else {
                    console.log(res);
                    let result = JSON.parse(res.text)
                    this.setState({users: result.users})
                }
            });
    }

    render(){
        let { users } = this.state
        let userList
        if(users.length){
            userList = users.map((user, index) => {
            return <tr key={user.id}
                       onClick={()=>browserHistory.push('user/'+user.id)}
                    >
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                        <td>{user.is_admin?"Yes": "No"}</td>
                    </tr>
          })
        } else  {
            userList = <div>No users found!</div>
        }
        return(
            <div>
                <Header page="Users"/>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Admin</th>
                </tr>
                </thead>
                <tbody>
                { userList }
                </tbody>
            </table>
            </div>
        )
    }
}