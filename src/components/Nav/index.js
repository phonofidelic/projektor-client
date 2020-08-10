import React from 'react';
// import useMobileDetect from 'use-mobile-detect-hook';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Nav(props) {
  const { isMobile } = props;

  console.log('*** isMobile:', isMobile);
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
