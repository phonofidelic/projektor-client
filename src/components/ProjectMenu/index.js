import React, { useState, useContext } from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import { StringContext } from 'strings';
import { useHistory, useLocation } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth0 } from '@auth0/auth0-react';

import { ACTIVE, ARCHIVED, DELETED } from 'constants/status';
import MobileProjectMenu from './MobileProjectMenu';
import DesktopProjectMenu from './DesktopProjectMenu';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';

export function ProjectMenu(props) {
  const { project, setProjectStatus, deleteProject } = props;
  const strings = useContext(StringContext);
  const location = useLocation();
  const history = useHistory();
  const { isMobile } = useMobileDetect();

  const { getAccessTokenSilently } = useAuth0();

  const [anchorEl, setAnchor] = useState(null);
  const handleMenuClick = e => {
    setAnchor(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleMenuSelection = async (projectId, status) => {
    const token = await getAccessTokenSilently();
    setProjectStatus(projectId, status, token);
    handleCloseMenu();

    /**
     * Go back to previous view if status was set from project detail
     */
    if (location.pathname.includes(projectId)) history.goBack();
  };

  const handleDelete = async projectId => {
    /**
     * TODO: Use custom Confirm dialog component
     */
    if (window.confirm(strings.msg__delete_perm_confirm)) {
      const token = await getAccessTokenSilently();
      deleteProject(projectId, location, token);
    }
    handleCloseMenu();
  };

  const menuActions = [
    {
      pathname: '/projects',
      status: ACTIVE,
      title: strings.btn__activate,
      icon: <CachedIcon />
    },
    {
      pathname: '/archived',
      status: ARCHIVED,
      title: strings.btn__archive,
      icon: <BookIcon />
    },
    {
      pathname: '/removed',
      status: DELETED,
      title: strings.btn__remove,
      icon: <DeleteIcon />
    }
  ];

  return (
    <div>
      <Tooltip arrow title={strings.hnt__project_options}>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      {isMobile() ? (
        <MobileProjectMenu
          project={project}
          anchorEl={anchorEl}
          menuActions={menuActions}
          handleMenuSelection={handleMenuSelection}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
        />
      ) : (
        <DesktopProjectMenu
          project={project}
          anchorEl={anchorEl}
          menuActions={menuActions}
          handleMenuSelection={handleMenuSelection}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
        />
      )}
    </div>
  );
}

export default connect(null, actions)(ProjectMenu);