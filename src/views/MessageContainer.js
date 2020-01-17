import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { StringContext } from 'strings';

import { VERIFICATION_FAILURE } from 'actions/types';

import ErrorDialog from 'components/ErrorDialog';

export function MessageContainer(props) {
  const {
    errorContext,
    showDialog,
    titleKey,
    bodyKey,
    actionButtonKey,
    resendVerificationEmail
  } = props;
  const strings = useContext(StringContext);

  /**
   * Returns the relevant action based on error context.
   */
  const getAction = () => {
    switch (errorContext) {
      case VERIFICATION_FAILURE:
        return resendVerificationEmail;

      default:
        return null;
    }
  };

  return errorContext ? (
    <ErrorDialog
      showDialog={showDialog}
      action={getAction()}
      title={strings[titleKey]}
      body={strings[bodyKey]}
      actionButton={strings[actionButtonKey]}
    />
  ) : null;
}

const mapStateToProps = state => {
  return {
    showDialog: state.message.showDialog,
    titleKey: state.message.titleKey,
    bodyKey: state.message.bodyKey,
    actionButtonKey: state.message.actionButtonKey,
    errorContext: state.message.errorContext
  };
};

export default connect(mapStateToProps, actions)(MessageContainer);
