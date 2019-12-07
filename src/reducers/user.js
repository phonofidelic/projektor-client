import {
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE
} from 'actions/types';

const defaultState = {
  userInfo: null,
  loading: false,
  error: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case POST_REGISTRATION:
      return {
        ...state,
        loading: true
      };

    case POST_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };

    case POST_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case POST_LOGIN:
      return {
        ...state,
        loading: true
      };

    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };

    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
