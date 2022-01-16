import React, { useState } from "react";
import { View } from "react-native";
import {
	TextInput,
	Avatar,
	Colors,
	HelperText,
	ActivityIndicator,
	Button,
} from "react-native-paper";
import styles from "./styles";

import { validate, getOtp } from "./store/actions/auth";
import { useSelector, useDispatch } from "react-redux";

const Otp = (props) => {
	const [otp, setOtp] = useState("");

	const { loading, error, contact } = useSelector((state) => ({
		loading: state.errorReducer.loading,
		error: state.errorReducer.error,
		contact: state.authReducer.user.contact,
	}));

	let textInput;

	const dispatch = useDispatch();

	const validateOtp = (text) => {
		setOtp(text);
		if (text.length == 6) {
			textInput.blur();
			dispatch(validate(text));
		}
	};

	return (
		<View style={styles.view}>
			<Avatar.Icon
				size={150}
				icon="whatsapp"
				color={Colors.green600}
				style={{ backgroundColor: "transparent", alignSelf: "center" }}
			/>
			<TextInput
				ref={(ref) => {
					textInput = ref;
				}}
				value={otp}
				onChangeText={validateOtp}
				keyboardType="number-pad"
				style={{ marginHorizontal: 10 }}
				label="enter OTP..."
				left={<TextInput.Icon name="message-lock" />}
				error={error ? (error.invalid_otp ? true : false) : false}
				maxLength={6}
			/>
			<HelperText
				type="error"
				visible={error ? (error.invalid_otp ? true : false) : false}
			>
				{error ? (error.invalid_otp ? error.invalid_otp : "") : ""}
			</HelperText>

			<ActivityIndicator
				size="large"
				color="teal"
				style={{ display: loading ? "flex" : "none", alignSelf: "center" }}
			/>

			<Button
				onPress={() => {
					getOtp(contact);
				}}
				style={{ alignSelf: "center" }}
			>
				Resend otp
			</Button>
		</View>
	);
};

export default Otp;
