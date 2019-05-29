import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Nav from '../Nav';
import Logo from './Logo';
import './profile.css';
import $ from 'jquery';


class Profile extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
        this.username = React.createRef();
        this.email = React.createRef();
        this.oldPassword = React.createRef();
        this.newPassword = React.createRef();
        this.newPassword2 = React.createRef();
        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    componentDidMount(){
        this.fetchCurrentUser();
    }

    fetchCurrentUser(){
        let username = localStorage.getItem('username');
        $.ajax({
            url: 'http://localhost:8080/api/profile/user',
            dataType: 'json',
            type: 'GET',
            data: {
                username: username 
            }
        }).done( (data) =>{
            console.log("ok");
            this.setState({
                user: data
            });
        }).catch((e)=>{
            console.log('something went wrong')
        }); 
    }

    setUsername(){
        let alertSuccess = document.querySelector(".alert-success-username");
        let alertDanger = document.querySelector(".alert-danger-username");
        alertDanger.classList.remove("d-none");
        alertSuccess.classList.remove("d-none");
        alertDanger.classList.add("d-none");
        alertSuccess.classList.add("d-none");
            
        let oldUsername = localStorage.getItem('username'); 
        let newUsername = this.username.current.value;
        $.ajax({
            url: 'http://localhost:8080/api/profile/username',
            dataType: 'json',
            type: 'PUT',
            data: {
                oldUsername: oldUsername,
                newUsername: newUsername
            }
        }).done( (data) =>{
            let token = localStorage.getItem('token');
            this.context.setUserData(token, data.username);
            localStorage.setItem('username',data.username);
            this.setState({
                user: data
            });
            alertSuccess.classList.remove("d-none");
        }).catch((e)=>{
            alertDanger.classList.remove("d-none");
        }); 
    }

    setEmail(){
        let alertSuccess = document.querySelector(".alert-success-email");
        alertSuccess.classList.remove("d-none");
        alertSuccess.classList.add("d-none");

        let username = localStorage.getItem('username'); 
        let email = this.email.current.value;

        $.ajax({
            url: 'http://localhost:8080/api/profile/email',
            dataType: 'json',
            type: 'PUT',
            data: {
                username: username,
                email: email
            }
        }).done( (data) =>{
            this.setState({
                user: data
            });
            alertSuccess.classList.remove("d-none");
        }).catch((e)=>{
            console.log('something went wrong at setEmail')
        }); 
    }

    setPassword(){
        let alertSuccess = document.querySelector(".alert-success-password");
        let alertDanger = document.querySelector(".alert-danger-password1");
        let alertDanger2 = document.querySelector(".alert-danger-password2");
        alertDanger.classList.remove("d-none");
        alertDanger2.classList.remove("d-none");
        alertSuccess.classList.remove("d-none");
        alertDanger.classList.add("d-none");
        alertDanger2.classList.add("d-none");
        alertSuccess.classList.add("d-none");

        let username = localStorage.getItem('username');
        let oldPassword = this.oldPassword.current.value;
        let newPassword = this.newPassword.current.value;
        let newPassword2 = this.newPassword2.current.value;

        if (newPassword !== newPassword2) {
            alertDanger.classList.remove('d-none');
        } else {
            $.ajax({
                url: 'http://localhost:8080/api/profile/password',
                dataType: 'json',
                type: 'PUT',
                data: {
                    username: username,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPassword2: newPassword2
                }
            }).done((data) => {
                alertSuccess.classList.remove("d-none");
            }).catch((e) => {
                alertDanger2.classList.remove("d-none");
            });
        }


    }


    render(){
        let user = this.state.user;
        return(
            <React.Fragment>
                <Nav />
                <Logo />
                <div className="container mt-1">
                    <div className="row justify-content-center mt-5">
                        <div className="col-sm-6">
                            <div className="accordion" id="accordionExample">
                                <div className="card text-center profile-card ">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <div className="row">
                                                <div className="col-8">
                                                    <p className="mr-3 h6 d-inline">Username: <span className="font-italic ml-2">
                                                                {user.username}</span></p>
                                                </div>
                                                <div className="col">
                                                    <button className="btn btn-outline-dark btn-sm" type="button " data-toggle="collapse"
                                                        data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                            <form onSubmit={this.setUsername}>
                                                <div className="form-group form-row my-auto">
                                                    <div className="col-8">
                                                        <input type="text" className="form-control form-control-sm" required
                                                            placeholder="New Username" ref={this.username} />
                                                    </div>
                                                    <div className="col text-right">
                                                        <input type="submit" value="Submit" className="btn btn-outline-dark btn-sm "/>
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto h-50">
                                                    <div className="alert alert-success col-12 m-0 mt-1 d-none alert-success-username"  
                                                         role="alert">
                                                          Username Succesfully Changed
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto h-50">
                                                    <div className="alert alert-danger col-12 m-0 mt-1 d-none alert-danger-username"  
                                                         role="alert">
                                                          Username Already Exists
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="card text-center profile-card">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <div className="row">
                                                <div className="col-8">
                                                    <p className="mr-3 h6 d-inline">Email: <span className="font-italic ml-2">
                                                     {user.email}</span></p>
                                                </div>
                                                <div className="col">
                                                    <button className="btn btn-outline-dark btn-sm" type="button " data-toggle="collapse"
                                                        data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                            <form onSubmit={this.setEmail}>
                                                <div className="form-group form-row my-auto">
                                                    <div className="col-8">
                                                        <input type="email" className="form-control form-control-sm" required
                                                            placeholder="New Email" ref={this.email} />
                                                    </div>
                                                    <div className="col text-right">
                                                        <input type="submit" value="Submit" className="btn btn-outline-dark btn-sm "/>
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto">
                                                    <div className="alert alert-success col-12 m-0 mt-1 d-none alert-success-email" 
                                                        role="alert">
                                                        Email Succesfully Changed
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="card text-center profile-card">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn btn-outline-dark btn-sm" type="button" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Change Password
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                            <form onSubmit={this.setPassword}>
                                                <div className="form-group form-row my-2">
                                                    <div className="col-8">
                                                        <input type="password" className="form-control form-control-sm" required
                                                            placeholder="Old Password"  ref={this.oldPassword}/>
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-2">
                                                    <div className="col-8">
                                                        <input type="password" className="form-control form-control-sm" required
                                                            placeholder="New Password" ref={this.newPassword} />
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-2">
                                                    <div className="col-8">
                                                        <input type="password" className="form-control form-control-sm" required
                                                            placeholder="Confirm New Password" ref={this.newPassword2}/>
                                                    </div>
                                                    <div className="col text-right">
                                                        <input type="submit" value="Submit" className="btn btn-outline-dark btn-sm " />
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto h-50">
                                                    <div className="alert alert-success col-12 m-0 mt-1 d-none alert-success-password"  
                                                         role="alert">
                                                          Username Succesfully Changed
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto h-50">
                                                    <div className="alert alert-danger col-12 m-0 mt-1 d-none alert-danger-password1"  
                                                         role="alert">
                                                          Passwords Dont Match
                                                    </div>
                                                </div>
                                                <div className="form-group form-row my-auto h-50">
                                                    <div className="alert alert-danger col-12 m-0 mt-1 d-none alert-danger-password2"  
                                                         role="alert">
                                                          Wrong Password
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Profile;