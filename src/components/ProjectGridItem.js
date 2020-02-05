import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';
// import posed, { PoseGroup } from 'react-pose';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPACT, EXPANDED, TABLE } from 'constants/projectsDisplayModes';

import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Green from '@material-ui/core/colors/green';
import Grey from '@material-ui/core/colors/grey';
const SHADE = 400;
const defaultProjectColor = Grey;
const projectColor = false;

// const Container = styled(motion.custom(Grid))`
const Container = styled(Grid)`
  padding: 10px;
  // border: 1px solid red;
  text-decoration: none;
`;

const CardContainer = styled(Card)`
  position: relative;
  height: ${({ display }) => (display === EXPANDED ? 372 : 77)}px;

  &.MuiPaper-root {
    background-color: ${projectColor
      ? projectColor[SHADE]
      : defaultProjectColor[50]};
  }
  &:hover {
    // background-color: #e0e0e0;
    background-color: ${projectColor
      ? projectColor[600]
      : defaultProjectColor[300]};
    transition: background-color 0.6s;
  }
`;

const CardHeader = styled.div`
  display: flex;
  padding: 16px;
  color: #000;
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
  border-radius: 4px;
  overflow: hidden;
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

  return (
    // <motion.span key={project._id} exit={{ opacity: 0 }} positionTransition>
    <Container
      item
      xs={12}
      sm={6}
      md={4}
      component={motion.div}
      exit={{ opacity: 0, x: -500 }}
      enter={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      positionTransition
    >
      <CardContainer display={projectsDisplayMode}>
        <CardLink
          // to={`${project.location}/${project._id}`}
          to={`projects/${project._id}`}
          style={{ textDecoration: 'none' }}
        >
          <CardHeader>
            <Typography
              style={{ flexGrow: 1, lineHeight: '2em' }}
              variant="h6"
              // component="h2"
              noWrap
            >
              {project.title}
            </Typography>
            {/* <ProjectMenu
              project={project}
            /> */}
          </CardHeader>

          {projectsDisplayMode === EXPANDED && (
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
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {project.description === 'No description provided'
                    ? strings.msg__empty_project_description
                    : project.description}
                </Typography>
              </div>
            </CardContent>
          )}
        </CardLink>
        {/* <div style={{ height: 5 }}>
          {project.budgetedTime && (
            <LinearProgress
              value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
              variant="determinate"
              style={{ height: 5 }}
            />
          )}
        </div> */}
        {project.budgetedTime && (
          <div>
            <ProgressContainer>
              <Progress project={project} />
            </ProgressContainer>
          </div>
        )}
      </CardContainer>
    </Container>
    // </motion.span>
  );
}
