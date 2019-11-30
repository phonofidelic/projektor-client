import React from 'react';
import { Link } from 'react-router-dom';
import ProjectsGrid from 'components/ProjectsGrid';

function Registration(props) {
  return (
    <div>
      <div>Projects</div>
      <ProjectsGrid />
      <div>
        <Link to="/" replace>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Registration;
