import React from 'react';
import { Link } from 'react-router-dom';

import Header from 'components/Header';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/registration"
      >
        Create account
      </Button>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/login"
      >
        Sign in
      </Button>
    </div>
  );
}

function Landing(props) {
  return (
    <div>
      <Header title="Projektor" headerActions={<HeaderActions />} />
    </div>
  );
}

export default Landing;
