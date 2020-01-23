import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import Header from 'components/Header';
import UserInfo from 'components/UserInfo';

import Button from '@material-ui/core/Button';

export function Settings(props) {
  const { preload, userInfo, getUserInfo } = props;
  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getUserInfo();
  }, [preload, getUserInfo]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__settings}
        </title>
      </Helmet>
      <Header nav title={strings.ttl__settings} />
      <UserInfo userInfo={userInfo} />
      <div>
        <Button onClick={props.logoutUser}>{strings.btn__sign_out}</Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Settings));
