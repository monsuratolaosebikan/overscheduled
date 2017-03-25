import R from 'ramda';

function schedulizerStub(events) {
  return {
    scheduable: true,
    schedule: [
      { id: 1, name: 'Blah Deadline', start: 'x', end: 'x' }
    ]
  }
}



// Actions
const SET_ACTIVE_EVENT = 'app/set-active-event'
const TOGGLE_LIST_OR_CAL = 'app/toggle-list-or-cal'
const SCHEDULE_COMPLETE = 'app/schedule-complete'
const SCHEDULE_FAILED = 'app/schedule-failed'

// Initial State
const initialState = {
  view: 'cal',
  past_schedule: [ { id: 234234234, start: 'utc'  } ],
  active_event: { id: 454545454, start: 'utc'  },
  generated_schedule: [ {} ],
  unscheduled_events: []
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_EVENT: return { 
      ...state, 
      past_schedule: state.past_schedule.concat(state.active_event),
      active_event: state.generated_schedule[state.generated_schedule.length],
      generated_schedule: state.generated_schedule.slice(0, -1)
    }
    case TOGGLE_LIST_OR_CAL: return {
      ...state,
      view: state.view === 'cal' ? 'events' : 'cal'
    }
    case SCHEDULE_COMPLETE: return {
      ...state,
      generated_schedule: action.payload.generated_schedule,
      unscheduled_events: []
    }
    case SCHEDULE_FAILED: return {
      ...state,
      view: 'overscheduled',
      unscheduled_events: action.payload.unscheduled_events
    }
    default: return state;
  }
}

// Action Creators
export function shuffle() {
  // Yeah i know this doesn't have to be async. So's your mum.
  return (dispatch, getState) => {
    let state = getState();
    let result = schedulizerStub(state.events)
    
    if (result.scheduable) {
      dispatch({ type: SCHEDULE_COMPLETE, payload: result })
    } else {
      dispatch({ type: SCHEDULE_FAILED, payload: result })
    }
  }
}

export function toggle() {
  return { type: TOGGLE_LIST_OR_CAL };
}

export function setActiveEvent() {
  return { type: SET_ACTIVE_EVENT };
}
