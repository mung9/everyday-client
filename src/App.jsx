import React, { Component } from 'react';
import Header from './components/common/header';
import Todo from './components/todo';

import DateNav from './components/common/dateNav';


import './App.css';

import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Header/>
      {/* d-flex flex-wrap align-content-center justify-content-center */}
        <div className="container">
          <Todo/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
