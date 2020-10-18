import React, { useState } from 'react';
import { history } from 'config';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useMobileDetect from 'use-mobile-detect-hook';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { useAuth } from 'services/AuthProvider';

import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

const Container = styled.div`
  display: flex;
  padding: 16px;
  ${({ isMobile, isProjectDetail, isAuthenticated }) =>
    isMobile && isAuthenticated && !isProjectDetail && 'padding-left: 60px'}
  background: ${({ background }) => background || '#fff'};
`;

const TitleContainer = styled.div`
  padding: 12px;
`;

export default function Header(props) {
  const { title, centerTitle, back, background, position } = props;
  const [showBottomBorder, setShowBottomBorder] = useState(false);

  const { isMobile } = useMobileDetect();
  const { pathname } = useLocation();
  const theme = useTheme();

  const { isAuthenticated } = useAuth();

  const isProjectDetail = /projects\/\w+/.test(pathname);

  useScrollPosition(({ prevPos, currPos }) => {
    setShowBottomBorder(currPos.y < -10);
  }, []);

  return (
    <Container
      isAuthenticated={isAuthenticated}
      isMobile={isMobile()}
      isProjectDetail={isProjectDetail}
      background={background}
      style={
        position
          ? {
              position: position,
              top: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.appBar,
              borderBottom:
                isMobile() && showBottomBorder
                  ? `solid ${theme.palette.divider} 1px`
                  : 'none',
            }
          : null
      }
    >
      {back && (
        <div style={{ margin: 'auto' }}>
          <IconButton
            data-testid="header-back-button"
            style={{ marginRight: 10 }}
            onClick={() => history.goBack()}
          >
            <BackArrow />
          </IconButton>
        </div>
      )}
      {title && (
        <TitleContainer>
          <Typography
            noWrap
            variant="h5"
            style={{
              // lineHeight: '24px',
              maxWidth: isMobile() ? '50vw' : '100%',
            }}
          >
            {title}
          </Typography>
        </TitleContainer>
      )}
      {!centerTitle && <div style={{ flexGrow: 1 }}></div>}
      {props.children}
    </Container>
  );
}
