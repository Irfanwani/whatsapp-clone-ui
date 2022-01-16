import React, { useEffect, useState } from "react";
import {
	FlatList,
	View,
	TouchableOpacity,
	Text,
	Dimensions,
	TextInput,
} from "react-native";
import { Avatar, Colors, Divider, IconButton } from "react-native-paper";

import { useSelector } from "react-redux";
import Constants from "expo-constants";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";

const Details = (props) => {
	const { rooms, contact } = useSelector((state) => ({
		rooms: state.roomReducer.rooms,
		contact: state.authReducer.user.contact,
	}));
	const { id } = props.route.params;

	const [item, setItem] = useState(rooms.filter((room) => room.id == id)[0]);
	const [data, setData] = useState(
		item.user
			? [
					item.admin,
					...item.user.filter((u) => u.contact !== item.admin.contact),
			  ]
			: []
	);
	const { admin } = item ? item : "";

	const [newRoomName, setNewRoomName] = useState(item.room);

	useEffect(() => {
		props.navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const renderItem = ({ item }) => (
		<View style={{ flexDirection: "row", paddingVertical: 10 }}>
			{item.dp ? (
				<Avatar.Image
					style={{ margin: 5 }}
					size={50}
					source={{ uri: item.dp }}
				/>
			) : (
				<Avatar.Icon
					size={50}
					style={{ margin: 5, backgroundColor: Colors.grey400 }}
					icon="account"
					color="grey"
				/>
			)}
			<TouchableOpacity
				style={{ justifyContent: "center", flex: 1 }}
				// onPress={() => props.navigation.navigate("chat", { item })}
			>
				<Text style={styles.title}>{item.name ? item.name : item.contact}</Text>
				{item.contact == admin.contact && (
					<Text
						style={{
							paddingHorizontal: 1,
							fontSize: 10,
							borderWidth: 0.6,
							borderColor: "green",
							color: "green",
							marginLeft: "auto",
							marginRight: 2,
						}}
					>
						Group Admin
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);

	const headerComponent = () => (
		<View>
			<IconButton
				icon="arrow-left"
				onPress={() => props.navigation.goBack()}
				color={Colors.grey200}
				style={{
					position: "absolute",
					top: Constants.statusBarHeight,
					zIndex: 1,
				}}
			/>
			{admin.contact == contact && (
				<IconButton
					icon="camera"
					color={Colors.grey200}
					style={{
						position: "absolute",
						top: Constants.statusBarHeight,
						zIndex: 1,
						right: 10,
					}}
				/>
			)}

			{item.dp ? (
				<Avatar.Image
					size={Dimensions.get("window").width}
					style={{ borderRadius: 0, backgroundColor: "grey" }}
					source={{ uri: item.dp }}
				/>
			) : (
				<Avatar.Icon
					icon="account-group"
					size={Dimensions.get("window").width}
					style={{ borderRadius: 0, backgroundColor: Colors.grey400 }}
				/>
			)}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					position: "absolute",
					bottom: 5,
					width: Dimensions.get("window").width,
					marginHorizontal: 5,
				}}
			>
				<TextInput
					ref={ref => {
						textInput = ref
					}}
					value={newRoomName}
					onChangeText={(text) => setNewRoomName(text)}
					maxLength={60}
					style={{ fontSize: 25, fontWeight: "bold", color: Colors.grey100 }}
					editable={false}
				/>
				{admin.contact == contact ? (
					<IconButton icon="pencil" color={Colors.grey100} onPress={() => {
						
					}} />
				) : (
					<IconButton
						icon="info"
						color={Colors.grey100}
						onPress={() =>
							showMessage({
								message: "Only admins can edit the group details.",
								type: "info",
								icon: "info",
								position: "center",
							})
						}
					/>
				)}
			</View>
		</View>
	);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={() => <Divider />}
			ListHeaderComponent={headerComponent}
		/>
	);
};

export default Details;
