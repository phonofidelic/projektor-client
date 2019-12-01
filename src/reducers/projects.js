import mockProjects from 'utils/mockProjects';
import { SELECT_PROJECT } from 'actions/types';

const defaultState = {
  projectList: mockProjects,
  selectedProject: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: state.projectList.find(
          project => project.id === action.payload
        )
      };

    default:
      return state;
  }
}
