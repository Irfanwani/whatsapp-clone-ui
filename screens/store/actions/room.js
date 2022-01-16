import axios from "axios";
import FormData from "form-data";
import { getType } from "mime";
import { showMessage } from "react-native-flash-message";

import { BASE_URL, errorHandler, setConfig } from "./auth";
import { ADD_ROOM, LOADING, ERROR, GET_ROOMS } from "./types";

export const createRoom = (dp, room, callback) => (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});

	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};

	const token = getState().authReducer.token;
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	const { contact } = getState().authReducer.user;

	const data = new FormData();
	if (dp) {
		data.append("dp", {
			uri: dp.uri,
			type: getType(dp.uri),
			name: dp.uri.split("/").pop(),
		});
	}

	data.append("room", room);
	data.append("admin", contact);
	data.append("user", contact);

	axios
		.post(BASE_URL + "createroom", data, config)
		.then((res) => {
			dispatch({
				type: ADD_ROOM,
				payload: res.data,
			});
			showMessage({
				message: "New group Created successfully!",
				type: "success",
				icon: "success",
			});
			callback();
		})
		.catch((err) => {
			errorHandler(err, dispatch, ERROR);
			showMessage({
				message: err.toString(),
				type: 'danger',
				icon: 'danger',
				position: 'center'
			})
		});
};

export const getRooms = () => (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});

	const config = setConfig(getState);

	axios
		.get(BASE_URL + "createroom", config)
		.then((res) => {
			dispatch({
				type: GET_ROOMS,
				payload: res.data,
			});
		})
		.catch((err) => {
			errorHandler(err, dispatch, ERROR);
		});
};

export const addUsers =
	({ room_id, dp, admin, room, user }, callback) =>
	(dispatch, getState) => {
		dispatch({
			type: LOADING,
		});

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const token = getState().authReducer.token;

		if (token) {
			config.headers["Authorization"] = `Token ${token}`;
		}

		const data = new FormData();

		data.append("room_id", room_id);

		if (dp) {
			data.append("dp", {
				uri: dp.uri,
				type: getType(dp.uri),
				name: dp.uri.split("/").pop(),
			});
		}

		if (admin) {
			data.append("admin", admin);
		}

		if (room) {
			data.append("room", room);
		}

		if (user) {
			data.append("user", JSON.stringify(user));
		}

		axios
			.put(BASE_URL + "createroom", data, config)
			.then(() => {
				showMessage({
					message: "Changes saved successfully",
					type: "success",
					icon: "success",
				});
				callback();
			})
			.catch((err) => {
				errorHandler(err, dispatch, ERROR);
				showMessage({
					message: err.toString(),
					type: 'danger',
					icon: 'danger',
					position: 'center'
				})
			});
	};