import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Leagues.css';

class Leagues extends Component{

    componentWillMount(){
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            window.location.href="/";
        }
    }
    render(){
        return(
            <div>
                <Header />
                <p className="App-intro">
                    Should list all the leagues here!
                </p>
            </div>
        )
    }
}

export default Leagues;