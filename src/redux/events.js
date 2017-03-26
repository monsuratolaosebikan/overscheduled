import R from 'ramda';
import moment from 'moment'


// Actions
// const EDIT_EVENT = 'events/edit-event'
// const CANCEL_EDIT = 'events/cancel-edit'
// router stuff

const DELETE_EVENT = 'events/delete-event'
const SUBMIT_EVENT = 'events/submit-event'


// Initial State
const initialState = {
  111: {
    id: '111',
    name: 'Blah Deadline',
    flexible: true,
    priority: 1,
    deadline: moment().subtract(1, 'd').toDate(),
    estimatedTime: 4
  },
  222: {
    id: '222',
    name: 'Blah Block',
    priority: 2,
    flexible: true,
    deadline: moment().add(5, 'h').toDate(),
    estimatedTime: 2
  }
};


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
  eventObject.id = eventObject.id || String(Date.now());
  
  return { type: SUBMIT_EVENT, payload: eventObject }
}

export function deleteEvent(id) {
  return { type: DELETE_EVENT, payload: { id } }
}
