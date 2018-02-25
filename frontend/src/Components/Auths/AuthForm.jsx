import React, { Component } from 'react';
import axios from 'axios';
import './AuthForm.css';

class AuthForm extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            newUser: false
        }
        this.authenticate = this.authenticate.bind(this);
    }
    authenticate(e){
        e.preventDefault();
        console.log('hit authenticate!');
        this.setState({
            email: this.refs.email.value,
            password: this.refs.password.value,
            name: this.refs.name?this.refs.name.value:''
        },()=>{
            console.log('set state!');
            let url = this.state.newUser ? 'http://localhost:3000/api/signup' : 'http://localhost:3000/api/login';
            console.log('posting to this url:',url);
            axios.post(url, this.state)
            .then((response)=>{
                console.log("Successful login?:",response.data);
                if(response.data.success){
                    localStorage.setItem("f1creds", response.data.token);
                    window.location.href="/leagues";
                }else{
                    alert(response.data.msg);
                }
            })
            .catch((err)=>{
                console.log("Error logging in:",err);
            })
        })
    }
    toggleNewUser(){
        this.setState({
            newUser: !this.state.newUser
        })
    }
    render(){
        return(
           <div>
                {!this.state.newUser && <h2>Please log in</h2>}
                {this.state.newUser && <h2>Please sign up</h2>}
                <button onClick={this.toggleNewUser.bind(this)}>{this.state.newUser?"Already a User?":"New to FantasyF1?"}</button>
               <form onSubmit = {this.authenticate}>
                    <div className="email">
                        <label htmlFor="email">email*</label>
                        <input type="email" ref="email" required/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">password*</label>
                        <input type="password" ref="password" required/>
                    </div>
                    {this.state.newUser && 
                        <div className="newUserElements">
                            <div className="reEnterPW">
                                <label htmlFor="reEnterPassword">re-enter password*</label>
                                <input type="password" ref="reEnterPassword" required/>
                            </div>
                            <div className="enterName">
                                <label htmlFor="name">name*</label>
                                <input type="text" ref="name" required/>
                            </div>
                        </div>

                    }
                    <div className="login-btn">
                        <input type="submit" value="submit"/>
                    </div>

               </form>
           </div>
        )
    }
}

export default AuthForm;