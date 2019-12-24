import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StringContext } from 'strings';

import Header from 'components/Header';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  const strings = useContext(StringContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/registration"
      >
        {strings.btn__create_account}
      </Button>
      <Button
        style={{ textDecoratino: 'none', color: '#fff' }}
        component={Link}
        to="/login"
      >
        {strings.btn__sign_in}
      </Button>
    </div>
  );
}

export function Landing(props) {
  return (
    <div>
      <Header title="Projektor" headerActions={<HeaderActions />} />
    </div>
  );
}

export default Landing;
