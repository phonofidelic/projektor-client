import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from 'views/Landing';
import Registration from 'views/Registration';
import Login from 'views/Login';
import Projects from 'views/Projects';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
