
import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    access_token: '',
    user_id: null,
    firstName: '',
    lastName: '',
    memberID: ''
}

const userReducer = (state=INITIAL_STATE, action) => {

    switch(action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                access_token: action.payload.access_token,
                user_id: action.payload.UserID,
                firstName: action.payload.FirstName,
                lastName: action.payload.LastName,
                memberID: action.payload.MemberID
                
                

            }
        
        case userActionTypes.SET_OTP_DATA:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                memberID: action.payload.memberID
                
            }

        default:
            return state;

    }
};

export default userReducer;