import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './Home.css';

class Home extends Component{

    componentWillMount(){
        if(localStorage.getItem("f1creds")){
            console.log("user session detected.  Redirecting to leagues page");
            this.props.history.replace("/leagues");
        }
    }
    render(){
        return(
            <div>
                <header className="App-header">
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