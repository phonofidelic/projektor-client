import { combineReducers } from 'redux';
import projectsReducer from 'reducers/projects';

export default combineReducers({
  projects: projectsReducer
});
