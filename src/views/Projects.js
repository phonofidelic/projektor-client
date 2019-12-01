import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import ProjectsGrid from 'components/ProjectsGrid';

function Registration(props) {
  const handleProjectSelection = id => {
    props.selectProject(id);
  };
  return (
    <div>
      <div>Projects</div>
      <ProjectsGrid handleProjectSelection={handleProjectSelection} />
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

export default connect(mapStateToProps, actions)(Registration);
