import { combineReducers } from 'redux';
import characters from './characterReducer';

const DnDApp = combineReducers({
	characters,
});

export default DnDApp;
