import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavList from './NavList';

import Typography from '@material-ui/core/Typography';

const NAV_WIDTH = 178;

/**
 * Base component creates a margin for main content so that
 * the Nav component does not overlay it.
 */
const Base = styled.div`
  width: ${NAV_WIDTH}px;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${NAV_WIDTH}px;
  background-color: #fff;
  border-right: solid #e0e0e0 1px;
  z-index: 3;
`;

const LogoContainer = styled.div`
  padding: 18px 10px;
`;

export default function DesktopNav() {
  const { pathname } = useLocation();

  return /registration|login/.test(pathname) || pathname === '/' ? null : (
    <Base>
      <Container>
        <LogoContainer>
          <Typography variant="h4">[projektor]</Typography>
        </LogoContainer>
        <NavList />
      </Container>
    </Base>
  );
}
