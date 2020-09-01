import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';
import { useAuth0 } from '@auth0/auth0-react';

export function CreateProject(props) {
  const strings = useContext(StringContext);

  const { getAccessTokenSilently } = useAuth0();

  const handleFormSubmit = async data => {
    const token = await getAccessTokenSilently();
    props.createProject(data, token);
  };
  return (
    <motion.div variants={getPageVariant('right')}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__create_project}
        </title>
      </Helmet>
      <Header back title={strings.ttl__create_project} />
      <ProjectForm handleFormSubmit={handleFormSubmit} />
    </motion.div>
  );
}

export default connect(null, actions)(CreateProject);
