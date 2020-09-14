import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavList from './NavList';
import Logo from 'components/Logo';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  /* width: 80vh; */
  padding: 18px;
  padding-left: 10px;
  z-index: ${({ theme }) => theme.zIndex.appBar + 1};
`;

const NavHeader = styled.div`
  padding: 18px 10px;
  display: flex;
  justify-content: space-between;
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
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div style={{ width: '100vw' }}>
          <NavHeader>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Logo width={50} height={50} />
            <div style={{ width: 48 }} />
          </NavHeader>
          <NavList handleNavSelection={handleNavSelection} />
        </div>
      </Drawer>
    </Container>
  );
}
