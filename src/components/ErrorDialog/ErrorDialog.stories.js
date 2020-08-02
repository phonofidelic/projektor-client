import React from 'react';
import { action } from '@storybook/addon-actions';
import ErrorDialog from 'components/ErrorDialog';
import { mockError } from './__mock_data';

export default {
  component: ErrorDialog,
  title: 'ErrorDialog',
  excludeStories: /.*Data$/
};

export const errorData = mockError;

export const Default = () => (
  <ErrorDialog
    {...errorData}
    showDialog={true}
    action={action('Error action')}
  />
);
