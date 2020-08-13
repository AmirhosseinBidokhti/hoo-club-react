import { spinnerActionType } from './loading-spinner.types';


const INITIAL_STATE = {
    loading: false
};

const spinnerReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case spinnerActionType.TOGGLE_SPINNER:
            return {
                ...state,
                loading: action.payload
            }
        
        default:
            return state;
    }
}

export default spinnerReducer;
