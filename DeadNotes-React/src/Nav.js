import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { UserConsumer } from './UserContext';
import './nav.css';

const NavLink = props => {    
    const link = <Link className="nav-link" to={props.to}>{props.label}</Link>;
    if (props.to === props.location) {
        return <li className="nav-item active">{link}</li>
    }
    else {
        return <li className="nav-item">{link}</li>
    }    
}

class NavMenu extends Component {
    render(){
        if(this.props.context.username){
            return(               
                    
                    <div className="collapse navbar-collapse bg-black" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <NavLink label="Home" to="/" location={this.props.location.pathname} />
                            <NavLink label="Groups" to="/groups" location={this.props.location.pathname} />
                            <NavLink label="Profile" to='/profile' location={this.props.location.pathname} />
                            <NavLink label="Logout" to='/logout' location={this.props.location.pathname} />
                        </ul>
                    </div>
                 );
        }else{
            return(
                    <div className="collapse navbar-collapse bg-black" id="navbarTogglerDemo02">
                      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                         <NavLink label="Home" to="/" location={this.props.location.pathname} />
                         <NavLink label="Info" to="/info" location={this.props.location.pathname} />
                         <NavLink label="Login" to="/login" location={this.props.location.pathname} />
                         <NavLink label="Register" to="/register" location={this.props.location.pathname} />
                      </ul>
                    </div>
                  );
        }
    }
}


class Nav extends Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">DeadNotes</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

             <UserConsumer>
                    { context => 
                        <React.Fragment>
                            <NavMenu 
                                location={this.props.location} 
                                context={context}
                            />                        
                        </React.Fragment>
                    }
              </UserConsumer>
            </nav>
        );
    }
}
export default withRouter(Nav);