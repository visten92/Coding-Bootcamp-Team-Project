import React from 'react';
import ReactDOM from 'react-dom';
import 'flipclock/dist/flipclock.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap';
import 'flipclock';
import App from './App';



const userData = { 
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
}

ReactDOM.render(<App userData = {userData} />, document.getElementById('root'));

