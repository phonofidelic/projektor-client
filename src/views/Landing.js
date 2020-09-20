import React, { useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
// import { Link } from 'react-router-dom';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';

// import logoSrc from 'assets/logo.svg';
import Header from 'components/Header';
// import RegistrationForm from 'components/RegistrationForm';
import LoginButton from 'components/LoginButton';
import RegistrationButton from 'components/RegistrationButton';
import Demo from 'components/Demo';
import SVGLogo from 'components/Logo';

// import Button from '@material-ui/core/Button';
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
  /* position: sticky;
  top: 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export function Landing(props) {
  const strings = useContext(StringContext);

  // const handleRegistrationSubmit = formData => {
  //   props.registerNewUser(formData);
  // };

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
      {/* <Background /> */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{strings.ttl__app_title}</title>
      </Helmet>
      <Header position="fixed" background="none">
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
          }}
        > */}
        <HeaderContent>
          {/* <Button
            variant="outlined"
            style={{ textDecoratino: 'none', backgroundColor: '#fff' }}
            component={Link}
            to="/login"
          >
            {strings.btn__sign_in}
          </Button> */}
          <LoginButton />
          <RegistrationButton />
        </HeaderContent>
        {/* </div> */}
      </Header>
      <HeroContainer>
        {/* <Logo src={logoSrc} alt={strings.ttl__app_title} /> */}
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
      {/* <SectionContainer id="get-started">
        <FormContainer>
          <div style={{ margin: 20 }}>
            <Typography>{strings.msg__get_started}</Typography>
          </div>
          <RegistrationButton />
        </FormContainer>
      </SectionContainer> */}
    </motion.div>
  );
}

export default connect(null, actions)(Landing);
