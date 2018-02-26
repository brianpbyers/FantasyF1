import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Team.css';
import Selector from '../Selector/Selector';
import * as jwt from 'jwt-decode';

class Team extends Component{

    componentWillMount(){
        let user;
        this.setState({canEdit:false, user:user});
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            window.location.href="/";
        }else{
            this.setState({user:jwt(localStorage.getItem('f1creds'))});
        }
    }

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
        console.log(this.state.user);
        let driverList, constructorList;
        if(this.state.canEdit){
            if(this.state && this.state.teamDrivers && this.state.teamDrivers[0]){
                driverList=this.state.teamDrivers.map((driver,i)=>
                    <li key={driver.id}><Selector ref={i+1} allOptions={this.state.drivers} defOpt={driver.id} /></li>
                )
            };
            if(this.state && this.state.teamConstructors && this.state.teamConstructors[0]){
                constructorList=this.state.teamConstructors.map((constructorT,i)=>
                    <li key={constructorT.id}>
                        <Selector ref={i+1} allOptions={this.state.constructors} defOpt={constructorT.id} />
                    </li>
                )
            }
        }else{
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




