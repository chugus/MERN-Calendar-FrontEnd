import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Se viene el COVÍ',
//     start: moment().toDate(),
//     end: moment().add(1, 'hours').toDate(),
//     bgcolor: '#f0ad4e',
//     notes: 'No morir',
//     user: {
//       uid: '123',
//       name: 'Chugus'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};


export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            };

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            };

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => (
                    action.payload.id === event.id ? action.payload : event
                ))
            };

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(e => e.id !== state.activeEvent.id),
                activeEvent: null
            };

        case types.eventLoaded:
            return {
                ...state,
                events: action.payload
            }

        case types.eventLogout: 
            return {
                ...initialState
            }

        default:
            return state;
    }
}