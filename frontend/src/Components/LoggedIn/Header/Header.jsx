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
            window.location.href="/";
        }
        let logout = ()=>{
            console.log('hit logout!');
            localStorage.removeItem('f1creds');
            window.location.href="/";
        }
        let goToLeagues = ()=>{
            console.log("going to leagues");
            window.location.href="/";
        }
        return(
            <div>
                <header className="App-header">
                    <h1>{this.props.title}</h1>
                    {this.props.leagueId &&
                        <h3>League Id: {this.props.leagueId}</h3>
                    }
                    {/* {this.props.teamId &&
                        <button onClick={goToTeams}>Back to Teams</button>
                    } */}
                    <button onClick={goToLeagues}>Back to Leagues</button>
                    <button onClick={logout}>Log out of {decoded.name}</button>
                </header>
            </div>
        )
    }
}

export default Header;