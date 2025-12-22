import { combineReducers } from 'redux';

import user from './user';
import anime from './anime';

export default combineReducers({
  user,
  anime,
});
