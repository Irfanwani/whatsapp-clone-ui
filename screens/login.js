import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import {
	TextInput,
	Button,
	Colors,
	Avatar,
	FAB,
	HelperText,
} from "react-native-paper";

import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";

import { login } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";

const Login = (props) => {
	const [img, setImg] = useState("");
	const [contact, setContact] = useState("");
	const [name, setName] = useState("");

	const { error, loading } = useSelector((state) => ({
		error: state.errorReducer.error,
		loading: state.errorReducer.loading,
	}));

	const dispatch = useDispatch();

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

	const submit = () => {
		dispatch(
			login({ dp: img, name, contact }, () => {
				props.navigation.navigate("Otp");
			})
		);
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
				label="Enter your number (with country code)..."
				keyboardType="phone-pad"
				maxLength={15}
				value={contact}
				onChangeText={(con) => setContact(con)}
				error={error ? (error.invalid_number ? true : false) : false}
			/>
			<HelperText
				type="error"
				visible={error ? (error.invalid_number ? true : false) : false}
			>
				{error ? (error.invalid_number ? error.invalid_number : "") : ""}
			</HelperText>

			<TextInput
				left={<TextInput.Icon name="account" />}
				label="Enter username"
				style={{ marginTop: 10 }}
				maxLength={60}
				value={name}
				onChangeText={(nm) => setName(nm)}
			/>

			<Button
				onPress={() => submit()}
				mode="contained"
				style={styles.button}
				color={Colors.green600}
				loading={loading}
				icon="login"
				contentStyle={{ flexDirection: "row-reverse" }}
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
