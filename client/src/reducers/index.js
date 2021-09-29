import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import review from './review';
import movie from './movie';
import lists from './lists';

export default combineReducers({
  alert,
  auth,
  profile,
  review,
  lists,
  movie
});
