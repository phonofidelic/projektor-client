import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import posed, { PoseGroup } from 'react-pose';

// const Page1 = React.lazy(() => import('./Page1'));
import PreloadLayztComponents from 'PreloadLayzyComponents';
import Routes from 'Routes';

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
import Dashboard from 'views/Dashboard';
import Nav from 'components/Nav';
import ErrorDialog from 'components/ErrorDialog';
import MessageContainer from 'views/MessageContainer';

// const Projects = React.lazy(() => import('views/Projects'));
// const Archived = React.lazy(() => import('views/Archived'));
// const Removed = React.lazy(() => import('views/Removed'));
// const Dashboard = React.lazy(() => import('views/Dashboard'));
// const Settings = React.lazy(() => import('views/Settings'));

const RouteContainer = posed.div({
  enter: { x: 0, opacity: 1, delay: 300, beforeChildren: false },
  exit: { x: '-100%', opacity: 0 }
});

function App() {
  const windowSize = useWindowSize();

  // console.log('*** window width:', windowSize.width);

  return (
    <Route
      render={({ location }) => {
        // console.log('====================================');
        // console.log('App, location:', location);
        // console.log('====================================');
        return (
          <div className="App" style={{ display: 'flex' }}>
            <MessageContainer />
            <div>
              <Nav />
            </div>
            {/* <PoseGroup> */}
            <div style={{ width: '100%' }}>
              {/* <Switch> */}
              <React.Suspense fallback={<div>Loading........</div>}>
                <PreloadLayztComponents />
                <Routes />
              </React.Suspense>
              {/* <Route exact path="/">
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

                <Route path="/archived/:projectId">
                  <Project />
                </Route>
                <Route path="/archived">
                  <Archived />
                </Route>

                <Route path="/removed/:projectId">
                  <Project />
                </Route>
                <Route path="/removed">
                  <Removed />
                </Route>

                <Route path="/dashboard">
                  <Dashboard />
                </Route>

                <Route path="/settings">
                  <Settings />
                </Route> */}
              {/* </Switch> */}
            </div>
            {/* </PoseGroup> */}
          </div>
        );
      }}
    />
  );
}

export default App;
