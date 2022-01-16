import axios from "axios";
import FormData from "form-data";
import { getType } from "mime";
import { showMessage } from "react-native-flash-message";
import {
	ERROR,
	LOADING,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	VALIDATION_FAIL,
	VALIDATION_SUCCESS,
} from "./types";

export const BASE_URL = "http://192.168.36.205:80/";

export const login =
	({ dp, name, contact }, callback) =>
	(dispatch) => {
		dispatch({
			type: LOADING,
		});

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const data = new FormData();

		if (dp) {
			data.append("dp", {
				uri: dp.uri,
				type: getType(dp.uri),
				name: dp.uri.split("/").pop(),
			});
		}

		data.append("name", name);
		data.append("contact", contact);

		axios
			.post(BASE_URL + "login", data, config)
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data.user,
				});
				callback();
			})
			.catch(() => {
				axios
					.put(BASE_URL + "login", data, config)
					.then((res) => {
						dispatch({
							type: LOGIN_SUCCESS,
							payload: res.data.user,
						});
						callback();
					})

					.catch((err) => {
						errorHandler(err, dispatch, LOGIN_FAIL);
					});
			});
	};

export const validate = (otp) => (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});
	const config = setConfig(getState);

	const body = JSON.stringify({
		otp,
		contact: getState().authReducer.user.contact,
	});

	axios
		.post(BASE_URL + "validate", body, config)
		.then((res) => {
			dispatch({
				type: VALIDATION_SUCCESS,
				payload: res.data.token,
			});
			showMessage({
				message: "Logged in  Successfully!",
				type: "success",
				icon: "success",
			});
		})
		.catch((err) => {
			errorHandler(err, dispatch, VALIDATION_FAIL);
		});
};

export const getOtp = (contact) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ contact });

	axios
		.put(BASE_URL + "validate", body, config)
		.then((res) => {
			showMessage({
				message: res.data.message,
				type: "success",
				icon: "success",
				duration: 1500,
			});
		})
		.catch((err) => {
			showMessage({
				message: err.toString(),
				type: 'danger',
				icon: 'danger',
				position: 'center'
			})
		});
};

export const logout = () => (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});
	const config = setConfig(getState);

	axios
		.post(BASE_URL + "api/logout/", null, config)
		.then(() => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			showMessage({
				message: "Logged out Successfully!",
				type: "default",
				icon: "success",
			});
		})
		.catch((err) => {
			errorHandler(err, dispatch, ERROR);
		});
};

export const logoutAll = () => (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});
	const config = setConfig(getState);

	axios
		.post(BASE_URL + "api/logoutall/", null, config)
		.then(() => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			showMessage({
				message: "Logged Out successfully from all devices.",
				type: "default",
				icon: "success",
			});
		})
		.catch((err) => {
			errorHandler(err, dispatch, ERROR);
		});
};

// error handler function
export const errorHandler = (err, dispatch, type) => {
	try {
		if (parseInt(err.response.status) == 401) {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			showMessage({
				message: "Token expired! Please Login Again.",
				type: "info",
				icon: "info",
			});
		} else {
			dispatch({
				type,
				payload: err.response.data,
			});
		}
	} catch (error) {
		showMessage({
			message: err.toString(),
			type: 'danger',
			icon: 'danger',
			position: 'center'
		})
		dispatch({
			type: ERROR,
		});
	}
};

// setting the config for axios request
export const setConfig = (getState) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const token = getState().authReducer.token;

	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};
