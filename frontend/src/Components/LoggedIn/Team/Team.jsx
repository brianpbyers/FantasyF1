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

    render(){
        console.log(this.state);
        console.log(this.state.user);
        let driverList, constructorList;
        if(this.state.canEdit){
            if(this.state && this.state.teamDrivers && this.state.teamDrivers[0]){
                driverList=this.state.teamDrivers.map((driver,i)=>
                    <li key={driver.id}><Selector ref={`d${i+1}`} allOptions={this.state.drivers} defOpt={driver.id} /></li>
                )
            };
            if(this.state && this.state.teamConstructors && this.state.teamConstructors[0]){
                constructorList=this.state.teamConstructors.map((constructorT,i)=>
                    <li key={constructorT.id}>
                        <Selector ref={`c${i+1}`} allOptions={this.state.constructors} defOpt={constructorT.id} />
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

        let submitTeam = ()=>{
            console.log('time to submit team!');
            console.log('this.key?', this.props.match.params.teamId);
            let subObj = {
                d1:Number(this.refs.d1.state.value),
                d2:Number(this.refs.d2.state.value),
                d3:Number(this.refs.d3.state.value),
                d4:Number(this.refs.d4.state.value),
                d5:Number(this.refs.d5.state.value),
                d6:Number(this.refs.d6.state.value),
                d7:Number(this.refs.d7.state.value),
                d8:Number(this.refs.d8.state.value),
                d9:Number(this.refs.d9.state.value),
                d10:Number(this.refs.d10.state.value),
                c1:Number(this.refs.c1.state.value),
                c2:Number(this.refs.c2.state.value),
                c3:Number(this.refs.c3.state.value),
                c4:Number(this.refs.c4.state.value),
                c5:Number(this.refs.c5.state.value)
            }
            console.log(subObj);
            if(Object.values(subObj).length === new Set(Object.values(subObj)).size){
                console.log('TRUE!');
                axios.post(`http://localhost:3000/api/team/${this.props.match.params.teamId}`,subObj,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
                .then((results)=>{
                    console.log("WOOOOO!",results);
                })
                .catch((error)=>{
                    console.log("Awwwwww :(",error);
                });
            }else{
                alert("Please get rid of duplicate entries")
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
                {this.state.canEdit && <button onClick={submitTeam}>Save Changes </button>}
            </div>
        )
    }
}

export default Team;




