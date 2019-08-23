import React from 'react'
import { browserHistory } from 'react-router'
import c from 'rc-classnames'
import './styles.css'
function Header(props) {
    return(
        <div className="details-header">
            <span className="Back" onClick={()=>{
                browserHistory.push(props.backLink)
            }}>Back</span>
            <span className="Title">{props.title}</span>
        </div>
    )
}
export default Header;