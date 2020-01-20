import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StringContext } from 'strings';
import moment from 'moment';
import posed from 'react-pose';

import ProjectMenu from 'components/ProjectMenu';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Container = styled(Grid)`
  padding: 10px;
  // border: 1px solid red;
  text-decoration: none;
`;

const PosedContainer = posed(Container)({
  enter: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: '-100%'
  },
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.05 }
});

const CardContainer = styled(Card)`
  position: relative;
  &:hover {
    background-color: #e0e0e0
    // background-color: #ffc107
    transition: background-color 0.6s;
  }
`;

const CardHeader = styled.div`
  display: flex;
  padding: 16px;
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

export default function ProjectGridItem(props) {
  const { project } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <PosedContainer key={project._id} item xs={12} sm={6} md={4}>
      <CardContainer>
        <CardHeader>
          <Typography
            style={{ flexGrow: 1, lineHeight: '2em' }}
            variant="h5"
            component="h2"
            noWrap
          >
            {project.title}
          </Typography>
          <ProjectMenu project={project} />
        </CardHeader>
        <CardLink
          to={`${project.location}/${project._id}`}
          // style={{ textDecoration: 'none' }}
        >
          <CardContent>
            <ProjectInfoContainer>
              <Typography variant="overline">
                {strings.lbl__start_date}
              </Typography>{' '}
              {project.startDate
                ? moment(project.startDate).format(
                    currentLocaleData.longDateFormat('L')
                  )
                : strings.msc__tbd_short}
              <br />
              <Typography variant="overline">
                {strings.lbl__deadline}
              </Typography>{' '}
              {project.deadline
                ? moment(project.deadline).format(
                    currentLocaleData.longDateFormat('L')
                  )
                : strings.msc__open}
            </ProjectInfoContainer>
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
          </CardContent>
        </CardLink>
        <div style={{ height: 5 }}>
          {project.budgetedTime && (
            <LinearProgress
              value={(project.timeUsed / (project.budgetedTime * 3.6e6)) * 100}
              variant="determinate"
              style={{ height: 5 }}
            />
          )}
        </div>
      </CardContainer>
    </PosedContainer>
  );
}
