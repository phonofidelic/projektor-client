import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';

import Header from 'components/Header';
import WeekOverview from 'components/WeekOverview';

export function Dashboard(props) {
  const { preload, work, getAllWorkByInterval, getAllWork } = props;
  const strings = useContext(StringContext);
  const [week, setWeek] = useState({
    start: 0,
    end: 6
  });

  // const start = moment(moment().day(0)).format();
  // const end = moment(moment().day(6)).format();

  const handleSelectPrevWeek = () => {
    setWeek({
      start: week.start - 7,
      end: week.end - 7
    });

    getAllWorkByInterval(
      moment(moment().day(week.start)).format(),
      moment(moment().day(week.end)).format()
    );
  };

  const handleSelectNextWeek = () => {
    setWeek({
      start: week.start + 7,
      end: week.end + 7
    });

    getAllWorkByInterval(
      moment(moment().day(week.start)).format(),
      moment(moment().day(week.end)).format()
    );
  };

  const handleWeekNavigation = direction => {
    console.log('handleWeekNavigation, direction:', direction);
    direction === 'forward' ? handleSelectNextWeek() : handleSelectPrevWeek();
  };

  // console.log('====================================');
  // console.log('start:', moment(moment().day(week.start)).format());
  // console.log('end:', moment(moment().day(week.end)).format());
  // console.log('====================================');

  useEffect(() => {
    !preload &&
      // getAllWorkByInterval(
      //   moment(moment().day(week.start)).format(),
      //   moment(moment().day(week.end)).format()
      // );
      getAllWork();
  }, [preload, getAllWork, week]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__dashboard}
        </title>
      </Helmet>
      <Header title={strings.ttl__dashboard} />
      <WeekOverview
        work={work}
        handleSelectPrevWeek={handleSelectPrevWeek}
        handleSelectNextWeek={handleSelectNextWeek}
        handleWeekNavigation={handleWeekNavigation}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    work: state.dashboard.work
  };
};

export default connect(mapStateToProps, actions)(requireAuth(Dashboard));
