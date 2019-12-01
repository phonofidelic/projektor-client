import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/projects/create"
      >
        New
      </Button>
    </div>
  );
}

function Projects(props) {
  return (
    <div>
      <Header title="Projects" headerActions={<HeaderActions />} />
      <ProjectsGrid />
      <div>
        <Link to="/" replace>
          Back
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projectList
  };
};

export default connect(mapStateToProps, actions)(Projects);
