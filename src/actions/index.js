/** PROJECT ACTIONS */
import {
  getProjects,
  getProject,
  createProject,
  editProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash,
  setProjectStatusView,
  searchProjects,
} from 'actions/projectActions';

/** WORK ACTIONS */
import {
  createWork,
  updateWork,
  removeWork,
  getAllWork,
  getAllWorkByInterval,
} from 'actions/workActions';

/** AUTH ACTIONS */
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getUserInfo,
  resendVerificationEmail,
} from 'actions/authActions';

export {
  getProjects,
  setProjectStatusView,
  getProject,
  createProject,
  editProject,
  setProjectStatus,
  deleteProject,
  deleteAllTrash,
  createWork,
  updateWork,
  removeWork,
  getAllWork,
  getAllWorkByInterval,
  registerNewUser,
  loginUser,
  logoutUser,
  getUserInfo,
  resendVerificationEmail,
  searchProjects,
};
