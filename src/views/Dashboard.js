import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import moment from 'moment';

import Header from 'components/Header';
import WeekOverview from 'components/WeekOverview';

export function Dashboard(props) {
  const { work, getAllWorkByInterval } = props;
  const strings = useContext(StringContext);

  const start = moment(moment().day(0)).format();
  const end = moment(moment().day(6)).format();

  useEffect(() => {
    getAllWorkByInterval(start, end);
  }, []);

  console.log('====================================');
  console.log('Dashboard, work:', work);
  console.log('====================================');

  return (
    <div>
      <Header title={strings.ttl__dashboard} />
      <WeekOverview work={work} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    work: state.dashboard.work
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
