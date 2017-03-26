import R from 'ramda';
import moment from 'moment'

// Actions
const SET_ACTIVE_DATE = 'cal/set-active-day'
// const SUBMIT_EVENT = 'events/submit-event'

// Initial State
const initialState = {
  active_date: Date.now()
};


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_DATE: return { ...state, active_date: action.payload.active_date };
    // case SUBMIT_EVENT: return {...state, [action.payload.id]: action.payload};
    default: return state;
  }
}

// Action Creators
export function setActiveDate(active_date) {
  return { type: SET_ACTIVE_DATE, payload: { active_date } }
}
