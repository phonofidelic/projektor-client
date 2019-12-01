import { SELECT_PROJECT } from 'actions/types';

export const selectProject = id => {
  return dispatch => {
    dispatch({
      type: SELECT_PROJECT,
      payload: id
    });
  };
};
