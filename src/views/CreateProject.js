import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Header from 'components/Header';
import ProjectForm from 'components/ProjectForm';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';

export function CreateProject(props) {
  const strings = useContext(StringContext);

  const handleFormSubmit = data => {
    props.createProject(data);
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__create_project}
        </title>
      </Helmet>
      <Header back title={strings.ttl__create_project} />
      <ProjectForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default connect(null, actions)(CreateProject);
