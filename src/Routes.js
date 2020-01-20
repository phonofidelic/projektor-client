import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'AnimatedSwitch';

const Landing = React.lazy(() => import('views/Landing'));
// const Registration = React.lazy(() => import('views/Registration'))
const Login = React.lazy(() => import('views/Login'));
const Projects = React.lazy(() => import('views/Projects'));
const Archived = React.lazy(() => import('views/Archived'));
const Removed = React.lazy(() => import('views/Removed'));
const Dashboard = React.lazy(() => import('views/Dashboard'));
const Settings = React.lazy(() => import('views/Settings'));
const CreateProject = React.lazy(() => import('views/CreateProject'));
const EditProject = React.lazy(() => import('views/EditProject'));
const Project = React.lazy(() => import('views/Project'));

export const routes = [
  {
    Component: Landing,
    path: '/',
    exact: true
  },
  {
    Component: Login,
    path: '/login'
  },
  {
    Component: Dashboard,
    path: '/dashboard'
  },
  {
    Component: CreateProject,
    path: '/projects/create'
  },
  {
    Component: EditProject,
    path: '/projects/edit/:projectId'
  },
  {
    Component: Project,
    path: '/projects/:projectId'
  },
  {
    Component: Projects,
    path: '/projects'
  },
  {
    Component: Project,
    path: '/arcived/:projectId'
  },
  {
    Component: Archived,
    path: '/archived'
  },
  {
    Component: Project,
    path: '/removed/:projectId'
  },
  {
    Component: Removed,
    path: '/removed'
  },
  {
    Component: Settings,
    path: '/settings'
  }
];

const Routes = withRouter(({ location }) => {
  return (
    <AnimatedSwitch location={location}>
      {routes.map(route => {
        return (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={route.Component}
          />
        );
      })}
    </AnimatedSwitch>
  );
});

export default Routes;