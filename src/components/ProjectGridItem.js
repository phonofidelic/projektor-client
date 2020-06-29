import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';
import { motion } from 'framer-motion';
import { EXPANDED } from 'constants/projectsDisplayModes';

// import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grey from '@material-ui/core/colors/grey';
const Gray = Grey;

const CARD_RADIUS = 2;

const Container = styled(Grid)`
  padding: 10px;
  text-decoration: none;
`;

const CardContainer = styled(Card)`
  position: relative;
  height: ${({ display }) => (display === EXPANDED ? 372 : 72)}px;
  border-radius: ${CARD_RADIUS}px;

  &.MuiPaper-root {
    background-color: ${Gray[50]};
    transition: background-color 0.6s ease-in-out;
  }
  &:hover {
    background-color: ${Gray[300]};
    transition: background-color 0.6s ease-in-out;
  }
`;

const CardHeaderContainer = styled.div`
  display: flex;
  background-color: ${({ projectColor, hovered }) =>
    (projectColor === Gray[50]) & hovered ? Gray[300] : projectColor};
  border-radius: 0 ${CARD_RADIUS}px ${CARD_RADIUS}px ${CARD_RADIUS}px;
  box-shadow: 0 0 10px ${Gray[300]};
  transition: background-color 0.6s ease-in-out;
`;

const CardHeader = styled.div`
  padding: 16px;
  flex: 1;
  color: #000;
  background-color: ${({ hovered }) => (hovered ? Gray[300] : Gray[50])};
  border-radius: 0 ${CARD_RADIUS}px ${CARD_RADIUS}px ${CARD_RADIUS}px;
  transition: background-color 0.6s;
  overflow: hidden;
  transition: background-color 0.6s ease-in-out;
`;

const CardLink = styled(Link)`
  text-decoration: none;

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: #000;
  }
`;

const ProjectInfoContainer = styled.div`
  // display: flex;
  // justify-content: space-around;
`;

const ProgressContainer = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  height: 5px;
  width: 100%;
  border-radius: 0 0 4px 4px;
  // overflow: hidden;
`;

const Progress = styled.div`
  background-color: #000;
  width: ${({ project }) =>
    (project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}%;
  height: 5px;
`;

export default function ProjectGridItem(props) {
  const { project, projectsDisplayMode } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Container item xs={12} sm={6} md={4}>
      <CardContainer
        square={true}
        display={projectsDisplayMode}
        component={motion.div}
        exit={{ opacity: 0, x: -500 }}
        enter={{ opacity: 1, x: 0 }}
        animate={{ height: projectsDisplayMode === EXPANDED ? 372 : 72 }}
        whileHover={{ scale: 1.03 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        positionTransition
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardLink
          to={`projects/${project._id}`}
          style={{ textDecoration: 'none' }}
        >
          <CardHeaderContainer projectColor={project.color} hovered={hovered}>
            <CardHeader hovered={hovered}>
              <Typography
                style={{ flexGrow: 1, lineHeight: '2em' }}
                variant="h6"
                noWrap
              >
                {project.title}
              </Typography>
              {/* <ProjectMenu project={project} /> */}
            </CardHeader>
            <div style={{ width: 10 }}></div>
          </CardHeaderContainer>

          <CardContent>
            <ProjectInfoContainer>
              {project.client && (
                <div>
                  <Typography variant="overline">
                    {strings.lbl__client}
                  </Typography>{' '}
                  {project.client}
                </div>
              )}
              <div>
                <Typography variant="overline">
                  {strings.lbl__start_date}
                </Typography>{' '}
                {project.startDate
                  ? moment(project.startDate).format(
                      currentLocaleData.longDateFormat('L')
                    )
                  : strings.msc__tbd_short}
              </div>
              <div>
                <Typography variant="overline">
                  {strings.lbl__deadline}
                </Typography>{' '}
                {project.deadline
                  ? moment(project.deadline).format(
                      currentLocaleData.longDateFormat('L')
                    )
                  : strings.msc__open}
              </div>
              {project.budgetedTime && (
                <div>
                  <Typography variant="overline">
                    {strings.lbl__budgeted_time}
                  </Typography>
                  {project.budgetedTime.toLocaleString(navigator.language) +
                    strings.frg__hours_short}
                </div>
              )}
              <div>
                <Typography variant="overline">
                  {strings.lbl__time_used}
                </Typography>{' '}
                {moment
                  .duration(project.timeUsed, 'ms')
                  .format('hh:mm:ss', { trim: false })}
              </div>
            </ProjectInfoContainer>
            <div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  height: 100,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {project.description === 'No description provided'
                  ? strings.msg__empty_project_description
                  : project.description}
              </Typography>
            </div>
          </CardContent>
        </CardLink>
        {project.budgetedTime && (
          <ProgressContainer>
            <Progress project={project} />
          </ProgressContainer>
        )}
      </CardContainer>
    </Container>
  );
}
