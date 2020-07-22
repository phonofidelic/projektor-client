import { combineReducers } from 'redux';
import projectsReducer from 'reducers/projects';
import userReducer from 'reducers/user';
import dashboardReducer from 'reducers/dashboard';
import messageReducer from 'reducers/message';
import { connectRouter } from 'connected-react-router';
import { history } from 'config';
// import { taskAnalysisReducer } from 'components/TaskAnalysis';

export default combineReducers({
  projects: projectsReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  message: messageReducer,
  router: connectRouter(history),
  // taskAnalysis: taskAnalysisReducer,
});
