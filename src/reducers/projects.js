import mockProjects from 'utils/mockProjects';
import {
  SELECT_PROJECT,
  POST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE
} from 'actions/types';

const defaultState = {
  projectList: [],
  selectedProject: null,
  loading: false,
  error: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        loading: true
      };

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: action.payload
      };

    case SELECT_PROJECT:
      // TODO: get project detils from API
      return {
        ...state,
        selectedProject: state.projectList.find(
          // eslint-disable-next-line
          project => project._id == action.payload
        )
      };

    case POST_CREATE_PROJECT:
      return {
        ...state,
        loading: true
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: [...state.projectList, action.payload]
        // selectedProject: action.payload
      };

    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
