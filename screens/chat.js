import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, Pressable, Dimensions } from "react-native";
import { FAB, IconButton, Colors, Avatar } from "react-native-paper";
import styles from "./styles";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const Chat = (props) => {
	const [img, setImg] = useState("");

	useEffect(() => {
		const { item } = props.route.params;
		const { room, admin } = item;

		props.navigation.setOptions({
			headerTitle: () => (
				<Pressable
					style={{
						flexDirection: "row",
						alignItems: "center",
						margin: 0,
						padding: 0,
					}}
					onPress={() => props.navigation.navigate('Details', {id: item.id})}
				>
					{item.dp ? (
						<Avatar.Image
							size={30}
							source={{ uri: item.dp }}
							style={{ marginRight: 3 }}
						/>
					) : (
						<Avatar.Icon
							size={30}
							icon={item.admin ? "account-group" : "account"}
							style={{ marginRight: 3, backgroundColor: Colors.grey400 }}
						/>
					)}
					<Text
					numberOfLines={1} ellipsizeMode="tail"
						style={{ fontSize: 20, fontWeight: "bold", color: Colors.grey200, maxWidth: Dimensions.get('window').width / 2 }}
					>
						{room}
					</Text>
				</Pressable>
			),

			headerRight: () =>
				admin && (
					<IconButton
						icon="account-plus"
						color={Colors.grey200}
						onPress={() =>
							props.navigation.navigate("newchat", {
								addingUsers: true,
								item: item,
							})
						}
					/>
				),
		});
	});

	const cameraAsync = async () => {
		let { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			alert("camera permissions denied!");
			return;
		}

		let image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
		});

		if (!image.cancelled) {
			setImg(image);
		}
	};

	const fileAsync = async () => {
		let file = await DocumentPicker.getDocumentAsync();

		if (file.type !== "cancel") {
		}
		console.log(file);
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.messageinput}>
				<View style={styles.msginp}>
					<IconButton icon="pencil" />
					<TextInput
						placeholder="Enter Message..."
						multiline={true}
						style={{ flex: 1, color: Colors.grey200, fontSize: 15 }}
					/>

					<IconButton icon="paperclip" onPress={() => fileAsync()} />
					<IconButton icon="camera" onPress={() => cameraAsync()} />
				</View>
				<FAB
					color={Colors.grey200}
					small
					icon="send"
					style={{ marginLeft: 5, backgroundColor: Colors.green600 }}
				/>
			</View>
		</View>
	);
};

export default Chat;

const MessageView = (props) => {
	const { sent, message, time } = props;
	return (
		<View
			style={[
				sent ? styles.messagesent : styles.messagereceived,
				{ minWidth: 50 },
			]}
		>
			<Text style={{ color: Colors.grey200 }}>{message}</Text>
			<Text style={styles.time}>{time}</Text>
		</View>
	);
};
