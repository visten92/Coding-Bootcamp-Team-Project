import React, { Component } from 'react';
import './home.css';
import Nav from '../Nav';


class Home extends Component{
    render(){
        return(
             <div>  
                <Nav />
                <div className="container">
                    <div className="row p-3 mt-5">
                        <img src="/img/LogoMakr_4n87LN.png" alt="DeadNotes" className="m-auto d-block logo home" />
                    </div>
                </div>
            </div>  
        );
    }
}

export default Home;
