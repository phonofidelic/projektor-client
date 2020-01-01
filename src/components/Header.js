import React from 'react';
import { history } from 'config';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackArrow from '@material-ui/icons/ArrowBack';

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const TitleContainer = styled.div`
  padding: 12px;
`;

const ActionsContainer = styled.div`
  // padding: 12px;
`;

export default function Header(props) {
  const { title, centerTitle, back, headerActions } = props;

  return (
    <Container>
      {back && (
        <IconButton
          style={{ marginRight: 10 }}
          onClick={() => history.goBack()}
        >
          <BackArrow style={{ color: '#000' }} />
        </IconButton>
      )}
      <TitleContainer>
        <Typography variant="h6" style={{ lineHeight: '24px' }}>
          {title}
        </Typography>
      </TitleContainer>
      {!centerTitle && <div style={{ flexGrow: 1 }}></div>}
      <ActionsContainer>{headerActions}</ActionsContainer>
    </Container>
  );
}
