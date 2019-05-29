import React, { Component } from 'react';

class Delete extends Component{

    constructor(props){
        super(props);
        this.selected = React.createRef();
    }


    render(){
        const groups = this.props.list;
        let handleSubmit = this.props.handleSubmit;
        return(
            <React.Fragment>                   
                <div className="row justify-content-center">
                    <form  className="form-inline"> {/*onSubmit={()=>handleSubmit(this.selected)}*/}
                        <select className="form-control form-control-sm" ref = {this.selected} >
                        {Object.keys(groups).map( k =>{
                            return(
                                <option key = {k} value={groups[k].id_group}>{groups[k].groupName}</option>
                            );
                        })}                        
                        </select>
                    </form>
                        <button type="submit" className="btn btn-outline-danger btn-sm ml-2" data-toggle="modal"
                                 data-target="#delete-group-modal" >delete</button>
                </div>
                <SubmitModal handleSubmit={handleSubmit} selected = {this.selected} />
            </React.Fragment>
        );
    }

}

export default Delete;


const SubmitModal = props =>{
    let handleSubmit = props.handleSubmit;
    let selected = props.selected;
    return (
            <div className="modal fade" id="delete-group-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                            <button type="button" className="btn btn-primary" data-dismiss="modal" 
                                     onClick={()=>handleSubmit(selected)} >submit</button>
                        </div>
                    </div>
                </div>
            </div>
    );

}