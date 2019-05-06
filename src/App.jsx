import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from './components/common/header';
import Todo from './components/todo';
import RegisterForm from './components/registerForm';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

// import ModifModal from './components/common/modifModal';
import Example from './example';

class App extends Component {
  handleEnterSignup = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Header onEnterSignup={this.handleEnterSignup} />
        <div className="container">
          <Switch>
            <Route path='/todo' component={Todo} />
            <Route path='/signup' component={RegisterForm} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
