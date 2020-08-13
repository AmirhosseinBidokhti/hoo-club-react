import { spinnerActionType } from './loading-spinner.types';

export const toggleSpinner = loading => ({
    type: spinnerActionType.TOGGLE_SPINNER,
    payload: loading
});
