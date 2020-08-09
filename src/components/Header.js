import React from 'react';
import { history } from 'config';
import styled from 'styled-components';
import useMobileDetect from 'use-mobile-detect-hook';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

const Container = styled.div`
  display: flex;
  padding: 18px;
  ${({ isMobile }) => isMobile && 'padding-left: 60px'}
  background: ${({ background }) => background || '#fff'};
`;

const TitleContainer = styled.div`
  padding: 12px;
`;

export default function Header(props) {
  const { title, centerTitle, back, background, position } = props;
  const { isMobile } = useMobileDetect();

  return (
    <Container
      isMobile={isMobile()}
      background={background}
      style={
        position
          ? {
              position: position,
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1
              // borderBottom: isMobile() ? 'solid #e0e0e0 1px' : 'none'
            }
          : null
      }
    >
      {back && (
        <IconButton
          style={{ marginRight: 10 }}
          onClick={() => history.goBack()}
        >
          <BackArrow />
        </IconButton>
      )}
      <TitleContainer>
        <Typography variant="h5" style={{ lineHeight: '24px' }}>
          {title}
        </Typography>
      </TitleContainer>
      {!centerTitle && <div style={{ flexGrow: 1 }}></div>}
      {props.children}
    </Container>
  );
}
