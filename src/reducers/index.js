import { combineReducers } from 'redux';
import botReducer from './botReducer';

export default combineReducers({
	messages: botReducer,
});
