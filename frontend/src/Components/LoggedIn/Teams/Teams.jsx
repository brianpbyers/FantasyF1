import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Teams.css';
import * as myurl from '../../url';

class Teams extends Component{

    componentWillMount(){
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            this.props.history.replace('/');
        }
    }

    componentDidMount(){
        axios.get(`${myurl}/api/teams/${this.props.match.params.leagueId}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('got results!',results);
            this.setState({teams: results.data.results});
        })
        .catch((error)=>{
            console.log('caught error:',error);
        });
    }

    render(){
        console.log(this.state);
        let teamList;
        if(this.state && this.state.teams && this.state.teams[0]){
            console.log('creating team list!', this.state.teams);
            teamList = this.state.teams.map((team)=>
                <li key={team.id}>
                    <Link to={`/team/${team.id}`}>{team.name}:</Link>
                    <span id="points"> {team.points} points</span>
                </li>
            );
        }
        return(
            <div id="teamsDiv">
                <Header title={this.props.match.params.leagueName} leagueId={this.props.match.params.leagueId}/>
                <p className="App-intro">
                </p>
                <ol><h4>League Standings</h4>{teamList}</ol>
            </div>
        )
    }
}

export default Teams;