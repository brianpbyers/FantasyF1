import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Team.css';
import Selector from '../Selector/Selector';
import * as jwt from 'jwt-decode';
import * as myurl from '../../url';

class Team extends Component{

    componentWillMount(){
        let user;
        this.setState({canEdit:false, user:user});
        if(!localStorage.getItem("f1creds")){
            console.log("user session not detected.  Redirecting to home page");
            this.props.history.replace('/');
        }else{
            this.setState({user:jwt(localStorage.getItem('f1creds'))});
        }
    }

    componentDidMount(){
        axios.get(`${myurl}/api/team/${this.props.match.params.teamId}`,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
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
        let driverList;
        if(this.state.canEdit){
            if(this.state && this.state.teamDrivers && this.state.teamDrivers[0]){
                driverList=this.state.teamDrivers.map((driver,i)=>
                    <li key={driver.id}><Selector ref={`d${i+1}`} allOptions={this.state.drivers} defOpt={driver.id} /></li>
                )
            };
        }else{
            if(this.state && this.state.teamDrivers && this.state.teamDrivers[0]){
                driverList=this.state.teamDrivers.map((driver)=>
                    <li key={driver.id}>
                        {driver.code}:   {driver.surname}
                    </li>
                )
            };
        }

        let submitTeam = ()=>{
            console.log('time to submit team!');
            console.log('this.key?', this.props.match.params.teamId);
            let dObj={                
                d1:Number(this.refs.d1.state.value),
                d2:Number(this.refs.d2.state.value),
                d3:Number(this.refs.d3.state.value),
                d4:Number(this.refs.d4.state.value),
                d5:Number(this.refs.d5.state.value),
                d6:Number(this.refs.d6.state.value),
                d7:Number(this.refs.d7.state.value),
                d8:Number(this.refs.d8.state.value),
                d9:Number(this.refs.d9.state.value),
                d10:Number(this.refs.d10.state.value)};

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
            }
            console.log(subObj);
            if((Object.values(dObj).length === new Set(Object.values(dObj)).size)){
                console.log('TRUE!');
                axios.post(`${myurl}/api/team/${this.props.match.params.teamId}`,subObj,{headers:{'Authorization':'Bearer '+localStorage.getItem("f1creds")}})
                .then((results)=>{
                    console.log("WOOOOO!",results);
                    alert("Did you save the team succesfully?"+results.data.success+','+results.data.msg);
                })
                .catch((error)=>{
                    console.log("Awwwwww :(",error);
                });
            }else{
                alert("Please get rid of duplicate driver entries");

            }
        }
        return(
            <div id="teamDiv">
                <Header title="Team Order"/>
                <ol><h4>Drivers</h4>{driverList}</ol>
                {this.state.canEdit && <button onClick={submitTeam}>Save Changes </button>}
            </div>
        )
    }
}

export default Team;




