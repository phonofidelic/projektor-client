import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'AnimatedSwitch';
import { PrivateRoute, useAuth } from 'services/AuthProvider';

const Landing = React.lazy(() => import('views/Landing'));
// const Registration = React.lazy(() => import('views/Registration'))
// const Login = React.lazy(() => import('views/Login'));
const Projects = React.lazy(() => import('views/Projects'));
const Calendar = React.lazy(() => import('views/Calendar'));
const Dashboard = React.lazy(() => import('views/Dashboard'));
const Settings = React.lazy(() => import('views/Settings'));
const CreateProject = React.lazy(() => import('views/CreateProject'));
const EditProject = React.lazy(() => import('views/EditProject'));
const Project = React.lazy(() => import('views/Project'));

export const routes = [
  // {
  //   Component: Landing,
  //   path: '/',
  //   exact: true
  // },
  // {
  //   Component: Login,
  //   path: '/login',
  // },
  {
    Component: Calendar,
    path: '/calendar'
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
    Component: Projects,
    path: '/projects',
    exact: true
  },
  {
    Component: Project,
    path: '/projects/:projectId'
  },
  {
    Component: Settings,
    path: '/settings'
  }
];

const Routes = withRouter(({ location }) => {
  const { isAuthenticated } = useAuth();
  return (
    <AnimatedSwitch location={location}>
      <Route exact key={'/'} path="/">
        {isAuthenticated ? <Redirect to="/projects" /> : <Landing />}
      </Route>
      {routes.map(route => {
        return (
          <PrivateRoute
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.Component}
          />
        );
      })}
    </AnimatedSwitch>
  );
});

export default Routes;
