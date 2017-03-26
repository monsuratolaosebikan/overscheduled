import R from 'ramda';

function schedulizerStub(events, {past, present, future}) {
  let pastIds = past.map(obj => obj.id);
  return {
    scheduable: true,
    schedule: Object.keys(events)
      .filter(id => id !== present.id && !pastIds.includes(id))
      .map(id => ({ id, name: events[id].name, start: 'x', end: 'y' })) 
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
  past: [ /*{ id: '234234234', start: 'utc'  }*/ ],
  present: { name: 'present test',id: '454545454', start: 'utc' },
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
  // Yeah i know this doesn't have to be async. So's your mum.
  return (dispatch, getState) => {
    let state = getState();
    let result = schedulizerStub(state.events, R.pick(['past', 'present', 'future'], state.app))
    
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
