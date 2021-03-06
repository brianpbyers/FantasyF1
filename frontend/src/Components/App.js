import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import AuthForm from './Auths/AuthForm';
import Home from './Home/Home';
import Leagues from './LoggedIn/Leagues/Leagues';
import Teams from './LoggedIn/Teams/Teams';
import Team from './LoggedIn/Team/Team';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <Switch>
              <Route exact path='/' component={ Home } />
              <Route exact path='/authenticate' component={ AuthForm } />
              <Route exact path='/leagues' component={ Leagues }/>
              <Route exact path = '/teams/:leagueId/:leagueName' component={ Teams }/>
              <Route exact path = '/team/:teamId' component = { Team } />
              <Route component = { Leagues } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
