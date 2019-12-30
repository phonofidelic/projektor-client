import React, { useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Container = styled(Grid)`
  text-align: left;
  margin: 80px;
`;

export default function UserData(props) {
  const { userInfo } = props;
  const strings = useContext(StringContext);

  return (
    <Container container>
      <Grid item xs={12}>
        <div>
          <Typography variant="overline">{strings.inp_lbl__email}:</Typography>{' '}
          {userInfo.email}
        </div>
      </Grid>
    </Container>
  );
}
