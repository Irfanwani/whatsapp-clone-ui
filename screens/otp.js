import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Avatar, Colors } from "react-native-paper";
import styles from "./styles";

const Otp = () => {
	const [otp, setOtp] = useState("");

	var textInput;

	return (
		<View style={styles.view}>
			<Avatar.Icon size={150} icon='whatsapp' color={Colors.green600} style={{backgroundColor: 'transparent', alignSelf: 'center'}} />
			<TextInput
				ref={(ref) => {
					textInput = ref;
				}}
				value={otp}
				onChangeText={(text) => {
					setOtp(text);
					if (text.length == 5) {
						textInput.blur();
					}
				}}
				keyboardType="number-pad"
				style={{ marginHorizontal: 10 }}
				label="enter OTP..."
				left={<TextInput.Icon name="message-lock" />}
			/>
		</View>
	);
};

export default Otp;
