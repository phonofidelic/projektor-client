import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ProjectInfo from 'components/ProjectDetail/ProjectInfo';
import WorkSection from 'components/ProjectDetail/WorkSection';
import ActiveWork from 'components/ProjectDetail/ActiveWork';
import WorkModal from 'components/ProjectDetail/WorkModal';
import WorkForm from 'components/WorkForm';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { strings } from 'strings';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const InfoContainer = styled(Grid)`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
  // height: 201px;
`;

const Description = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

const ProjectInfoContainer = styled(Grid)`
  padding: 18px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

export default function ProjectDetail(props) {
  const { project, createWork, updateWork, removeWork } = props;

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [workStarted, setWorkStarted] = useState(false);
  const [workActive, setWorkActive] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [noteOpen, setNoteOpen] = useState(false);

  const handleSetTime = time => {
    setTime(time);
  };

  const handleStartWork = () => {
    setStartTime(Date.now());
    setWorkStarted(true);
    setWorkActive(true);
    setTime(time);
  };

  const handlePauseWork = () => {
    setWorkActive(false);
    setTime(time);
  };

  const handleResumeWork = () => {
    setWorkActive(true);
  };

  const handleSetActiveNote = note => {
    setActiveNote(note);
  };

  const handleOpenWorkNote = work => {
    // if (work) setWorkItem(work);
    setNoteOpen(true);
  };

  const handleCloseWorkNote = () => {
    setNoteOpen(false);
    // setWorkItem(null);
  };

  const handleCancelWork = () => {
    if (window.confirm(strings.msg__cancel_work_confirm)) {
      setWorkActive(false);
      setWorkStarted(false);
      setTime(0);
    }
  };

  const handleSubmitWork = () => {
    console.log('====================================');
    console.log('start:', startTime);
    console.log('end:', moment(time + startTime).format('hh:mm:ss'));
    console.log('duration:', time);
    console.log('notes:', activeNote);
    console.log('====================================');

    createWork({
      projectId: project._id,
      project: project._id,
      date: startTime,
      start: startTime,
      end: startTime + time,
      duration: time,
      notes: activeNote
    });

    setActiveNote(null);
    setWorkActive(false);
    setWorkStarted(false);
    setTime(0);
  };

  return !project ? null : (
    <Container>
      {/* <WorkModal
        open={noteOpen}
        // workItem={workItem}
        handleClose={handleCloseWork}
        updateWork={updateWork}
      >
        <WorkForm />
      </WorkModal> */}
      <InfoContainer container>
        <Description item xs={12} sm={6} lg={8}>
          {project.description === 'No description provided' ||
          project.description === '' ? (
            <Typography color="textSecondary">
              {strings.msg__empty_project_description}
            </Typography>
          ) : (
            <Typography>{project.description}</Typography>
          )}
        </Description>
        <ProjectInfoContainer item xs={12} sm={6} lg={4}>
          <ProjectInfo project={project} time={time} />
        </ProjectInfoContainer>
      </InfoContainer>
      <WorkSection
        project={project}
        createWork={createWork}
        updateWork={updateWork}
        removeWork={removeWork}
      />
      <ActiveWork
        project={project}
        workStarted={workStarted}
        workActive={workActive}
        activeNote={activeNote}
        noteOpen={noteOpen}
        time={time}
        setTime={setTime}
        handleSetTime={handleSetTime}
        handleStartWork={handleStartWork}
        handlePauseWork={handlePauseWork}
        handleResumeWork={handleResumeWork}
        handleSetActiveNote={handleSetActiveNote}
        handleOpenWorkNote={handleOpenWorkNote}
        handleCloseWorkNote={handleCloseWorkNote}
        handleCancelWork={handleCancelWork}
        handleSubmitWork={handleSubmitWork}
      />
    </Container>
  );
}
