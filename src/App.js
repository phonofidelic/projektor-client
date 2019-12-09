import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from 'views/Landing';
import Registration from 'views/Registration';
import Login from 'views/Login';
import Projects from 'views/Projects';
import Project from 'views/Project';
import CreateProject from 'views/CreateProject';
import Removed from 'views/Removed';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/projects/create">
          <CreateProject />
        </Route>
        <Route path="/projects/:projectId">
          <Project />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/removed">
          <Removed />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
