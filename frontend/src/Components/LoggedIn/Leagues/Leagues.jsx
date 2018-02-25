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

    componentDidMount(){
        axios.get('http://localhost:3000/api/leagues',{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('got results!',results);
            this.setState({leagues: results.data});
        })
        .catch((error)=>{
            console.log('caught error:',error);
        });
    }
    constructor(props){
        super(props);

    }

    render(){
        console.log(this.state);
        let leagueList;
        if(this.state && this.state.leagues && this.state.leagues[0]){
            console.log('creating league list!', this.state.leagues);
            leagueList = this.state.leagues.map((league)=>
                <li key={league.id}>
                    <Link to={`/teams/${league.id}`}>{league.name}</Link>
                </li>
            );
        }
        return(
            <div>
                <Header />
                <p className="App-intro">
                    Should list all the leagues here!
                </p>
                <ul>My Leagues{leagueList}</ul>
            </div>
        )
    }
}

export default Leagues;