import React, { useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';

import WeekChart from 'components/WeekOverview/WeekChart';
import WeekSchedule from 'components/WeekOverview/WeekSchedule';

import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  padding: 1px;
  text-align: left;
`;

export default function WeekOverview(props) {
  const { work } = props;
  const strings = useContext(StringContext);

  return (
    <Container>
      <div style={{ padding: 18 }}>
        <Typography variant="h6" style={{ padding: 12 }}>
          {strings.ttl__this__week}
        </Typography>
      </div>
      {/* <WeekChart work={work} /> */}
      <WeekSchedule work={work} />
    </Container>
  );
}
