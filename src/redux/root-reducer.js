import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import spinnerReducer from './loading-spinner/loading-spinner.reducer';
export default combineReducers({
    user: userReducer,
    spinner: spinnerReducer
});

