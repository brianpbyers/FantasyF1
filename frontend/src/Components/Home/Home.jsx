import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './Home.css';

class Home extends Component{

    componentWillMount(){
        if(localStorage.getItem("f1creds")){
            console.log("user session detected.  Redirecting to leagues page");
            window.location.href="/leagues";
        }
    }
    render(){
        return(
            <div>
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Welcome to Fantasy F1</h1>
                </header>
                <p className="App-intro">
                    To get started, <Link to="/authenticate">login or signup.</Link>
                </p>
            </div>
        )
    }
}

export default Home;