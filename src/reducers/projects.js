import mockProjects from 'utils/mockProjects';
import { SELECT_PROJECT } from 'actions/types';

const defaultState = {
  projectList: mockProjects,
  selectedProject: {}
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: state.projectList.find(
          // eslint-disable-next-line
          project => project.id == action.payload
        )
      };

    default:
      return state;
  }
}
