import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { useParams } from 'react-router-dom';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth0 } from '@auth0/auth0-react';

import Header from 'components/Header';
import ProjectDetail from 'components/ProjectDetail';
import ProjectMenu from 'components/ProjectMenu';

export function Project(props) {
  const { projectId } = useParams();
  const {
    preload,
    project,
    getProject,
    createWork,
    updateWork,
    removeWork
  } = props;
  const strings = useContext(StringContext);

  const { getAccessTokenSilently } = useAuth0();

  const { isMobile } = useMobileDetect();

  const handleCreateWork = async work => {
    const token = await getAccessTokenSilently();

    createWork(work, token);
  };

  const handleUpdateWork = async work => {
    const token = await getAccessTokenSilently();

    updateWork(work, token);
  };

  const handleRemoveWork = async workId => {
    const token = await getAccessTokenSilently();

    removeWork(workId, token);
  };

  useEffect(() => {
    // !preload && getProject(projectId);

    const loadProject = async () => {
      const token = await getAccessTokenSilently();
      !preload && getProject(projectId, token);
    };
    loadProject();
  }, [preload, getProject, projectId, getAccessTokenSilently]);

  return !project ? null : (
    <motion.div variants={getPageVariant('right')}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {project.title}
        </title>
      </Helmet>
      <Header
        back
        title={project.title}
        position={isMobile() ? 'fixed' : 'unset'}
      >
        <ProjectMenu project={project} />
      </Header>
      <ProjectDetail
        project={project}
        createWork={handleCreateWork}
        updateWork={handleUpdateWork}
        removeWork={handleRemoveWork}
      />
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    project: state.projects.selectedProject
  };
};

export default connect(mapStateToProps, actions)(Project);
