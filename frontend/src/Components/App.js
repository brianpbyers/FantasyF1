import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthForm from './Auths/AuthForm';
import Home from './Home/Home';
import Leagues from './LoggedIn/Leagues/Leagues';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <div>
              <Route exact path='/' component={ Home } />
              <Route exact path='/authenticate' component={ AuthForm } />
              <Route exact path='/leagues' component={ Leagues }/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
