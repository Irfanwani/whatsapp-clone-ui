import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native-paper";

const styles = StyleSheet.create({
	view: {
		flex: 0.7,
		justifyContent: "center",
	},
	button: {
		alignSelf: "center",
		marginTop: 10,
	},

	messagesent: {
		flexShrink: 1,
		marginVertical: 5,
		backgroundColor: Colors.teal500,
		marginLeft: "auto",
		padding: 10,
		marginRight: 5,
		elevation: 10,
		maxWidth: Dimensions.get("window").width / 1.5,
		borderTopStartRadius: 30,
		borderBottomEndRadius: 30,
	},
	messagereceived: {
		flexShrink: 1,
		marginVertical: 5,
		backgroundColor: Colors.grey700,
		marginRight: "auto",
		marginLeft: 5,
		padding: 10,
		elevation: 10,
		maxWidth: Dimensions.get("window").width / 1.5,
		borderTopEndRadius: 30,
		borderBottomStartRadius: 30,
	},
	time: { color: Colors.grey400, fontSize: 10, marginLeft: "auto" },

	messageinput: {
		flexDirection: "row",
		position: "absolute",
		alignItems: "baseline",
		bottom: 0,
		margin: 10,
		width: Dimensions.get("window").width,
		elevation: 11,
	},
	msginp: {
		flexDirection: "row",
		alignItems: "baseline",
		backgroundColor: Colors.grey500,
		borderRadius: 50,
		flex: 0.95,
	},
	noContact: { color: Colors.grey400, alignSelf: "center", marginTop: 50 },
	
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginLeft: 5,
	},
});

export default styles;
