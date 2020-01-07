import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';

import Button from '@material-ui/core/Button';

function HeaderActions(props) {
  const strings = useContext(StringContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        style={{ textDecoratino: 'none' }}
        component={Link}
        to="/registration"
      >
        {strings.btn__create_account}
      </Button>
      <Button style={{ textDecoratino: 'none' }} component={Link} to="/login">
        {strings.btn__sign_in}
      </Button>
    </div>
  );
}

export function Landing(props) {
  const strings = useContext(StringContext);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{strings.ttl__app_title}</title>
      </Helmet>
      <Header title="Projektor" headerActions={<HeaderActions />} />
    </div>
  );
}

export default Landing;
