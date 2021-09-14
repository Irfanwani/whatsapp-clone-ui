import React from "react";
import Login from "./login";
import Otp from "./otp";
import Home from "./home";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "react-native-paper";

const Stack = createNativeStackNavigator();

const Main = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
			initialRouteName='WhatsApp'
				screenOptions={{
					headerTintColor: 'lightgrey',
					headerStyle: { backgroundColor: Colors.teal600 },
				}}
			>
				<Stack.Screen component={Login} name="Login" />
				<Stack.Screen component={Otp} name="Otp" options={{headerShown: false}} />
				<Stack.Screen
					component={Home}
					name="WhatsApp"
					options={{ headerTintColor: "lightgrey" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Main;
