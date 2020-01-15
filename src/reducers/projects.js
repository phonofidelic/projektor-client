import {
  // SELECT_PROJECT,
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
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE,
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPDATE_WORK_FAILURE,
  REMOVE_WORK,
  REMOVE_WORK_SUCCESS,
  REMOVE_WORK_FAILURE,
  SET_PROJECT_STATUS,
  SET_PROJECT_STATUS_SUCCESS,
  SET_PROJECT_STATUS_FAILURE,
  DELETE_ALL_REMOVED_PROJECTS,
  DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  DELETE_ALL_REMOVED_PROJECTS_FAILURE
} from 'actions/types';
import { ACTIVE, COMPLETE, ARCHIVED, DELETED } from 'constants/status';
import {
  MSG__CREATE_PROJECT_ERROR,
  MSG__GET_PROJECT_ERROR,
  MSG__GET_PROJECTS_ERROR,
  MSG__DELETE_PROJECT_ERROR,
  MSG__SET_PROJECT_STATUS_ERROR,
  MSG_FRG__SET_PROJECT_STATUS_ERROR,
  TTL__ACTIVE,
  TTL__COMPLETE,
  TTL__ARCHIVED,
  TTL__DELETED,
  MSG__DELETE_ALL_REMOVED_PROJECTS_ERROR,
  MSG__CREATE_WORK_ERROR
} from 'constants/strings';
import format from 'string-format';
format.extend(String.prototype, {});

export const defaultState = {
  projectList: [],
  selectedProject: null,
  loading: false,
  error: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    // case SELECT_PROJECT:
    //   // TODO: get project detils from API
    //   return {
    //     ...state,
    //     selectedProject: state.projectList.find(
    //       // eslint-disable-next-line
    //       project => project._id == action.payload
    //     )
    //   };

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
      };

    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: MSG__CREATE_PROJECT_ERROR }
      };

    case GET_PROJECTS:
      return {
        ...state,
        loading: true,
        selectedProject: null
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
        error: { message: MSG__GET_PROJECTS_ERROR }
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
        error: { message: MSG__GET_PROJECT_ERROR }
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
        error: { message: MSG__DELETE_PROJECT_ERROR }
      };

    case SET_PROJECT_STATUS:
      return {
        ...state,
        loading: true
      };

    case SET_PROJECT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: state.projectList.filter(
          project => project._id !== action.payload
        )
      };

    case SET_PROJECT_STATUS_FAILURE:
      if (action.payload === ACTIVE) {
        return {
          ...state,
          loading: false,
          error: {
            message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__ACTIVE)
          }
        };
      } else if (action.payload === COMPLETE) {
        return {
          ...state,
          loading: false,
          error: {
            message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__COMPLETE)
          }
        };
      } else if (action.payload === ARCHIVED) {
        return {
          ...state,
          loading: false,
          error: {
            message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__ARCHIVED)
          }
        };
      } else if (action.payload === DELETED) {
        return {
          ...state,
          loading: false,
          error: {
            message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__DELETED)
          }
        };
      } else {
        return {
          ...state,
          loading: false,
          error: {
            message: MSG__SET_PROJECT_STATUS_ERROR
          }
        };
      }

    case DELETE_ALL_REMOVED_PROJECTS:
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
        error: { message: MSG__DELETE_ALL_REMOVED_PROJECTS_ERROR }
      };

    case CREATE_WORK:
      return {
        ...state,
        loading: true
      };

    case CREATE_WORK_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProject: {
          ...state.selectedProject,
          timeUsed: state.selectedProject.timeUsed + action.payload.duration,
          work: [...state.selectedProject.work, action.payload]
        }
      };

    case CREATE_WORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: MSG__CREATE_WORK_ERROR }
      };

    case UPDATE_WORK:
      return {
        ...state,
        loading: true
      };

    case UPDATE_WORK_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProject: {
          ...state.selectedProject,
          work: state.selectedProject.work.map(workItem =>
            workItem._id === action.payload._id ? action.payload : workItem
          )
        }
      };

    case UPDATE_WORK_FAILURE: {
      return {
        ...state,
        loading: false,
        error: { message: 'Could not update work entry' }
      };
    }

    case REMOVE_WORK:
      return {
        ...state,
        loading: true
      };

    case REMOVE_WORK_SUCCESS:
      return {
        ...state,
        loading: true,
        selectedProject: {
          ...state.selectedProject,
          timeUsed: state.selectedProject.timeUsed - action.payload.duration,
          work: state.selectedProject.work.filter(
            workItem => workItem._id !== action.payload._id
          )
        }
      };

    case REMOVE_WORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: 'Could not remove work entry' }
      };

    default:
      return state;
  }
}
