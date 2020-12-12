import React, { useState, useContext, useRef } from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import { StringContext } from 'strings';
import { useHistory, useLocation } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import { AsyncParser } from 'json2csv';

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
  const { project, work, setProjectStatus, deleteProject } = props;
  const strings = useContext(StringContext);
  const location = useLocation();
  const history = useHistory();
  const { isMobile } = useMobileDetect();
  const buttonRef = useRef(null);
  const { getAccessTokenSilently } = useAuth0();

  const [anchorEl, setAnchor] = useState(null);
  const handleMenuClick = (e) => {
    // setAnchor(e.currentTarget);
    setAnchor(buttonRef.current);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleMenuSelection = async (projectId, status) => {
    if (project.isDemo) return props.setDemoProjectStatus(project, status);

    const token = await getAccessTokenSilently();
    setProjectStatus(projectId, status, token);
    handleCloseMenu();

    /**
     * Go back to previous view if status was set from project detail
     */
    if (location.pathname.includes(projectId)) history.goBack();
  };

  const handleDelete = async (projectId) => {
    /**
     * TODO: Use custom Confirm dialog component
     */
    if (window.confirm(strings.msg__delete_perm_confirm)) {
      const token = await getAccessTokenSilently();
      deleteProject(projectId, location, token);
    }
    handleCloseMenu();
  };

  const handleExportProject = () => {
    console.log('work:', work);

    const outputData = work.map((workItem) => ({
      date: moment(workItem.date).format('MM/DD/YYYY'),
      duration: moment
        .duration(workItem.duration, 'ms')
        .format('hh:mm', { trim: false }),
      notes: workItem.notes,
    }));

    const fields = Object.keys(outputData[0]);
    const options = { fields };
    const transformOpts = { highWaterMark: 8192 };
    const filename = `Projektor-export_${project.title.replace(
      / /g,
      '-'
    )}_${moment().format('MM-DD-YYYY_hhmmss')}.csv`;

    const asyncParser = new AsyncParser(options, transformOpts);
    let csv = '';
    asyncParser.processor
      .on('data', (chunk) => (csv += chunk.toString()))
      .on('end', () => {
        // setLoading(false);
        /** Use encodeURIComponent to handle hash symbols in URLs */
        const csvContent =
          'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);

        // const encodedUri = encodeURI(csvContent);
        const encodedUri = csvContent;
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
      .on('error', (err) => {
        // setLoading(false);
        console.error(err);
      });
    asyncParser.input.push(JSON.stringify(outputData));
    asyncParser.input.push(null);
  };

  const menuActions = [
    {
      pathname: '/projects',
      status: ACTIVE,
      title: strings.btn__activate,
      icon: <CachedIcon />,
    },
    {
      pathname: '/archived',
      status: ARCHIVED,
      title: strings.btn__archive,
      icon: <BookIcon />,
    },
    {
      pathname: '/removed',
      status: DELETED,
      title: strings.btn__remove,
      icon: <DeleteIcon />,
    },
  ];

  return (
    <div style={{ margin: 'auto' }}>
      <Tooltip arrow title={strings.hnt__project_options}>
        <IconButton ref={buttonRef} onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      {isMobile() ? (
        <MobileProjectMenu
          project={project}
          anchorEl={anchorEl}
          menuActions={menuActions}
          showExportOption={work.length > 0}
          handleMenuSelection={handleMenuSelection}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
          handleDemoEdit={props.handleDemoEdit}
          handleExportProject
        />
      ) : (
        <DesktopProjectMenu
          project={project}
          anchorEl={anchorEl}
          menuActions={menuActions}
          showExportOption={work.length > 0}
          handleMenuSelection={handleMenuSelection}
          handleDelete={handleDelete}
          handleCloseMenu={handleCloseMenu}
          handleDemoEdit={props.handleDemoEdit}
          handleExportProject={handleExportProject}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    work: state.projects.selectedProject?.work || [],
  };
};

export default connect(mapStateToProps, actions)(ProjectMenu);
