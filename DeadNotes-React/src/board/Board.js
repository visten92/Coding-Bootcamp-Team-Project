import React, { Component } from 'react';
import './board.css';
import MainTasks , {GroupUsersSelect , Buttons, GroupUsersLi}  from './MainTasks';
import Foot from './Foot';
import Nav from '../Nav';
import $ from 'jquery';
import ChatBox from './chatBox/ChatBox';

class Board extends Component{

    constructor(props){
        super(props);
        this.state = {
            tasksMain: [],
            tasksForEver: [],
            tasksExpired: [],
            tasksCompleted: [],
            groupsUsers: [],
            creator: {}
        }
        this.userToDismiss = React.createRef();
        this.newUser = React.createRef();
        this.addUserToGroup = this.addUserToGroup.bind(this);
        this.dismissUser = this.dismissUser.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.handler = this.handler.bind(this);
    }

    handler(){
        this.fetchGroupsUsers();
        this.fetchTasks(1);
        this.fetchTasks(2);
        this.fetchTasks(3);
        this.fetchTasks(4);
    }

    componentDidMount(){
        this.fetchGroupsUsers();
        this.fetchTasks(1);//with  deadline
        this.fetchTasks(2);//without deadline
        this.fetchTasks(3);//expired
        this.fetchTasks(4);//completed
    }
    
    
    fetchTasks(status){
        let user = localStorage.getItem('username');
        let id = parseInt(localStorage.getItem('activeGroup'));
       $.ajax({
            url: 'http://localhost:8080/api/tasks',
            dataType: 'json',
            type: 'POST',
            data: {
                username: user,
                id_group: id,
                status: status
            }
        }).done(data => {
            if (status === 1) {
                this.setState({
                    tasksMain: data
                });
            } else if (status === 2) {
                this.setState({
                    tasksForEver: data
                });
            } else if (status === 3) {
                this.setState({
                    tasksExpired: data
                });
            } else if(status === 4) {
                this.setState({
                    tasksCompleted: data
                });
            }
        });
    }

    fetchGroupsUsers(){
        let user = localStorage.getItem('username');
        let id = parseInt(localStorage.getItem('activeGroup'));
        $.ajax({
            url: 'http://localhost:8080/api/group/users',
            dataType: 'json',                       
            type: 'POST',
            data: {
                username: user,
                id_group: id
            }            
       }).done ( data => {
           this.setState({
               groupsUsers: data.userList,
               creator: data.creator
           });
       });
    }
    
    addUserToGroup() {
        let user = this.newUser.current.value;
        let id = parseInt(localStorage.getItem('activeGroup'));
        if (user) {
            $.ajax({
                url: 'http://localhost:8080/api/group/addUser',
                dataType: 'json',
                type: 'POST',
                data: {
                    username: user,
                    id_group: id
                }
            }).done(data => {
                this.setState({
                    groupsUsers: data
                });
            });
        }
    }

    dismissUser(){
        let user = this.userToDismiss.current.value;
        let id = parseInt(localStorage.getItem('activeGroup'));
        if (user) {
            $.ajax({
                url: 'http://localhost:8080/api/group/dismissUser',
                dataType: 'json',
                type: 'POST',
                data: {
                    username: user,
                    id_group: id
                }
            }).done(data => {
                console.log(data);
                this.setState({
                    groupsUsers: data
                });
            });
        }
    }

    leaveGroup(){
        let user = localStorage.getItem('username');
        let id = parseInt(localStorage.getItem('activeGroup'));
        if (user) {
            $.ajax({
                url: 'http://localhost:8080/api/group/dismissUser',
                dataType: 'json',
                type: 'POST',
                data: {
                    username: user,
                    id_group: id
                }
            }).done(data => {
                console.log(data);
                localStorage.removeItem('activeGroup');
                localStorage.removeItem('groupName');
                this.props.history.push('/board');
            });
        }
    }

    render(){
        let groupName = localStorage.getItem('groupName');
        if(groupName){
            return(
                <div className = "board">
                    <Nav />
                    <div className="wrapper">
                        <nav id="sidebar">
                            <button id="dismiss" className="btn btn-outline-light" onClick={this.collapse1}>
                                <i className="fas fa-arrow-left"></i>
                            </button>
                            <div className="sidebar-header">
                                <h3 className="w-75">{groupName}</h3>
                            </div>
                            <ul className="components ml-2">
                                <p><u className="font-weight-bold">Group Users</u></p>
                                <GroupUsersLi list = {this.state.groupsUsers} creator = {this.state.creator} />
                            </ul>
                            <ul className="list-unstyled CTAs">
                                <Buttons creator = {this.state.creator}  addUserToGroup = {this.addUserToGroup} />
                            </ul>
                        </nav>
                        <div id="content">
                            <section >
                                <div>
                                    <div  className="container outC mt-0">
                                        <div className="row outR">
                                            <div className="one column col-3 p-0">
                                                <div className="headBee">
                                                    <h4>Dead</h4>
                                                </div>
                                                <div  className="container scrollerBee">
                                                    <div className="row  justify-content-center">
                                                    <MainTasks list={this.state.tasksExpired} creator={this.state.creator} status={3} 
                                                                handler = {this.handler}/>
                                                                <br/>
                                                    <MainTasks list={this.state.tasksCompleted} creator={this.state.creator} status={4} 
                                                                handler = {this.handler}/>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="two column col-3 col-md-6">
                                                <div className="headBee headC">
                                                    <h4>Due</h4>
                                                </div>
                                                <div className="container scrollerBee mt-4">
                                                    <div className="row  justify-content-center">
                                                        <MainTasks list = {this.state.tasksMain} creator = {this.state.creator} status={1}
                                                                    handler = {this.handler}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="one column col-3 p-0">
                                                <div className="headBee">
                                                    <h4>Perpetual</h4>
                                                </div>
                                                <div className="container scrollerBee">
                                                    <div className="row  justify-content-center">
                                                        <MainTasks list = {this.state.tasksForEver} creator = {this.state.creator} 
                                                        status={2} handler = {this.handler}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                                <div className="container outC mt-3 theFoot">
                                    <div className="row outR">
                                        <Foot list={this.state.groupsUsers} handler = {this.handler}  creator = {this.state.creator} />
                                        <div>
                                            <button type="button" id="sidebarCollapse" className="btn btn-outline-light btn-bar" onClick={this.collapse1}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                            <button type="button" id="sidebarCollapse2" className="btn btn-outline-secondary btn-chat" onClick={this.collapse2}>
                                                <i className="fas fa-comments"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            <section>
                            <ChatBox collapse2={this.collapse2} />
                            <div className="modal fade" id="LeaveModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Leave Group</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                            R  U Sure?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={this.leaveGroup}
                                                data-dismiss="modal">submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="dismissUserModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Dismiss User From Group</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form >
                                                    <div className="form-group">
                                                        <label htmlFor="user">Select User</label>
                                                        <select className="form-control form-control-sm" id="user" ref={this.userToDismiss}>
                                                        <GroupUsersSelect  list = {this.state.groupsUsers} />
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                    onClick={this.dismissUser}>submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Add User to Group</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="user">User</label>
                                                        <input type="text" className="form-control" placeholder="username" id="user" required  
                                                            ref={this.newUser}/>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={this.addUserToGroup} 
                                                        data-dismiss="modal">submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <h3>No Active Group</h3>
            );
        }
    }
     collapse1(){
        let collapse = document.getElementById('sidebar');
        collapse.classList.toggle('active');
     }   
     collapse2(){
        let collapse = document.getElementById('sidebar2');
        collapse.classList.toggle('active');
        let objDiv = document.querySelector('.scroller');
        objDiv.scrollTop = objDiv.scrollHeight;
     }
}

export default Board;
