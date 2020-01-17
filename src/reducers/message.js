import {
  VERIFICATION_FAILURE,
  DISMISS_MESSAGE,
  RESEND_VERIFICATION,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE
} from 'actions/types';

export const defaultState = {
  showDialog: false,
  errorContext: null,
  title: null,
  body: null,
  actionButtonKey: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case VERIFICATION_FAILURE:
      return {
        ...state,
        showDialog: true,
        errorContext: VERIFICATION_FAILURE,
        titleKey: 'ttl__verification_failure',
        bodyKey: 'msg__verification_failure',
        actionButtonKey: 'btn__resend_verification'
      };

    case RESEND_VERIFICATION:
      return {
        ...state,
        loading: true
      };

    case RESEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        actionButton: 'Email sent',
        showDialog: false
      };

    case DISMISS_MESSAGE:
      return {
        ...state,
        showDialog: false
      };

    default:
      return state;
  }
}
