import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Teams.css';

class Teams extends Component{

    componentWillMount(){
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            window.location.href="/";
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/api/teams/${this.props.match.params.leagueId}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('got results!',results);
            this.setState({teams: results.data.results});
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
        let teamList;
        if(this.state && this.state.teams && this.state.teams[0]){
            console.log('creating team list!', this.state.teams);
            teamList = this.state.teams.map((team)=>
                <li key={team.id}>
                    <Link to={`/team/${team.id}`}>{team.name}</Link>
                </li>
            );
        }
        return(
            <div>
                <Header />
                <p className="App-intro">
                </p>
                <ul>League Standings{teamList}</ul>
            </div>
        )
    }
}

export default Teams;