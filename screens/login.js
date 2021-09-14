import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { TextInput, Button, Colors, Avatar, FAB } from "react-native-paper";

import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";

const Login = (props) => {
	const [img, setImg] = useState("");

	const getPicture = async () => {
		let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("media permissions denied!");
			return;
		}

		let image = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});

		if (!image.cancelled) {
			setImg(image);
			rbsheet.close();
		}
	};

	const takePicture = async () => {
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
			rbsheet.close();
		}
	};

	const removePicture = () => {
		setImg("");
		rbsheet.close();
	};

	return (
		<View style={[styles.view, { marginHorizontal: 10 }]}>
			<Avatar.Icon
				size={150}
				icon="whatsapp"
				color={Colors.green600}
				style={{ backgroundColor: "transparent", alignSelf: "center" }}
			/>

			<View style={{ alignItems: "center", marginBottom: 10 }}>
				{(img && img.uri && (
					<Avatar.Image size={150} source={{ uri: img.uri }} />
				)) || (
					<Avatar.Icon
						size={150}
						icon="account"
						color="black"
						style={{ backgroundColor: "lightgrey" }}
					/>
				)}
				<FAB
					onPress={() => rbsheet.open()}
					icon="camera"
					style={{ position: "absolute", bottom: 0, right: 80 }}
				/>
			</View>

			<Rbsheet
				getPicture={getPicture}
				takePicture={takePicture}
				removePicture={removePicture}
			/>

			<TextInput
				left={<TextInput.Icon name="phone" />}
				label="Enter your number..."
				keyboardType="number-pad"
			/>
			<TextInput
				left={<TextInput.Icon name="account" />}
				label="Enter username"
				style={{ marginTop: 10 }}
			/>

			<Button
				onPress={() => props.navigation.navigate("Otp")}
				mode="contained"
				style={styles.button}
				color={Colors.green600}
			>
				Join
			</Button>
		</View>
	);
};

var rbsheet;

const Rbsheet = (props) => {
	const { getPicture, takePicture, removePicture } = props;
	return (
		<RBSheet
			height={Dimensions.get("window").height / 6}
			ref={(ref) => {
				rbsheet = ref;
			}}
			closeOnDragDown={true}
			customStyles={{
				container: {
					backgroundColor: "black",
				},
			}}
		>
			<View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
				<FAB
					onPress={() => getPicture()}
					icon="image"
					style={{ backgroundColor: Colors.green600 }}
				/>
				<FAB
					onPress={() => takePicture()}
					icon="camera"
					style={{ backgroundColor: Colors.pink600 }}
				/>
				<FAB
					onPress={() => removePicture()}
					icon="delete"
					style={{ backgroundColor: Colors.red600 }}
				/>
			</View>
		</RBSheet>
	);
};

export default Login;
