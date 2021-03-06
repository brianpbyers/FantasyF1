import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Leagues.css';
import * as myurl from '../../url';

class Leagues extends Component{

    componentWillMount(){
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            this.props.history.replace('/');
        }
    }

    componentDidMount(){
        axios.get(`${myurl}/api/leagues`,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
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
        this.state={
            createLeague:false,
            joinLeague:false
        }
    }

    toggleCreate(){
        this.setState({
            createLeague:!this.state.createLeague
        });
    }

    toggleJoin(){
        this.setState({
            joinLeague:!this.state.joinLeague
        });
    }

    createLeague(e){
        e.preventDefault();
        console.log("it's league creatin time!");
        console.log(this.refs);
        axios.post(`${myurl}/api/leagues`,{name:this.refs.leagueName.value},{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('Created League?',results);
            this.props.history.push(`/teams/${results.data.leagueId}/${results.data.leagueName}`);
        })
        .catch((err)=>{
            console.log('error creating league:',err);
        })
    }

    joinLeague(e){
        e.preventDefault();
        console.log("it's league joinin time!");
        axios.post(`${myurl}/api/league/join`,{leagueId:this.refs.leagueId.value},{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('response:',results);
            if(results.data.success){
                console.log('successfully joined league!');
                this.props.history.push(`/teams/${this.refs.leagueId.value}/${results.data.leagueName}`);
            }else{
                console.log('league join was unsuccessful',results.data.msg);
                this.refs.leagueId.value='';
                alert(results.data.msg);
            }
        })
        .catch((err)=>{
            console.log('there has been an error joining the league:',err);
        })
    }

    render(){
        console.log(this.state);
        let leagueList;
        if(this.state && this.state.leagues && this.state.leagues[0]){
            console.log('creating league list!', this.state.leagues);
            leagueList = this.state.leagues.map((league)=>
                <li key={league.id}>
                    <Link to={`/teams/${league.id}/${league.name}`}>{league.name}</Link>
                </li>
            );
        }
        return(
            <div id="leagueDiv">
                <Header title="My Leagues" />
                <ul>{leagueList}</ul>
                <button onClick={ this.toggleCreate.bind(this) }>Create a new league</button>
                {this.state.createLeague && <div>
                        <form onSubmit = {this.createLeague.bind(this)}>
                            <div className="leagueName">
                                <label htmlFor="leagueName">League Name*</label>
                                <input type="text" ref="leagueName" required/>
                            </div>
                            <div className="login-btn">
                                <input type="submit" value="Create"/>
                            </div>
                        </form>
                    </div>}
                <button onClick={ this.toggleJoin.bind(this) }>Join an existing league</button>
                {this.state.joinLeague && <div>
                        <form onSubmit = {this.joinLeague.bind(this)}>
                            <div className="leagueId">
                                <label htmlFor="leagueId">League Id*</label>
                                <input type="text" ref="leagueId" required/>
                            </div>
                            <div className="login-btn">
                                <input type="submit" value="Join"/>
                            </div>
                        </form>
                    </div>}
            </div>
        )
    }
}

export default Leagues;