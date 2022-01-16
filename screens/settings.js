import React from "react";
import { View } from "react-native";
import { Avatar, Button, Colors, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout, logoutAll } from "./store/actions/auth";

const settings = () => {
	const dispatch = useDispatch();
	return (
        <View>
		<Button
			onPress={() => dispatch(logout())}
			icon="logout"
			color={Colors.red600}
		>
			Logout
		</Button>
        <Divider />
		<Button
			onPress={() => dispatch(logoutAll())}
			icon="logout"
			color={Colors.red600}
		>
			Logout from All devices
		</Button>
        </View>
	);
};

export default settings;
