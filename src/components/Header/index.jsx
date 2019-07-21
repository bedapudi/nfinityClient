
import React from 'react'
import { browserHistory } from 'react-router'
import c from 'rc-classnames'
import './styles.css'

function Header(props) {
    let user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="header">
            <div id="mySidenav" className="sidenav">
                <span className="Title">Helpdesk</span>
                <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
                {user.is_admin &&
                    <a 
                        className={c('menu-option', {
                            'active': props.page === 'Users'
                        })}
                        onClick={()=>browserHistory.push('/users')}>Users
                    </a>
                }
                
                <a 
                    className={c('menu-option', {
                        'active': props.page === 'Tickets'
                    })}
                    onClick={()=>browserHistory.push('/tickets')}>Tickets
                </a>
                <a onClick={()=>{
                    localStorage.removeItem('user');
                    browserHistory.push('/login')}}>
                    Logout
                </a>
            </div>
            <span className="Menu" onClick={() => openNav()}>&#9776;</span>
            <span className="Title">{props.page}</span>
            <div class="header-right" onClick={()=>goToPage(props.page)}>
                <span className="add-new">&#10010;</span>
                <span className="add-new">Add New</span>
            </div>
        </div>
    )
}

function goToPage(page){
    if(page === "Users")
        browserHistory.push('/user')
    else if(page === "Tickets") 
        browserHistory.push('/ticket')
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
export default Header;