import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import requireAuth from 'hocs/requireAuth';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';
import { useAuth0 } from '@auth0/auth0-react';

import Header from 'components/Header';
import WeekOverview from 'components/WeekOverview';

export function Calendar(props) {
  const {
    preload,
    work,
    getAllWorkByInterval,
    getAllWork,
    getProjects
  } = props;
  const strings = useContext(StringContext);
  const [week, setWeek] = useState({
    start: 0,
    end: 6
  });

  const { getAccessTokenSilently } = useAuth0();

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

  useEffect(() => {
    const loadCalendar = async () => {
      const token = await getAccessTokenSilently();
      getAllWork(token);
      getProjects(token);
    };
    !preload && loadCalendar();
  }, [preload, getAllWork, getProjects, week]);

  // const workWithProjectInfo = work.map(workItem => {
  //   if (!(projects.length & work.length)) return;
  //   const project = projects.find(
  //     project => project._id === workItem.projectId
  //   );
  //   return {
  //     ...workItem,
  //     projectColor: project.color,
  //     projectTitle: project.title
  //   };
  // });

  // console.log('====================================');
  // console.log('workWithProjectColor.length:', workWithProjectInfo.length);
  // console.log('====================================');

  return !work.length ? (
    <div>Loading...</div>
  ) : (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={getPageVariant('left')}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {strings.ttl__app_title} - {strings.ttl__dashboard}
        </title>
      </Helmet>
      <Header title={strings.ttl__calendar} />
      <WeekOverview
        work={work}
        handleSelectPrevWeek={handleSelectPrevWeek}
        handleSelectNextWeek={handleSelectNextWeek}
        handleWeekNavigation={handleWeekNavigation}
      />
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    work: state.dashboard.work
  };
};

// export default connect(mapStateToProps, actions)(requireAuth(Calendar));
export default connect(mapStateToProps, actions)(Calendar);
