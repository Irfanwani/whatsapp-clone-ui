import React from "react";
import Login from "./login";
import Otp from "./otp";
import Home from "./home";
import Chat from "./chat";
import NewChat from "./newchat";
import Settings from "./settings";
import Details from './details'

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	ActivityIndicator,
	Colors,
	Provider,
	ProgressBar,
	Text
} from "react-native-paper";

import { Provider as ReduxProvider } from "react-redux";
import { persistedStore, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { View } from "react-native";

import { useSelector } from "react-redux";

import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const Navigator = () => {
	const { token, loading } = useSelector((state) => ({
		token: state.authReducer.token,
		loading: state.errorReducer.loading,
	}));

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerTintColor: "lightgrey",
					headerStyle: { backgroundColor: Colors.teal600 },
				}}
			>
				{!token ? (
					<>
						<Stack.Screen component={Login} name="Login" />
						<Stack.Screen
							component={Otp}
							name="Otp"
							options={{ headerShown: false }}
						/>
					</>
				) : (
					<>
						<Stack.Screen component={Home} name="WhatsApp" />
						<Stack.Screen component={Chat} name="chat" />
						<Stack.Screen
							component={NewChat}
							name="newchat"
							options={{ headerTitle: "Select Contact" }}
						/>
						<Stack.Screen component={Settings} name="Settings" />
						<Stack.Screen component={Details} name="Details" />
					</>
				)}
			</Stack.Navigator>
			<ProgressBar
				color={Colors.blue600}
				indeterminate
				visible={loading}
				style={{ display: loading ? "flex" : "none" }}
			/>
		</NavigationContainer>
	);
};

const Main = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate
				loading={
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator size="large" color="teal" />
					</View>
				}
				persistor={persistedStore}
			>
				<Provider>
					<Navigator />
					<FlashMessage position="top" statusBarHeight={50} />
				</Provider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default Main;
