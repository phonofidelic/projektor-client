import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
// import requireAuth from 'hocs/requireAuth';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';
import { useAuth, requireAuth } from 'services/AuthProvider';

import Header from 'components/Header';
import UserInfo from 'components/UserInfo';
import LogoutButton from 'components/LogoutButton';

export function Settings(props) {
  // const { preload, userInfo, getUserInfo } = props;
  const strings = useContext(StringContext);

  const { user } = useAuth();
  console.log('### Settings, user:', user);

  // useEffect(() => {
  //   !preload && getUserInfo();
  // }, [preload, getUserInfo]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getPageVariant('left')}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__settings}
        </title>
      </Helmet>
      <Header nav title={strings.ttl__settings} />
      {user ? <UserInfo userInfo={user} /> : <div>Loading...</div>}
      <div>
        {/* <Button onClick={props.logoutUser}>{strings.btn__sign_out}</Button> */}
        <LogoutButton />
      </div>
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Settings));
// export default connect(mapStateToProps, actions)(Settings);
