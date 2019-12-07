import { combineReducers } from 'redux';
import projectsReducer from 'reducers/projects';
import userReducer from 'reducers/user';

export default combineReducers({
  projects: projectsReducer,
  user: userReducer
});
