import { combineReducers } from 'redux';

import session from './session';
import models from './models';
import alerts from './alerts';

export default combineReducers({
  session, models, alerts
});
