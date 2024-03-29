import {
  GET_WORK_BY_INTERVAL,
  GET_WORK_BY_INTERVAL_SUCCESS,
  GET_WORK_BY_INTERVAL_FAILURE,
  GET_ALL_WORK,
  GET_ALL_WORK_SUCCESS,
  GET_ALL_WORK_FAILURE
} from 'actions/types';

export const defaultState = {
  workInterval: 'week', //TODO: use consts
  work: [],
  loading: true,
  error: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_WORK_BY_INTERVAL:
      return {
        ...state,
        loading: true
      };

    case GET_WORK_BY_INTERVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        work: action.payload
      };

    case GET_WORK_BY_INTERVAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: 'Could not load data' }
      };

    case GET_ALL_WORK:
      return {
        ...state,
        loading: true
      };

    case GET_ALL_WORK_SUCCESS:
      return {
        ...state,
        loading: false,
        work: action.payload
      };

    case GET_ALL_WORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: 'Could not load data' }
      };

    default:
      return state;
  }
}
