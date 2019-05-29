import React, { Component } from 'react';
import './info.css';
import Nav from '../Nav';
import {Redirect}  from "react-router-dom";
import { UserContext } from '../UserContext';

class Info extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.register = this.register.bind(this);
    }

    register(){
        console.log("ok");
        this.props.history.push('/Register');
    }

    render(){
        return(
            <React.Fragment>
                <Nav />
                <div className='info-page'>
                    <div className="info-header" id="myHeader">
                        <h1>Welcome a fresh approach on Deadline Management</h1>
                        <p>Explore our new App..</p>            
                    </div>
                    <div className="row">
                        <div className="column">
                            <img src="/img/Info Page_Page_01.jpg" alt="info-page1" />
                            <img src="/img/Info Page_Page_02.jpg" alt="info-page2" />
                            <img src="/img/Info Page_Page_03.jpg" alt="info-page3" />
                            <img src="/img/Info Page_Page_04.jpg" alt="info-page4" />
                            <img src="/img/Info Page_Page_05.jpg" alt="info-page5" />
                            <img src="/img/Info Page_Page_06.jpg" alt="info-page6" />
                            <img src="/img/Info Page_Page_07.jpg" alt="info-page7" />
                            <img src="/img/Info Page_Page_08.jpg" alt="info-page8" />
                            <img src="/img/Info Page_Page_09.jpg" alt="info-page9" />
                        <div className="container mt-0">
                            <button className="register-button" onClick={this.register} >Register</button>
                            <img src="/img/Info Page_Page_10.jpg" className="image" alt="info-page10" />
                            <div className="overlay">
                    
                            <div className="text">Register..</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
          </React.Fragment>
        );
    }


}
export default Info;