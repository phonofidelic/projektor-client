import React from 'react';
import { history } from 'config';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

const Container = styled.div`
  display: flex;
  // padding: 10px;
  padding: 18px;
  background: ${({ background }) => background};
`;

const TitleContainer = styled.div`
  padding: 12px;
`;

const ActionsContainer = styled.div`
  // padding: 12px;
`;

export default function Header(props) {
  const { title, centerTitle, back, background, headerActions } = props;

  return (
    <Container background={background}>
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
      <ActionsContainer>{headerActions}</ActionsContainer>
    </Container>
  );
}
