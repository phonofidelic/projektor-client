import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPageVariant } from 'constants/pageVariants';

import Header from 'components/Header';
import WeekChart from 'components/WeekOverview/WeekChart';

export const Dashboard = (props) => {
  const { preload, work, getAllWork, getProjects } = props;

  const strings = useContext(StringContext);

  useEffect(() => {
    !preload && getAllWork();
    !preload && getProjects();
  }, [preload, getAllWork, getProjects]);

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
      <Header title={strings.ttl__dashboard} />
      <WeekChart work={work} />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    work: state.dashboard.work,
    projects: state.projects.projectList,
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
