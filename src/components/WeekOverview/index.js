import React, { useContext } from 'react';
import styled from 'styled-components';
import { StringContext } from 'strings';

// import WeekChart from 'components/WeekOverview/WeekChart';
import WeekSchedule from 'components/WeekOverview/WeekSchedule';

import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  padding: 1px;
  text-align: left;
  height: 85vh;
`;

export default function WeekOverview(props) {
  const {
    work,
    handleSelectPrevWeek,
    handleSelectNextWeek,
    handleWeekNavigation,
  } = props;
  const strings = useContext(StringContext);

  // console.log('====================================');
  // console.log('WeekOverview, work:', work);
  // console.log('====================================');

  return (
    <Container>
      {/* <div style={{ display: 'flex', alignContent: 'center', padding: 18 }}>
        <button onClick={handleSelectPrevWeek}>Prev.</button>
        <Typography variant="h6" style={{ padding: 12 }}>
          {strings.ttl__this__week}
        </Typography>
        <button onClick={handleSelectNextWeek}>Next</button>
      </div> */}
      {/* <WeekChart work={work} /> */}
      <WeekSchedule work={work} handleWeekNavigation={handleWeekNavigation} />
    </Container>
  );
}
