import React, { Component } from 'react';
import './groups.css';
import { UserContext } from '../UserContext';
import Bubbles from './Bubbles';
import Delete from './Delete';
import Nav from '../Nav';
import $ from 'jquery';

class Groups extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.groupName = React.createRef();
        this.state ={
            groups: [],
            groupsCreated: []
        };
        this.applyModal = this.applyModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(selected){
        const sel = parseInt(selected.current.value);
        const user = localStorage.getItem('username');
        $.ajax({
            url: 'http://localhost:8080/api/group/delete',
            dataType: 'json',
            type: 'POST',
            data: {
                username: user,
                id_group: sel
            }
        }).done(data => {
            this.fetchAllGroups();
            this.fetchCreatedGroupds();
            localStorage.removeItem('activeGroup');
        });
    }

    fetchAllGroups(){
        const user = localStorage.getItem('username');
        $.ajax({
            url: 'http://localhost:8080/api/groups',
            dataType: 'json',                       
            type: 'POST',
            data: {
                username: user
            }            
       }).done ( data => {
           this.setState({
               groups: data
           });
       });
    }

    fetchCreatedGroupds(){
        const user = localStorage.getItem('username');
        $.ajax({
            url: 'http://localhost:8080/api/groupsCreated',
            dataType: 'json',
            type: 'POST',
            data: {
                username: user
            }
        }).done((data) => {
            this.setState({
                groupsCreated: data
            });
        });
    }

    componentDidMount(){
        this.fetchAllGroups();
        this.fetchCreatedGroupds();
    }

    applyModal(e){
        const name = this.groupName.current.value;
        const user = localStorage.getItem('username');

        $.ajax({
            url: 'http://localhost:8080/api/group/save',
            dataType: 'json',
            type: 'POST',
            data: {
                groupName: name,
                username: user
            }
        }).done((data)=>{
            this.fetchAllGroups();
            this.fetchCreatedGroupds();
        }).catch((e)=>{
            console.log('not ok');
        })
    }



    render(){
        return(
            <React.Fragment>
            
            <div className = "groups">
            <Nav />
                <section id="top">
                    <div className="box">
                        <div className="container mt-5 scrollerG">
                        <Bubbles list = {this.state.groups} history={this.props.history} />
                    </div>
                    <div className="container mt-5">
                        <Delete list = {this.state.groupsCreated}  handleSubmit={this.handleSubmit} />
                    </div>
                </div>
                {/* <Clock2 /> */}
                </section>
                <section id="add-modal">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">New Group</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form className="mod" action="#" method="POST">
                                        <div className="form-group">
                                            <label className ="col-form-label ">Group Name</label>
                                            <input type="text" className="form-control input1" maxLength="20" required ref={this.groupName}/>
                                        </div>
                                        <div className="alert alert-danger d-none" role="alert">
                                            Group Name Required
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary apply" onClick = {this.applyModal} data-dismiss="modal" >Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </React.Fragment>
        );
    }
}

export default Groups;
