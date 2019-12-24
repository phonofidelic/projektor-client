import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'hocs/requireAuth';
import { StringContext } from 'strings';

import Header from 'components/Header';

import Button from '@material-ui/core/Button';

export function Settings(props) {
  const strings = useContext(StringContext);

  return (
    <div>
      <Header nav title={strings.ttl__settings} />
      <div>
        <Button onClick={props.logoutUser}>{strings.btn__sign_out}</Button>
      </div>
    </div>
  );
}

export default connect(null, actions)(requireAuth(Settings));
