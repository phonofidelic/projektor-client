import {
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  SET_NEW_TOKEN,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from 'actions/types';
import {
  MSG__POST_REGISTRATION_ERROR,
  MSG__POST_LOGIN_ERROR
} from 'constants/strings';

export const defaultState = {
  userInfo: {},
  token: localStorage.getItem('token'),
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
        userInfo: action.payload,
        token: action.payload.token
      };

    case POST_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: MSG__POST_REGISTRATION_ERROR }
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
        userInfo: action.payload,
        token: action.payload.token
      };

    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: MSG__POST_LOGIN_ERROR }
      };

    case SET_NEW_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case GET_USER_INFO:
      return {
        ...state,
        loading: true
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };

    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: 'Could not retrieve user info' }
      };

    default:
      return state;
  }
}
