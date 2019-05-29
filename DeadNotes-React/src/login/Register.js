import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Nav from '../Nav';
import Logo from './Logo';
import $ from 'jquery';


class Register extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.password2 = React.createRef();
        this.email = React.createRef();
        this.submitRegister = this.submitRegister.bind(this);
        this.passwordCheck = this.passwordCheck.bind(this);
    }

    passwordCheck(e){
        const pass = this.password.current.value;
        const pass2 = this.password2.current.value;
        if (pass === pass2) {
            this.submitRegister(e);
        }else{
            let alert = document.querySelector(".al1");
            alert.classList.remove("d-none");
            // setTimeout(alert.classList.toggle("d-none"),1000);
        }
        e.preventDefault();
    }


    submitRegister(e){

        const user = this.username.current.value;
        const pass = this.password.current.value;
        const pass2 = this.password2.current.value;
        const mail = this.email.current.value;
        $.ajax({
            url: 'http://localhost:8080/api/register',
            dataType: 'json',                       
            type: 'POST',         
            data: {
                username: user,
                password: pass,
                password2: pass2,
                email: mail
            }
        }).done(json =>{
            console.log('ok');
            console.log(json);
            localStorage.setItem('token', json.token.uuid);   
            localStorage.setItem('username',user);


            this.context.setUserData(json.token.uuid, user);

            this.props.history.push('/');
        }).catch((e)=>{
            console.log('not ok');
            let alert = document.querySelector(".al2");
            setTimeout(alert.classList.remove("d-none"),3000);
        })
        e.preventDefault();
    }


    render(){
        return(
                <React.Fragment>
                    <Nav />
                    <Logo />
                    <div className="register">
                        <div className="container mt-0">
                            <div className="row justify-content-center ">
                                <form  method="POST" className="col-sm-6" action="#" onSubmit={this.passwordCheck} >
                                    <div className="form-group ">
                                        <h3 className="register">Register</h3>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" placeholder="username" id="username" required ref={this.username} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="password" id="password" required ref={this.password} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">Confirm password</label>
                                        <input type="password" className="form-control" placeholder="password" id="password2" required ref={this.password2}/> 
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" placeholder="email" id="email" required ref={this.email} />
                                    </div>
                                    <div className="al1 alert alert-danger d-none w-100 ml-0" role="alert">
                                        passwords dont match
                                    </div>
                                    <div className="al2 alert alert-danger d-none w-100 ml-0" role="alert">
                                        username exists
                                    </div>
                                    <div className="">
                                        <input type="submit" value="submit" className="btn btn-outline-dark float-right"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
              </React.Fragment>
        );
    }

}
export default Register;