import React, { Component } from 'react';
import "./login.css";
import { UserContext } from '../UserContext';
import Nav from '../Nav';
import Logo from './Logo';
import $ from 'jquery';


class Login extends Component{

    static contextType = UserContext;

    constructor (props){
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {

        const username = this.username.current.value;
        const password = this.password.current.value;

        $.ajax({
            url: 'http://localhost:8080/api/login',
            dataType: 'json',
            type: 'POST',
            data: {
                username: username,
                password: password  
            }
        }).done( (json) =>{
            console.log("ok");
            localStorage.setItem('token', json.token.uuid);   
            localStorage.setItem('username',json.username);

            this.context.setUserData(json.token.uuid, json.username);

            this.props.history.push('/');
        }).catch((e)=>{
            let alert = document.querySelector(".alert");
            alert.classList.remove("d-none");
        }); 
        e.preventDefault();
    }



    render(){
        return(
                <React.Fragment>
                    <Nav />
                    <Logo />
                    <div className ="login">
                        <section id="mid">
                            <div className="container my-0">
                                <div className="row">
                                    <div className="col-md-6 offset-3 p-3">
                                        <h2 className="sing-in mb-5">Sign in</h2>
                                        <form  onSubmit={this.handleSubmit}>
                                            <div className="from-group user" >
                                                <input type="text"  required  ref={this.username} />
                                                <label htmlFor="">username</label>
                                            </div>
                                            <div className="form-group user">
                                                <input type="password"  required  ref={this.password} />
                                                <label htmlFor="">password</label>
                                            </div>
                                            <div className="form-group">
                                                {/* <a href="#">Register</a> */}
                                            </div>
                                            <div className="form-group">
                                                {/* <a href="#">forgot password?</a> */}
                                            </div>
                                            <div className="alert alert-danger d-none" role="alert">
                                                wrong credentials
                                            </div>
                                            <div className="form-group sub mt-5">
                                                <input type="submit" value="login" className="btn btn-outline-dark"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
               </React.Fragment>    
        );
    }




}

export default Login;
