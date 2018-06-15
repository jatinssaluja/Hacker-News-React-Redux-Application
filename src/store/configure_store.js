import storiesReducer from '../reducers/reducer_stories';
import {combineReducers} from 'redux';



const rootReducer = combineReducers({

	stories:storiesReducer

});

export default rootReducer;
