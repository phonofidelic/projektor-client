import projectsReducer, { defaultState } from 'reducers/projects';

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
  SET_PROJECT_STATUS,
  SET_PROJECT_STATUS_SUCCESS,
  SET_PROJECT_STATUS_FAILURE,
  DELETE_ALL_REMOVED_PROJECTS,
  DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  DELETE_ALL_REMOVED_PROJECTS_FAILURE,
  CREATE_WORK,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAILURE
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

import {
  mockProject,
  mockWork,
  mockSelectedProject,
  mockError
} from 'utils/mockData';

describe('projects reducer', () => {
  it('handles POST_CREATE_PROJECT', () => {
    const action = {
      type: POST_CREATE_PROJECT
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles CREATE_PROJECT_SUCCESS', () => {
    const action = {
      type: CREATE_PROJECT_SUCCESS,
      payload: mockProject
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      projectListByStatus: [mockProject]
    });
  });

  it('handles CREATE_PROJECT_FAILURE', () => {
    const action = {
      type: CREATE_PROJECT_FAILURE
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__CREATE_PROJECT_ERROR }
    });
  });

  it('handles GET_PROJECTS', () => {
    const action = {
      type: GET_PROJECTS
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles GET_PROJECTS_SUCCESS', () => {
    const action = {
      type: GET_PROJECTS_SUCCESS,
      loading: false,
      payload: [mockProject]
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      projectList: [mockProject],
      // activeProjects: [mockProject],
      // archivedProjects: [],
      // removedProjects: [],
      projectListByStatus: [mockProject],
      loading: false,
      error: null
    });
  });

  it('handles GET_PROJECTS_FAILURE', () => {
    const action = {
      type: GET_PROJECTS_FAILURE
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__GET_PROJECTS_ERROR }
    });
  });

  it('handles GET_PROJECT', () => {
    const action = {
      type: GET_PROJECT
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles GET_PROJECT_SUCCESS', () => {
    const action = {
      type: GET_PROJECT_SUCCESS,
      payload: mockProject
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      selectedProject: mockProject
    });
  });

  it('handles GET_PROJECT_FAILURE', () => {
    const action = {
      type: GET_PROJECT_FAILURE
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__GET_PROJECT_ERROR }
    });
  });

  // it('handles DELETE_PROJECT', () => {
  //   const action = {
  //     type: DELETE_PROJECT,
  //   };
  //   const newState = projectsReducer(defaultState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: true,
  //   });
  // });

  // it('handles DELETE_PROJECT_SUCCESS', () => {
  //   const mockState = { ...defaultState, projectList: [mockProject] };
  //   const action = {
  //     type: DELETE_PROJECT_SUCCESS,
  //     payload: '5deccf102d02734c530164ff',
  //   };
  //   const newState = projectsReducer(mockState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: false,
  //     projectList: [],
  //   });
  // });

  // it('handles DELETE_PROJECT_FAILURE', () => {
  //   const action = {
  //     type: DELETE_PROJECT_FAILURE,
  //   };
  //   const newState = projectsReducer(defaultState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: false,
  //     error: { message: MSG__DELETE_PROJECT_ERROR },
  //   });
  // });

  it('handles SET_PROJECT_STATUS', () => {
    const action = {
      type: SET_PROJECT_STATUS
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles SET_PROJECT_STATUS_SUCCESS', () => {
    const mockState = {
      ...defaultState,
      projectList: [mockProject],
      projectListByStatus: [mockProject]
    };
    const action = {
      type: SET_PROJECT_STATUS_SUCCESS,
      payload: mockProject
    };
    const newState = projectsReducer(mockState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      projectList: [mockProject],
      projectListByStatus: []
    });
  });

  it('handles SET_PROJECT_STATUS_FAILURE', () => {
    let action = {
      type: SET_PROJECT_STATUS_FAILURE,
      payload: ACTIVE
    };
    let newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__ACTIVE) }
    });

    action = {
      type: SET_PROJECT_STATUS_FAILURE,
      payload: COMPLETE
    };
    newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: {
        message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__COMPLETE)
      }
    });

    action = {
      type: SET_PROJECT_STATUS_FAILURE,
      payload: ARCHIVED
    };
    newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: {
        message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__ARCHIVED)
      }
    });

    action = {
      type: SET_PROJECT_STATUS_FAILURE,
      payload: DELETED
    };
    newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: {
        message: MSG_FRG__SET_PROJECT_STATUS_ERROR.format(TTL__DELETED)
      }
    });

    action = {
      type: SET_PROJECT_STATUS_FAILURE,
      payload: '***'
    };
    newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: {
        message: MSG__SET_PROJECT_STATUS_ERROR
      }
    });
  });

  // it('handles DELETE_ALL_REMOVED_PROJECTS', () => {
  //   const action = {
  //     type: DELETE_ALL_REMOVED_PROJECTS,
  //   };
  //   const newState = projectsReducer(defaultState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: true,
  //   });
  // });

  // it('handles DELETE_ALL_REMOVED_PROJECTS_SUCCESS', () => {
  //   const mockState = { ...defaultState, projectList: [mockProject] };
  //   const action = {
  //     type: DELETE_ALL_REMOVED_PROJECTS_SUCCESS,
  //   };
  //   const newState = projectsReducer(mockState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: false,
  //     projectList: [],
  //   });
  // });

  // it('handles DELETE_ALL_REMOVED_PROJECTS_FAILURE', () => {
  //   const action = {
  //     type: DELETE_ALL_REMOVED_PROJECTS_FAILURE,
  //   };
  //   const newState = projectsReducer(defaultState, action);
  //   expect(newState).toEqual({
  //     ...defaultState,
  //     loading: false,
  //     error: { message: MSG__DELETE_ALL_REMOVED_PROJECTS_ERROR },
  //   });
  // });

  it('handles CREATE_WORK', () => {
    const action = {
      type: CREATE_WORK
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('handles CREATE_WORK_SUCCESS', () => {
    const mockState = {
      ...defaultState,
      selectedProject: mockSelectedProject
    };
    const action = {
      type: CREATE_WORK_SUCCESS,
      payload: mockWork
    };
    const newState = projectsReducer(mockState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      selectedProject: {
        ...mockState.selectedProject,
        timeUsed: mockState.selectedProject.timeUsed + mockWork.duration,
        work: [...mockState.selectedProject.work, mockWork]
      }
    });
  });

  it('handles CREATE_WORK_FAILURE', () => {
    const action = {
      type: CREATE_WORK_FAILURE
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual({
      ...defaultState,
      loading: false,
      error: { message: MSG__CREATE_WORK_ERROR }
    });
  });

  it('handles action of unknown type', () => {
    const action = {
      type: '***'
    };
    const newState = projectsReducer(defaultState, action);
    expect(newState).toEqual(defaultState);
  });
});
