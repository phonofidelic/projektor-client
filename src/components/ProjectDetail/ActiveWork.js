import React, { useState, useContext } from 'react';
import moment from 'moment';
import { StringContext } from 'strings';
import styled from 'styled-components';

import Timer from 'components/Timer';
import WorkModal from 'components/ProjectDetail/WorkModal';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PublishIcon from '@material-ui/icons/Publish';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  border-top: solid #e0e0e0 1px;
  padding: 18px;
`;

export default function ActiveWork(props) {
  const { project, createWork } = props;
  const strings = useContext(StringContext);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [workStarted, setWorkStarted] = useState(false);
  const [workActive, setWorkActive] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [noteOpen, setNoteOpen] = useState(false);

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

  const hadleOpenWork = work => {
    // if (work) setWorkItem(work);
    setNoteOpen(true);
  };

  const handleCloseWork = () => {
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
      date: startTime,
      start: startTime,
      end: startTime + time,
      duration: time,
      notes: activeNote
    });

    setWorkActive(false);
    setWorkStarted(false);
    setTime(0);
  };

  return (
    <Container>
      <WorkModal
        open={noteOpen}
        handleClose={handleCloseWork}
        handleSetActiveNote={handleSetActiveNote}
      />
      <div>
        {/**
         * Cancel work
         */}
        {workStarted && (
          <Tooltip
            arrow
            title={strings.hnt__cancel_work}
            placement="top-start"
            enterDelay={400}
          >
            <IconButton onClick={() => handleCancelWork()}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div style={{ flexGrow: 1, lineHeight: '48px' }}>
        {workStarted && (
          <div>
            {workActive ? (
              <Timer format="hh:mm:ss" currentTime={time} setTime={setTime} />
            ) : (
              moment.duration(time, 'ms').format('hh:mm:ss', { trim: false })
            )}
          </div>
        )}
      </div>
      <div>
        {/**
         * Open note modal
         */}
        {workStarted && (
          <Tooltip
            arrow
            title={strings.hnt__add_note}
            placement="top-start"
            enterDelay={400}
          >
            <IconButton onClick={() => hadleOpenWork()}>
              <PostAddIcon />
            </IconButton>
          </Tooltip>
        )}
        {!workStarted ? (
          <div>
            {/**
             * Start new task
             */}
            <Tooltip
              arrow
              title={strings.btn__start_new_task}
              placement="top-start"
              enterDelay={400}
            >
              <IconButton onClick={handleStartWork}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : !workActive ? (
          /**
           * Resume task
           */
          <Tooltip
            arrow
            title={strings.btn__resume_task}
            placement="top-start"
            enterDelay={400}
          >
            <IconButton onClick={handleResumeWork}>
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        ) : (
          /**
           * Pause task
           */

          <Tooltip
            arrow
            title={strings.btn__pause_task}
            placement="top-start"
            enterDelay={400}
          >
            <IconButton onClick={handlePauseWork}>
              <PauseIcon />
            </IconButton>
          </Tooltip>
        )}
        {workStarted && (
          /**
           * Submit new task
           */
          <Tooltip
            arrow
            title={
              workActive ? strings.hnt__pause_to_post : strings.btn__submit_task
            }
            placement="top-start"
            enterDelay={400}
          >
            <span>
              <IconButton disabled={workActive} onClick={handleSubmitWork}>
                <PublishIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </div>
    </Container>
  );
}
