import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavList from './NavList';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 18px;
  padding-left: 10px;
  z-index: ${({ theme }) => theme.zIndex.appBar + 1};
`;

const LogoContainer = styled.div`
  padding: 18px 10px;
`;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();

  const isProjectDetail = /projects\/\w+/.test(pathname);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavSelection = () => {
    setOpen(false);
  };

  return /registration|login/.test(pathname) || pathname === '/' ? null : (
    <Container theme={theme}>
      {!isProjectDetail && (
        <IconButton id="mobile-nav-button" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <LogoContainer>
          <Typography variant="h4">[projektor]</Typography>
        </LogoContainer>
        <NavList handleNavSelection={handleNavSelection} />
      </Drawer>
    </Container>
  );
}
