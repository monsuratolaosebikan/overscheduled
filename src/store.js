import { AsyncStorage } from "react-native"
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers } from './screens'

function saveMiddleware({ getState }) {
  return next => action => {
    if(action.saveState) {
      let storingValue = JSON.stringify(getState());
      AsyncStorage.setItem('completeStore', storingValue);
    }
    return next(action)
  }
}

const enhancer = compose(
  applyMiddleware(
    saveMiddleware,
    thunkMiddleware
  )
)

export const getStore = AsyncStorage.getItem('completeStore') //.then((value)=>{ })

export default function configureStore(initialState) {
  return createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  )
}
