import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];



// wrap in try block since it is very possible depending on browser settings for instance privacy mode
// it wont store to local storage. let user know there is an error
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e);
    }
}


// function that load our localstorage in redux state.
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e);
        return undefined
    }
}


// in order to use that localstorage
const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));




// now we got the state persisted; everytime our state changes update our savetolocalstorage 
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;



