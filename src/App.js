import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from 'views/Landing';
import Registration from 'views/Registration';
import Login from 'views/Login';
import Projects from 'views/Projects';
import Project from 'views/Project';
import CreateProject from 'views/CreateProject';
import Removed from 'views/Removed';
import Archived from 'views/Archived';
import Settings from 'views/Settings';
import EditProject from 'views/EditProject';
import Nav from 'components/Nav';

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <div>
        <Nav />
      </div>
      <div style={{ width: '100%', paddingBottom: 90 }}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/projects/create">
            <CreateProject />
          </Route>
          <Route path="/projects/edit/:projectId">
            <EditProject />
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
          <Route path="/archived">
            <Archived />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
