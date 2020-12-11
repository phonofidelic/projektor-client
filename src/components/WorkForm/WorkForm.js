import React, { useState, useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form } from 'formik';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import useMobileDetect from 'use-mobile-detect-hook';

import WorkDetails from './WorkDetails';
import TaskDetails from './TaskDetails';

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

moment.locale(navigator.language);
momentDurationFormatSetup(moment);

const SHOW_WORK_ID = true;
const WORK_FORM_VIEW = 'work_form';
const TASK_FORM_VIEW = 'task_form';

const parseDateString = (string) => {
  if (typeof string === 'number') return string;
  return Date.parse(string);
};

export function WorkForm(props) {
  const {
    project,
    workItem,
    startedWork,
    handleClose,
    createWork,
    updateWork,
    cancelWork,
  } = props;
  const [mainView, setMainView] = useState(WORK_FORM_VIEW);

  const strings = useContext(StringContext);
  const { isMobile } = useMobileDetect();
  const theme = useTheme();

  console.log('WorkForm, workItem:', workItem);

  return (
    <Formik
      initialValues={{
        projectId: project._id,
        project: project._id,
        date: workItem ? workItem.date : Date.now(),
        start: workItem ? workItem.start : Date.now(),
        end: workItem ? workItem.end : Date.now() + 3.6e6,
        duration: workItem ? workItem.duration : 0,
        notes: workItem ? workItem.notes : '',
        tasks: workItem?.tasks || [],
        taskAlloc: workItem?.taskAlloc || [],
      }}
      validate={(values) => {
        const errors = {};
        if (parseDateString(values.end) <= parseDateString(values.start)) {
          errors.end = 'Stop must be after Start';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('Posting note:', values.note);
        console.log('Posting workItem:', workItem);

        workItem || startedWork
          ? updateWork({
              ...values,
              _id: workItem?._id || startedWork?._id,
              duration:
                parseDateString(values.end) - parseDateString(values.start),
            })
          : createWork({
              ...values,
              duration:
                parseDateString(values.end) - parseDateString(values.start),
            });
        handleClose();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form>
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: theme.zIndex.appBar,
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: 24,
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Typography
                id="form-dialog-title"
                variant="h6"
                style={{
                  height: 48,
                  marginRight: 16,
                  lineHeight: '48px',
                  cursor: 'pointer',

                  borderBottom:
                    mainView === WORK_FORM_VIEW
                      ? `4px solid ${theme.palette.secondary.main}`
                      : 'none',
                }}
                color={
                  mainView === WORK_FORM_VIEW ? 'initial' : 'textSecondary'
                }
                onClick={() => setMainView(WORK_FORM_VIEW)}
              >
                {strings.ttl__work_details}
              </Typography>
              <Typography
                noWrap
                variant="h6"
                align="left"
                style={{
                  height: 48,
                  lineHeight: '48px',
                  cursor: 'pointer',
                  borderBottom:
                    mainView === TASK_FORM_VIEW
                      ? `4px solid ${theme.palette.secondary.main}`
                      : 'none',
                }}
                color={
                  mainView === TASK_FORM_VIEW ? 'initial' : 'textSecondary'
                }
                onClick={() => setMainView(TASK_FORM_VIEW)}
              >
                {strings.ttl__task_details}
              </Typography>
            </div>
            {process.env.NODE_ENV !== 'production' && SHOW_WORK_ID && (
              <div
                style={{
                  padding: 24,
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Typography variant="caption">
                  ID: {workItem?._id || startedWork?._id}
                </Typography>
              </div>
            )}

            {isMobile() && <Divider />}
          </div>

          <Slide
            in={mainView === WORK_FORM_VIEW}
            direction="right"
            mountOnEnter
            unmountOnExit
          >
            <div>
              <WorkDetails
                project={project}
                workItem={workItem}
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </div>
          </Slide>

          <Slide
            in={mainView === TASK_FORM_VIEW}
            direction="left"
            mountOnEnter
            unmountOnExit
          >
            <div>
              <TaskDetails
                workItem={workItem}
                project={project}
                values={values}
                setFieldValue={setFieldValue}
              />
            </div>
          </Slide>
          <div
            style={{
              marginTop: 16,
              position: isMobile() ? 'fixed' : 'unset',
              bottom: 0,
              width: '100%',
              backgroundColor: theme.palette.background.default,
              zIndex: theme.zIndex.appBar,
              // paddingRight: 16,
            }}
          >
            {isMobile() && <Divider />}
            <DialogActions>
              <Button
                onClick={startedWork ? cancelWork : handleClose}
                color="primary"
              >
                {strings.btn__cancel}
              </Button>
              <Button
                type="submit"
                color="primary"
                // disabled={Object.keys(errors).length > 0}
              >
                {strings.btn__save}
              </Button>
            </DialogActions>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default WorkForm;
