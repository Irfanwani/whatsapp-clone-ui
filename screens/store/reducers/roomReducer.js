import { ADD_ROOM, GET_ROOMS, LOGOUT_SUCCESS } from "../actions/types";

initialState3 = {
    rooms: []
}

export default roomReducer = (state = initialState3, action) => {
    switch(action.type) {
        case ADD_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.payload]
            }
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                rooms: []
            }
        default:
            return state
    }
}