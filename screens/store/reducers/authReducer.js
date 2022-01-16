import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	VALIDATION_SUCCESS,
	LOGOUT_SUCCESS,
} from "../actions/types";

initialState1 = {
	user: null,
	token: null,
};

export default authReducer = (state = initialState1, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
			};
		case VALIDATION_SUCCESS:
			return {
				...state,
				token: action.payload,
			};
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
			return {
				...state,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};
