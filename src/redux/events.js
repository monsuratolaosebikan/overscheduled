import R from 'ramda';

// Actions
const EDIT_EVENT = 'events/edit-event'
const CANCEL_EDIT = 'events/cancel-edit'
// TODO: ^ router stuff

const DELETE_EVENT = 'events/delete-event'
const SUBMIT_EVENT = 'events/submit-event'


// Initial State
const initalState = {
  234234234: {
    name: 'Blah Deadline',
    time_block: false,
    priority: 1,
    deadline: 'utc',
    time_est: 400000000000
  },
  454545454: {
    name: 'Blah Block',
    priority: 2,
    time_block: true,
    start: 'utc',
    end: 'utc' 
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DELETE_EVENT: return R.dissoc(action.payload.id, state);
    case SUBMIT_EVENT: return {...state, [action.payload.id]: action.payload};
    default: return state;
  }
}

// Action Creators
export function submitEvent(eventObject) {
  eventObject.id = eventObject.id || +new Date();
  
  return { type: SUBMIT_EVENT, payload: eventObject }
}

export function deleteEvent(id) {
  return { type: DELETE_EVENT, payload: { id } }
}
