import R from 'ramda';
import moment from 'moment'

import scheduleEngine from './scheduleEngine'

// function schedulizerStub(events, {past, present, future}) {
//   let futureEvents = future.map(obj => events[obj.id]);

//   return {
//     scheduable: true,
//     schedule: scheduleEngine(futureEvents)
//     // schedule: Object.keys(events)
//     //   .filter(id => id !== present.id && !pastIds.includes(id))

//     //   .map(id => ({ id, name: events[id].name, start: 'x', end: 'y' })) 
//   }
// }





// Actions
const SET_ACTIVE_EVENT = 'app/set-active-event'
const TOGGLE_LIST_OR_CAL = 'app/toggle-list-or-cal'
const SCHEDULE_COMPLETE = 'app/schedule-complete'
const SCHEDULE_FAILED = 'app/schedule-failed'

//lastWeek.valueOf()
// Initial State
let lastWeek = moment().subtract(7, 'd');
let now = moment();

const initialState = {
  view: 'cal',
  past: [ { past: true, id: '111', startTime: lastWeek.toDate(), endTime: lastWeek.add(4, 'h').toDate()  } ],
  present:  { present: true, id: '222', startTime: now.subtract(1, 'h').toDate(), endTime: now.add(1, 'h').toDate() },
  future: [],
  unscheduled: []
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_EVENT: return { 
      ...state, 
      past: state.past.concat(state.present),
      present: state.future[state.future.length],
      future: state.future.slice(0, -1)
    }
    case TOGGLE_LIST_OR_CAL: return {
      ...state,
      view: state.view === 'cal' ? 'events' : 'cal'
    }
    case SCHEDULE_COMPLETE: return {
      ...state,
      future: action.payload.schedule,
      unscheduled: []
    }
    case SCHEDULE_FAILED: return {
      ...state,
      view: 'overscheduled',
      unscheduled: action.payload.unscheduled
    }
    default: return state;
  }
}

// Action Creators
export function shuffle() {
  return (dispatch, getState) => {
    let state = getState();

    let pastIds = state.app.past.map(obj => obj.id)
    let event_list = Object.keys(state.events)
      .filter(id => id !== state.app.present.id && !pastIds.includes(id))
      .map(id => state.events[id])

    let schedule = R.pipe(
      R.pick(['id', 'startTime', 'endTime']),
      R.assoc('future', true)
    )(scheduleEngine(event_list))

    
    // if (result.scheduable) {
      dispatch({ type: SCHEDULE_COMPLETE, payload: { schedule } })
    // } else {
    //   dispatch({ type: SCHEDULE_FAILED, payload: result })
    // }
  }
}

export function toggle() {
  return { type: TOGGLE_LIST_OR_CAL };
}

export function setActiveEvent() {
  return { type: SET_ACTIVE_EVENT };
}
