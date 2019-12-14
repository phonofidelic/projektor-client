import {
  SELECT_PROJECT,
  POST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  CREATE_WORK_SUCCESS,
  SET_RPOJECT_STATUS,
  SET_RPOJECT_STATUS_SUCCESS,
  SET_RPOJECT_STATUS_FAILURE,
  DELET_ALL_REMOVED_PORJECTS,
  DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  DELETE_ALL_REMOVED_PROJECTS_FAILURE
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

    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_PROJECT:
      return {
        ...state,
        loading: true
      };

    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProject: action.payload
      };

    case GET_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
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
        // selectedProject: action.payloadx
      };

    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELETE_PROJECT:
      return {
        ...state,
        loading: true
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: state.projectList.filter(
          project => project._id !== action.payload
        )
      };

    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_RPOJECT_STATUS:
      return {
        ...state,
        loading: true
      };

    case SET_RPOJECT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: state.projectList.filter(
          project => project._id !== action.payload
        )
      };

    case SET_RPOJECT_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELET_ALL_REMOVED_PORJECTS:
      return {
        ...state,
        loading: true
      };

    case DELETE_ALL_REMOVED_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: []
      };

    case DELETE_ALL_REMOVED_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case CREATE_WORK_SUCCESS:
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          timeUsed: state.selectedProject.timeUsed + action.payload.duration,
          work: [...state.selectedProject.work, action.payload]
        }
      };

    default:
      return state;
  }
}
