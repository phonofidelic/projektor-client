import React from 'react';
import { Link } from 'react-router-dom';

export default function Project(props) {
  return (
    <div>
      <div>Project</div>
      <div>
        <Link to="/projects" replace>
          Back
        </Link>
      </div>
    </div>
  );
}
