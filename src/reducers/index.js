import { combineReducers } from 'redux';
import projectsReducer from 'reducers/projects';
import userReducer from 'reducers/user';
import { connectRouter } from 'connected-react-router';
import { history } from 'config';

export default combineReducers({
  projects: projectsReducer,
  user: userReducer,
  router: connectRouter(history)
});
