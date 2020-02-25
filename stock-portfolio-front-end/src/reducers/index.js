import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import transactionsReducer from './transactionsReducer'

export default combineReducers({
  usersReducer,
  transactionsReducer
});
