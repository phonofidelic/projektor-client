import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';

import Header from 'components/Header';
import LoginButton from 'components/LoginButton';
import RegistrationButton from 'components/RegistrationButton';
import Demo from 'components/Demo';
import SVGLogo from 'components/Logo';

import Typography from '@material-ui/core/Typography';

const HeaderContent = styled.div`
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const LogoContainer = styled.div`
  margin: 30px auto;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export function Landing(props) {
  const strings = useContext(StringContext);

  const handleLogoClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getPageVariant('left')}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{strings.ttl__app_title}</title>
      </Helmet>
      <Header position="fixed" background="#fff">
        <HeaderContent>
          <LoginButton />
          <RegistrationButton />
        </HeaderContent>
      </Header>
      <HeroContainer>
        <LogoContainer>
          <SVGLogo
            text={strings.ttl__app_title}
            handleClick={handleLogoClick}
          />
        </LogoContainer>
        <Typography>{strings.msg__tagline}</Typography>
      </HeroContainer>
      <SectionContainer>
        <Demo />
      </SectionContainer>
    </motion.div>
  );
}

export default connect(null, actions)(Landing);
