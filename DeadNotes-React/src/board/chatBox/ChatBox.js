import React, { Component } from 'react';
import $ from 'jquery';
import Messages from './Messages';


class ChatBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            messages: [],
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        this.fetchMessages();
        // this.interval = setInterval(()=>{ // For Live-Chating
        //     this.fetchMessages()},1000);
    }

    handleKeyPress(e){        
        if(e.key === 'Enter'){
            e.preventDefault();
            let textarea = document.querySelector('#textarea');
            let message = textarea.value;
            textarea.value = '';
            if(message !== ''){
                let id = parseInt(localStorage.getItem('activeGroup'))
                let user = localStorage.getItem('username');
                $.ajax({
                    url: 'http://localhost:8080/api/message/save/' + id,
                    dataType: 'json',                       
                    type: 'POST',
                    data: {
                        username: user,
                        message: message
                    }            
               }).done ( data => {
                    this.componentDidMount();
                    // setInterval(()=>{let objDiv = document.querySelector('.scroller'); // A bug
                    // objDiv.scrollTop = objDiv.scrollHeight;},300);
               });
            }
        }  
    }

    fetchMessages(){
        let id = parseInt(localStorage.getItem('activeGroup'));
        $.ajax({
            url: 'http://localhost:8080/api/messages/' + id,
            dataType: 'json',                       
            type: 'GET',          
       }).done ( data => {
           this.setState({
               messages: data
           });
       }).catch( ()=>{
        console.log('no messages found')
       })
    }

    render(){
        return(
            <React.Fragment>
                <div className="chat-box">
                    <div className="">
                        <nav id="sidebar2">
                            <div className="head2">
                                <div id="chat-heading">
                                    <h6>Group Chat</h6>
                                </div>
                                <button id="dismiss2" className="btn btn-outline-light" onClick={this.props.collapse2}>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            <ul className="msg_body scroller list-unstyled">
                                <Messages messages={this.state.messages} />
                            </ul>
                            <div className="foot">
                                <textarea  id="textarea" cols="40" rows="10" placeholder="type a message" 
                                          onKeyPress={this.handleKeyPress} ref={this.message}></textarea>
                            </div>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ChatBox;