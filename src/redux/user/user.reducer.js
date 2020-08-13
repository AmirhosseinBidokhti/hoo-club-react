
import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    access_token: '',
    user_id: null
    
}

const userReducer = (state=INITIAL_STATE, action) => {

    switch(action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                access_token: action.payload.access_token,
                user_id: action.payload.user_id
            }

        default:
            return state;

    }
};

export default userReducer;