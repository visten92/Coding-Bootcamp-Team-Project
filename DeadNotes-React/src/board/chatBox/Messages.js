import React, { Component } from 'react';


class Messages extends Component{

    constructor(props){
        super(props);
    }


    render(){
        let messages = this.props.messages;
        let activeUser = localStorage.getItem('username');
        return(
            <React.Fragment>
                {Object.keys(messages).map( k =>{
                    let date  = new Date(messages[k].time).toLocaleTimeString();
                    let date1  = new Date(messages[k].time).toLocaleDateString();
                    let fullDate = date1 +' '+ date;
                    if(messages[k].sender.username === activeUser){
                        return(
                                <li className="msg_send" key={k}>
                                    <p><span className="d-block msg-headers msg-headers-username">you</span>
                                    {messages[k].message}
                                    <span className="d-block msg-headers">{fullDate}</span></p>
                                </li>         
                        );              
                    }else{
                        return(
                            <li className="msg" key={k}>
                                <p><span className="d-block msg-headers msg-headers-username">{messages[k].sender.username}</span>
                                {messages[k].message}
                                <span className="d-block msg-headers">{fullDate}</span></p>
                            </li>   
                        );
                    }
                })}
             </React.Fragment>
        );
    }
}
export default Messages;