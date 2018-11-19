import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Controller from './Controller';
import Screen from './gates/Screen';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Controller} />
          <Route path="/screen" component={Screen.Screen} />
        </div>
      </Router>
    );
  }
}
