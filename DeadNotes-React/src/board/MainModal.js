import React, { Component } from 'react';
import $ from 'jquery';
// import ModalButtons from './ModalButtons';

class MainModal extends Component{

    constructor(props){
        super(props);
        this.$modalDOMElem = null;
        this.modalMounted = this.modalMounted.bind(this);
        this.markCompleted = this.markCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    sendEmail(id){
        $.ajax({
            url: 'http://localhost:8080/api/sendEmail/'+id,
            dataType: 'json',
            type: 'POST'
        }).done(data => {
            console.log('email sent');
        });  
    }

    modalMounted(refToModal) {
        const hideFun = () => {
           this.props.onHide(this.userChoice); 
        };
        if (refToModal !== null) {
            this.$modalDOMElem = $(refToModal);
            this.$modalDOMElem.modal('show');
            this.$modalDOMElem.on('hidden.bs.modal', hideFun.bind(this));
        }        
    }    
    
    markCompleted(id) {
        this.$modalDOMElem.modal('hide');
        $.ajax({
            url: 'http://localhost:8080/api/task/completed/'+id,
            dataType: 'json',
            type: 'PUT'
        }).done(data => {
            this.props.handler();
            // this.sendEmail(id);
        });    

    }

    deleteTask(id){
        this.$modalDOMElem.modal('hide');  
        console.log(id);
        $.ajax({
            url: 'http://localhost:8080/api/task/'+id,
            dataType: 'json',
            type: 'DELETE'
        }).done(data => {
            this.props.handler();
        });    
    }


   // An ugly impl of the modal to change the buttons for each user
   

    render(){
        let activeUser = localStorage.getItem('username');
        let task = this.props.task;    
        let creator = this.props.creator;
        let status = this.props.status;
        if(this.props.visible === true){
            let assignedUser = task.assignedUser.username; 
            let id_task = task.id_task;
            if(activeUser === creator ){
                if(status === 3 || status === 4){
                        return(
                            <div className="modal fade" id="task-modal" tabIndex="-1" ref={this.modalMounted} >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{task.taskTitle}</h5>
                                        <h5 className="modal-title ml-auto" id="exampleModalLabel">{task.deadline}</h5>
                                        <button type="button" className="close ml-3" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="container mt-0">
                                            <div className="row font-italic">
                                                Assigned to: {task.assignedUser.username}
                                            </div>
                                            <div className="row mt-3 text-break">
                                                {task.task}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" 
                                                onClick={()=>this.deleteTask(id_task)}>Delete</button>
                                        {/* <button type="button" className="btn btn-success" 
                                                onClick={()=>{this.markCompleted(id_task)}}>Completed</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                             );
                }else{
                    return(
                            <div className="modal fade" id="task-modal" tabIndex="-1" ref={this.modalMounted} >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{task.taskTitle}</h5>
                                        <h5 className="modal-title ml-auto" id="exampleModalLabel">{task.deadline}</h5>
                                        <button type="button" className="close ml-3" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="container mt-0">
                                            <div className="row font-italic">
                                                Assigned to: {task.assignedUser.username}
                                            </div>
                                            <div className="row mt-3 text-break">
                                                {task.task}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" 
                                                onClick={()=>this.deleteTask(id_task)}>Delete</button>
                                        <button type="button" className="btn btn-success" 
                                                onClick={()=>{this.markCompleted(id_task)}}>Completed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    );   
                }
            }else if(activeUser === assignedUser){
                        if(status === 3 || status ===4 ){
                            return(
                                    <div className="modal fade" id="task-modal" tabIndex="-1" ref={this.modalMounted} >
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">{task.taskTitle}</h5>
                                                <h5 className="modal-title ml-auto" id="exampleModalLabel">{task.deadline}</h5>
                                                <button type="button" className="close ml-3" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div className="modal-body">
                                                <div className="container mt-0">
                                                    <div className="row">
                                                        {task.assignedUser.username}
                                                    </div>
                                                    <div className="row mt-3 text-break">
                                                        {task.task}
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="modal-footer">             
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                    }else{
                        return(
                            <div className="modal fade" id="task-modal" tabIndex="-1" ref={this.modalMounted} >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{task.taskTitle}</h5>
                                        <h5 className="modal-title ml-auto" id="exampleModalLabel">{task.deadline}</h5>
                                        <button type="button" className="close ml-3" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="container mt-0">
                                            <div className="row">
                                                {task.assignedUser.username}
                                            </div>
                                            <div className="row mt-3 text-break">
                                                {task.task}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="modal-footer">          
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" onClick={this.markCompleted}>Completed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                   }
            }else{
                    return(
                        <div className="modal fade" id="task-modal" tabIndex="-1" ref={this.modalMounted} >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{task.taskTitle}</h5>
                                    <h5 className="modal-title ml-auto" id="exampleModalLabel">{task.deadline}</h5>
                                    <button type="button" className="close ml-3" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="container mt-0">
                                        <div className="row">
                                            {task.assignedUser.username}
                                        </div>
                                        <div className="row mt-3 text-break">
                                            {task.task}
                                        </div>
                                    </div>
                                    </div>
                                    <div className="modal-footer">                
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                );
            }
        }else{
            return null;
        }

    }

}
export default MainModal;