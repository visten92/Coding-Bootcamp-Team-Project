import React, { Component } from 'react';
import { UserContext } from '../UserContext';

class Logout extends Component{

    static contextType = UserContext;

    doLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('activeGroup');
                    
        this.context.setUserData(null, null);
        
        this.props.history.push('/');
    }

    componentDidMount(){
        console.log('OK');
        this.doLogout();
    }

    render() {
        return (<p>bye bye</p>);
    }

}

export default Logout;