import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as jwt from 'jwt-decode';
import './Header.css';

class Header extends Component{

    render(){
        let f1creds = localStorage.getItem('f1creds');
        let decoded = {name:''};
        if(f1creds){
            decoded = jwt(f1creds);
        }else{
            this.props.history.replace('/');
        }
        let logout = ()=>{
            console.log('hit logout!');
            localStorage.removeItem('f1creds');
            this.props.history.replace('/');
        }
        return(
            <div>
                <header className="App-header">
                    <h1>This is the header {decoded.name}</h1>
                </header>
                <button onClick={logout}>Log out of {decoded.name}</button>
            </div>
        )
    }
}

export default Header;