import userReducer, { defaultState } from 'reducers/user';
import {
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  SET_NEW_TOKEN
} from 'actions/types';
import { mockUserInfo } from 'utils/mockData';
import {
  MSG__POST_REGISTRATION_ERROR,
  MSG__POST_LOGIN_ERROR
} from 'constants/strings';

describe('user reducer', () => {
  it('handles POST_REGISTRATION', () => {
    const action = {
      type: POST_REGISTRATION
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles POST_REGISTRATION_SUCCESS', () => {
    const action = {
      type: POST_REGISTRATION_SUCCESS,
      payload: mockUserInfo
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      userInfo: mockUserInfo
    });
  });

  it('handles POST_REGISTRATION_FAILURE', () => {
    const action = {
      type: POST_REGISTRATION_FAILURE
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__POST_REGISTRATION_ERROR }
    });
  });

  it('handles POST_LOGIN', () => {
    const action = {
      type: POST_LOGIN
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles POST_LOGIN_SUCCESS', () => {
    const action = {
      type: POST_LOGIN_SUCCESS,
      payload: mockUserInfo
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      userInfo: mockUserInfo
    });
  });

  it('handles POST_REGISTRATION_FAILURE', () => {
    const action = {
      type: POST_LOGIN_FAILURE
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__POST_LOGIN_ERROR }
    });
  });

  it('handles SET_NEW_TOKEN', () => {
    const action = {
      type: SET_NEW_TOKEN,
      payload: 'MOCK_TOKEN'
    };
    const newState = userReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      token: 'MOCK_TOKEN'
    });
  });
});
