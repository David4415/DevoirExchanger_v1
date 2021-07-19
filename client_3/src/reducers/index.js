import { combineReducers } from 'redux';

import menuReducer from './menuReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import forumReducer from './forumReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    menu: menuReducer,
    cours: courseReducer,
    forum: forumReducer,
    form: formReducer
});