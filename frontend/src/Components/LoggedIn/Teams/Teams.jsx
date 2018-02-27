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
                    <Link to={`/team/${team.id}`}>{team.name}</Link>
                </li>
            );
        }
        return(
            <div>
                <Header title={this.props.match.params.leagueName}/>
                <p className="App-intro">
                </p>
                <ul>League Standings{teamList}</ul>
            </div>
        )
    }
}

export default Teams;