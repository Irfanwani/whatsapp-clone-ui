import { LOADING, LOGIN_FAIL, VALIDATION_FAIL, ERROR } from "../actions/types";

initialState2 = {
	loading: null,
	error: null,
};

export default errorReducer = (state = initialState2, action) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case VALIDATION_FAIL:
		case LOGIN_FAIL:
			return {
				...state,
				loading: null,
				error: action.payload,
			};
		case ERROR:
		default:
			return {
				...state,
				loading: null,
				error: null,
			};
	}
};
