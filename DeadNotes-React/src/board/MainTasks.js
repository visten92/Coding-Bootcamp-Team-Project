import React, { Component } from 'react';
// import ModalButtons from "./ModalButtons";
import MainModal from './MainModal';


class MainTasks extends Component{

    constructor(props){
        super(props);
        this.state ={
            currentTask: {},
            currentStatus: {},
            modalVisible: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    
    showModal(task,status) {
        this.setState({
            currentTask: task,
            currentStatus: status,
            modalVisible: true});
    }
    
    hideModal() {
        this.setState({modalVisible:false});
    }
    

    render(){
        let tasks = this.props.list;
        let status = this.props.status;
        return(
            <React.Fragment>
                <div className="row  justify-content-center">
                    {Object.keys(tasks).map( k =>{
                        if(status === 1 || status === 2 ){
                                return(
                                    <button className="bubble2 mr-1 my-3 still-alive" key = {k} 
                                    onClick={()=>{this.showModal(tasks[k],status)}} >
                                        <p className="txt_tittle mb-1">{tasks[k].taskTitle}</p>
                                        <p className="txt_user font-italic mb-0 mt-2">{tasks[k].assignedUser.username}</p>
                                    </button>
                                );
                        }else if(status === 3){
                            return(
                                <button className="bubble2 mr-1 my-3 dead" key = {k} data-toggle="modal" data-target="#task-modal"
                                onClick={()=>{this.showModal(tasks[k],status)}} >
                                    <p className="txt_tittle mb-1">{tasks[k].taskTitle}</p>
                                    <p className="txt_user font-italic mb-0 mt-2">{tasks[k].assignedUser.username}</p>
                                </button>
                            );
                        }else if(status === 4){
                            return(
                                <button className="bubble2 mr-1 my-3 completed" key = {k} data-toggle="modal" data-target="#task-modal"
                                onClick={()=>{this.showModal(tasks[k],status)}} >
                                    <p className="txt_tittle mb-1">{tasks[k].taskTitle}</p>
                                    <p className="txt_user font-italic mb-0 mt-2">{tasks[k].assignedUser.username}</p>
                                </button>
                            );
                        }else{
                            return null;
                        }
                    })}
                </div> 
                <MainModal visible={this.state.modalVisible} onHide={this.hideModal} handler={this.props.handler}
                            task = {this.state.currentTask} creator = {this.props.creator} status={this.state.currentStatus} />
            </React.Fragment>  
        )
    }
}
export default MainTasks;
 
export const GroupUsersLi = props =>{
    let users = props.list;
    let creator = props.creator;
    return(
        <React.Fragment>
            {Object.keys(users).map(k =>{    
                if(users[k].username === creator){
                    return(
                        <li className='ml-3' key={k}>{users[k].username} <span className="font-italic">(Admin)</span> </li>
                    );
                }else{           
                return (
                    <React.Fragment key={k}>
                       <li className="ml-3" >{users[k].username}</li>
                    </React.Fragment>
                );
                }
            })}
        </React.Fragment>
    );
}

export const GroupUsersSelect = props =>{
    let users = props.list;
    return(
        <React.Fragment>
            {Object.keys(users).map(k =>{
                return (
                       <option key={k}> {users[k].username} </option>
                   );
            })}
        </React.Fragment>
    );
}


export const Buttons = props => {
    let creator = props.creator;
    let user = localStorage.getItem('username');

    if (creator === user){
        return(
            <React.Fragment>
            <li>
                 <button className="btn btn-outline-info w-100" data-toggle="modal"
                          data-target="#addUserModal">Add User</button>
            </li>
            <li>
                 <button className="btn btn btn-outline-warning w-100 mt-2" disabled>Leave Group</button>
            </li>            
            <li>
                 <button className="btn btn-outline-danger w-100 mt-2" data-toggle="modal"
                          data-target="#dismissUserModal">Dismiss User</button>
            </li>

            </React.Fragment>
        );
    }else {
        return(
            <React.Fragment>
                <li>
                    <button className="btn btn-outline-info w-100" disabled>Add User</button>
                </li>
                <li>
                    <button className="btn btn btn-outline-warning w-100 mt-2" data-toggle="modal"
                          data-target="#LeaveModal">Leave Group</button>
                </li>                
                <li>
                    <button className="btn btn-outline-danger w-100 mt-2" disabled>Dismiss User</button>
                </li>

            </React.Fragment>
        );
    }

}
