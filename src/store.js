import { AsyncStorage } from "react-native"
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import appReducer from './redux/app';
import calendarReducer from './redux/calendar';
import eventsReducer from './redux/events';

function saveMiddleware({ getState }) {
  return next => action => {
    if(action.saveState) {
      let storingValue = JSON.stringify(getState());
      AsyncStorage.setItem('completeStore', storingValue);
    }
    return next(action)
  }
}

export const getStore = AsyncStorage.getItem('completeStore') //.then((value)=>{ })

const store = createStore(
  combineReducers({
    app: appReducer,
    events: eventsReducer,
    cal: calendarReducer
  }),
  applyMiddleware(
    saveMiddleware,
    thunkMiddleware,
    logger
  )
)


export default store;
