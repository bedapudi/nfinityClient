import React from 'react'
import request from "superagent";
import { REST_URL } from '../../config';
import { browserHistory } from 'react-router'
import Header from '../../components/Header';
import './styles.css'

export default class Tickets extends React.Component{
    constructor(props){
        super(props)
        this.state = {tickets: []}
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        request
            .get(REST_URL + '/getTicketList')
            .set({"Authorization": "Basic "+ user.authdata})  
            .send()
            .end((err, res) => {
                if (err)
                    console.log(err)
                else {
                    console.log(res);
                    let result = JSON.parse(res.text)
                    this.setState({ tickets: result.tickets })
                }
            });
    }

    render(){
        let { tickets } = this.state
        let ticketList
        if (tickets.length) {
            ticketList = tickets.map((ticket, index) => {
                return <tr key={ticket.id}
                    onClick={() => {
                        localStorage.setItem('selectedTicket', JSON.stringify(ticket))
                        browserHistory.push('ticket/' + ticket.id)}
                    }
                >
                    <td>{index + 1}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.status_title}</td>
                    <td>{ticket.category_title}</td>
                    <td>{ticket.first_name + " " + ticket.last_name}</td>
                    <td>{ticket.created_at}</td>
                </tr>
            })
        } else {
            ticketList = <div className="text-center">No tickets found!</div>
        }
        return(
            <div>
                <Header page="Tickets" />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Created By</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody className='tickets'>
                            {ticketList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}