import React, { Component } from 'react';
import {GroupUsersSelect }  from "./MainTasks";
import $ from 'jquery';

class Foot extends Component{

    constructor(props){
        super(props);
        this.taskTitle = React.createRef();
        this.task = React.createRef();
        this.user = React.createRef();
        this.deadline = React.createRef();
        this.taskTitle2 = React.createRef();
        this.task2 = React.createRef();
        this.user2 = React.createRef();
        this.addTaskWithDate = this.addTaskWithDate.bind(this);
        this.addTaskWithOutDate = this.addTaskWithOutDate.bind(this);
        this.clearTasks = this.clearTasks.bind(this);
    }

    addTaskWithDate() {
        let id = localStorage.getItem('activeGroup');
        let taskTitle = this.taskTitle.current.value;
        let task = this.task.current.value;
        let user = this.user.current.value;
        let deadline = this.deadline.current.value;
        if (taskTitle.trim() !== '' && task.trim() !== '' && deadline.trim() !== '') {
            $.ajax({
                url: 'http://localhost:8080/api/tasks/assign',
                dataType: 'json',
                type: 'POST',
                data: {
                    id_group: id,
                    username: user,
                    taskTitle: taskTitle,
                    task: task,
                    deadline: deadline,
                    status: 1
                }
            }).done(data => {
                this.props.handler();
            });
            this.props.handler();
        }
    }

    addTaskWithOutDate(){
        let id = localStorage.getItem('activeGroup');
        let taskTitle2 = this.taskTitle2.current.value;
        let task2 = this.task2.current.value;
        let user2 = this.user2.current.value;
        if (taskTitle2.trim() !== '' && task2.trim() !== '') {
            $.ajax({
                url: 'http://localhost:8080/api/tasks/assign',
                dataType: 'json',
                type: 'POST',
                data: {
                    id_group: id,
                    username: user2,
                    taskTitle: taskTitle2,
                    task: task2,
                    deadline: '9999-01-01',
                    status: 2
                }
            }).done(data => {
                this.props.handler();
            });
            this.props.handler();
        }
    }

    clearTasks(){
        let id = localStorage.getItem('activeGroup');
        $.ajax({
            url: 'http://localhost:8080/api/tasks/clear/'+id,
            dataType: 'json',
            type: 'DELETE',
            data: {
                id: id,
            }
        }).done(data => {
            console.log('ok');
            this.props.handler();
        });

    }



    render(){
        return(
            <React.Fragment>
                <FootButtons creator = {this.props.creator} />
                <div className="modal fade" id="clearModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Clear expired-completed Tasks</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                               R U sure?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.clearTasks}>submit</button>
                            </div>
                        </div>
                    </div>
                </div>   
                <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Assign new Task</h5>
                            
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="title">Task title</label>
                                    <input type="text" className="form-control" placeholder="Title" id="title" required ref = {this.taskTitle} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="task">Task</label>
                                    <textarea className="form-control" id="task" rows="3" required ref = {this.task}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user">Select User</label>
                                    <select className="form-control form-control-sm" id="user" ref = {this.user}>
                                    <GroupUsersSelect  list = {this.props.list} />
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deadline">DeadLine</label>
                                    <input type="date" className="form-control" id="deadline" ref = {this.deadline} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addTaskWithDate}>submit</button>
                        </div>
                    </div>
                </div>
            </div>    
            <div className="modal fade" id="addModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Assign new Task</h5>
                            
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Task title</label>
                                    <input type="text" className="form-control" placeholder="Title" id="title" required  ref = {this.taskTitle2}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="task">Task</label>
                                    <textarea className="form-control" id="task" rows="3" required ref = {this.task2}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user">Select User</label>
                                    <select className="form-control form-control-sm" id="user" ref = {this.user2} >
                                    <GroupUsersSelect  list = {this.props.list} />
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addTaskWithOutDate}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }


}

const FootButtons = props =>{
    let creator = props.creator;
    let user = localStorage.getItem('username');

    if(user === creator){
        return(
                <React.Fragment>
                    <div className="one column col-3">
                        <button className="btn btn-outline-light" data-toggle="modal"
                                data-target="#clearModal"><i className="fas fa-minus"></i></button>
                    </div>
                    <div className="two column col-3 col-md-6">
                        <button className="btn btn-secondary" data-toggle="modal"
                            data-target="#addModal"><i className="fas fa-plus"></i></button>
                    </div>
                    <div className="one column col-3">
                        <button className="btn btn-secondary" data-toggle="modal"
                            data-target="#addModal2"><i className="fas fa-plus"></i></button>
                    </div>
                </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <div className="one column col-3">
                    <button className="btn btn-outline-light" data-toggle="modal"
                            data-target="#clearModal" disabled><i className="fas fa-minus"></i></button>
                </div>
                <div className="two column col-3 col-md-6">
                    <button className="btn btn-secondary" data-toggle="modal"
                        data-target="#addModal" disabled><i className="fas fa-plus"></i></button>
                </div>
                <div className="one column col-3">
                    <button className="btn btn-secondary" data-toggle="modal"
                        data-target="#addModal2" disabled><i className="fas fa-plus"></i></button>
                </div>
             </React.Fragment>
        );
    }
}
export default Foot;


