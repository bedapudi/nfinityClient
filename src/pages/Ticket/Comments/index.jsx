import React from "react"
import request from "superagent";
import { REST_URL } from '../../../config';
import './styles.css'

export default class Comments extends React.Component{
    constructor(props){
        super(props)
        this.state = {comments:[], newComment: null}
        this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
    }
    componentDidMount(){
        let {ticketId} = this.props
        let user = JSON.parse(localStorage.getItem('user'));
        request
            .get(REST_URL + '/getCommentsForTicket?ticketId='+ticketId)
            .set({"Authorization": "Basic "+ user.authdata})  
            .send()
            .end((err, res) => {
                if (err)
                    console.log(err)
                else {
                    console.log(res);
                    let result = JSON.parse(res.text)
                    this.setState({ comments: result.comments })
                }
            });
    }
    handleNewCommentChange(e){
        this.setState({ newComment: e.target.value });
    }

    addComment(){
        let user = JSON.parse(localStorage.getItem('user'));
        let { comments } = this.state
        let data = {
            comment: this.state.newComment,
            ticketId:this.props.ticketId
        }
        request
            .post(REST_URL + '/addComment')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({"Authorization": "Basic "+ user.authdata})  
            .send(data)
            .end((err, res)=> {
                if (err)
                    console.log(err)
                else {
                    console.log(res);
                    let result = JSON.parse(res.text)
                    if (result.comment) {
                        document.getElementById("new-comment").value = "";
                        comments.push(result)
                        this.setState({comments: comments, newComment:null})
                        var x = document.getElementById("add-comment");
                        x.className = "show";
                        setTimeout(function(){
                             x.className = x.className.replace("show", ""); 
                    }, 1500);
                    } else {
                        alert("failed to add user")
                    }
                }
            });
    }

    render(){
        let {comments, newComment} = this.state
        let commentList
        if (comments.length) {
            commentList = comments.map((comment, index) => {
                return <div key={index}>
                    <p>{'"'+comment.comment + '" Added by ' + comment.first_name + ' ' + comment.last_name + ' at ' + comment.created_at}</p>
                </div>
            })
        } else {
            commentList = <div className="text-center">No Comments added!</div>
        }
        return(
            <div className="container add-comment">
                <h1>Comments</h1>
                {commentList}

                <textarea id='new-comment' placeholder="Write Comment..." className="w3-input" value={newComment} type="text" onChange={this.handleNewCommentChange}></textarea>
                <div className="w3-container actions">
                    <button className="w3-btn w3-blue" onClick={()=>{this.addComment()}}>Add Comment</button>
                </div>
                <div id="add-comment">Comment added.</div>
            </div>
        )
    }
}