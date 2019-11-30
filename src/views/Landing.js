import React from 'react';
import { Link } from 'react-router-dom';

function Landing(props) {
  return (
    <div>
      <div>Landing</div>
      <div>
        <Link to="/registration">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Landing;
