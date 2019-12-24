import React from 'react';
import moment from 'moment';

import 'moment/locale/sv';

moment.locale(navigator.language);

export const MomentContext = React.createContext(moment);
