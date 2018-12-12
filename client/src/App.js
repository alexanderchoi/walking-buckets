import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';

import Input from './components/Input';

import Register from './components/Register';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import Secret from './components/Secret';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={ Home } />

          <Route path='/input' component= { Input } />

          <Route path='/register' component={ Register } />
          <Route path='/login' component= { LogIn } />
          <Route path='/logout' component = { LogOut } />
          <Route path='/secret' component = { Secret } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;