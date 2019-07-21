import React from "react"
import Header from '../../components/DetailsHeader';
import './styles.css'
import Comments from './Comments'
import { browserHistory } from 'react-router'
import request from "superagent";
import { REST_URL } from '../../config';


export default class Ticket extends React.Component{
    constructor(props) {
        super(props)
        let ticketDetails = JSON.parse(localStorage.getItem('selectedTicket'));
        if(props.params.ticketId)
            this.state = {
                description:ticketDetails.description,
                status: ticketDetails.status,
                category: ticketDetails.category,
                createdBy: ticketDetails.first_name + " " + ticketDetails.last_name
            }
        else {
            this.state = {
                description:null,
                status: null,
                category: null,
                createdBy: null
            }
        }
        this.addOrUpdateTicket = this.addOrUpdateTicket.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleStatusChange(e) {
        this.setState({ status: e.target.value });
    }
    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }
    addOrUpdateTicket(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(this.props.params.ticketId){
            let data = {
                description: this.state.description,
                status:this.state.status,
                category: this.state.category,
                id:this.props.params.ticketId
            }
            request
                .post(REST_URL + '/updateTicket')
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
                            var x = document.getElementById("update-ticket");
                            x.className = "show";
                            setTimeout(function(){
                                 x.className = x.className.replace("show", ""); 
                        }, 1500);
                        } else {
                            alert("failed to update user")
                        }
                    }
                });
        } else {
            let data = {
                description: this.state.description,
                status:this.state.status,
                category: this.state.category,
            }
            request
                .post(REST_URL + '/addTicket')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set({"Authorization": "Basic "+ user.authdata})  
                .send(data)
                .end((err, res)=> {
                    if (err)
                        console.log(err)
                    else {
                        console.log(res);
                        let result = JSON.parse(res.text)
                        if (result.ticketId) {
                            var x = document.getElementById("add-ticket");
                            x.className = "show";
                            setTimeout(function(){
                                 x.className = x.className.replace("show", ""); 
                                 browserHistory.push("/tickets")
                        }, 1500);
                        } else {
                            alert("failed to add user")
                        }
                    }
                });
        }
    }

    render() {
        let ticketId = this.props.params.ticketId
        let {description, status, category, createdBy} = this.state
        let ticketDetails = JSON.parse(localStorage.getItem('selectedTicket'));
        let title = ticketId ? ticketDetails.description : "Add Ticket"
        return (
            <div>
                <Header
                    title={title}
                    backLink='/tickets'
                    type='ticket'
                />
                <div className="container add-ticket">
                    <form className="w3-container">
                        <label>description</label>
                        <textarea className="w3-input" type="text" value={description}  onChange={this.handleDescriptionChange}></textarea>
                        <label>Status</label>
                        <select class="w3-select" name="option" onChange={this.handleStatusChange} value={status}>
                            <option value="" disabled selected>Select Status</option>
                            <option value="1">Open</option>
                            <option value="2">In Progress</option>
                            <option value="3">Closed</option>
                        </select>
                        <label>Category</label>
                        <select class="w3-select" name="option" onChange={this.handleCategoryChange} value={category}>
                            <option value="" disabled selected>Select Category</option>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                        {ticketId && <label>Ticket Created By</label>}
                        {ticketId && <h2>{createdBy}</h2>}
                        
                    </form>
                    <div className="w3-container actions">
                            <button className="w3-btn w3-blue" onClick={()=>{this.addOrUpdateTicket()}}>{ticketId? "Update ticket":"Add Ticket"}</button>
                            <button className="w3-btn w3-gray cancel"
                                    onClick={()=>{browserHistory.push("/tickets")}}
                            >
                                Cancel
                            </button>
                    </div>
                    <div id="add-ticket">Ticket added.</div>
                    <div id="update-ticket">Ticket updated.</div>
                </div>
                    {ticketId && <Comments ticketId={ticketId}/>}
            </div>
        )
    }
}