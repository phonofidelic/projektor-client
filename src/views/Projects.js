import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import ProjectsGrid from 'components/ProjectsGrid';
import Header from 'components/Header';

function Projects(props) {
  return (
    <div>
      <Header title="Projects"></Header>
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
