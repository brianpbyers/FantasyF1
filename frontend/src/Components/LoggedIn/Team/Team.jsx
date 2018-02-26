import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Team.css';

class Team extends Component{

    // componentWillMount(){
    //     if(!localStorage.getItem("f1creds")){
    //         console.log("user session not detected.  Redirecting to home page");
    //         window.location.href="/";
    //     }
    // }

    componentDidMount(){
        axios.get(`http://localhost:3000/api/team/${this.props.match.params.teamId}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
        .then((results)=>{
            console.log('got results!',results);
            this.setState(results.data);
        })
        .catch((error)=>{
            console.log('caught error:',error);
        });
    }
    // constructor(props){
    //     super(props);

    // }

    render(){
        console.log(this.state);
        let driverList, constructorList;
        if(this.state && this.state.teamDrivers && this.state.teamDrivers[0]){
            driverList=this.state.teamDrivers.map((driver)=>
                <li key={driver.id}>
                    {driver.code}:   {driver.surname}
                </li>
            )
        };
        if(this.state && this.state.teamConstructors && this.state.teamConstructors[0]){
            constructorList=this.state.teamConstructors.map((constructorT)=>
                <li key={constructorT.id}>
                    {constructorT.name}
                </li>
            )
        }
        return(
            <div>
                <Header />
                <p className="App-intro">
                    Team Info
                </p>
                <ol>Drivers{driverList}</ol>
                <ol>Constructors{constructorList}</ol>
            </div>
        )
    }
}

export default Team;