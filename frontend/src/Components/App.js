import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthForm from './Auths/AuthForm';
import Home from './Home/Home';
import Leagues from './LoggedIn/Leagues/Leagues';
import Teams from './LoggedIn/Teams/Teams';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <div>
              <Route exact path='/' component={ Home } />
              <Route exact path='/authenticate' component={ AuthForm } />
              <Route exact path='/leagues' component={ Leagues }/>
              <Route path = '/teams/:leagueId' component={ Teams }/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
