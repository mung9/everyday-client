import React, { Component } from 'react';
import Header from './components/common/header';
import Todo from './components/todo';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';


class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Header/>
        <div className="container">
          <Todo/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
