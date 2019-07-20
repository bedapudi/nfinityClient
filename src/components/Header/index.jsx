
import React from 'react'
import { browserHistory } from 'react-router'
import c from 'rc-classnames'
import './styles.css'

function Header(props) {
    return (
        <div className="header">
            <div id="mySidenav" className="sidenav">
                <span className="Title">Helpdesk</span>
                <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
                <a 
                    className={c('menu-option', {
                        'active': props.page === 'Users'
                    })}
                    onClick={()=>browserHistory.push('/users')}>Users
                </a>
                <a 
                    className={c('menu-option', {
                        'active': props.page === 'Tickets'
                    })}
                    onClick={()=>browserHistory.push('/tickets')}>Tickets
                </a>
                <a onClick={()=>browserHistory.push('/login')}>Logout</a>
            </div>
            <span className="Menu" onClick={() => openNav()}>&#9776;</span>
            <span className="Title">{props.page}</span>
        </div>
    )
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
export default Header;