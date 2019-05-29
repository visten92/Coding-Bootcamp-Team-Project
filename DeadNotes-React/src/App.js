import React, { Component } from 'react';
import { HashRouter as Router, Route,Redirect } from "react-router-dom";
import Login from './login/Login';
import Register from './login/Register';
import Home from './home/Home';
import Groups from './groups/Groups';
import Board from "./board/Board";
import { UserProvider } from './UserContext';
import Logout from './login/Logout';
import Profile from './login/Profile';
import Info from './info/Info';


class App extends Component {

      constructor(props) {
        super(props);
        this.state = {
          token: props.userData.token,
          username: props.userData.username,
          setUserData: (token, username) => this.setState({
            token: token,
            username: username
          })
        };
      }

  renderProtectedComponent(ProtectedComponent) {
    if (this.state.username !== null) {
        return  (props) => <ProtectedComponent {...props} />;
    }
    else {
        return (props) => <Redirect to='/login' />;
    }
  }



  render() {
    return (
      <UserProvider value={this.state}>
      <Router>
        <Route path = "/" exact component = {Home} />
        <Route path = "/info" component = {Info} />
        <Route path = "/login"  component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route path = "/groups" render={this.renderProtectedComponent(Groups)} />
        <Route path = "/board"  component = {Board} />
        <Route path = "/logout" render={this.renderProtectedComponent(Logout)} />  
        <Route path = "/profile" render={this.renderProtectedComponent(Profile)} />  
      </Router>
      </UserProvider>
    );
  }
}

export default App;
