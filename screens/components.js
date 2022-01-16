import React, { useState } from "react";
import { View, TextInput, Dimensions } from "react-native";
import {
	IconButton,
	Colors,
	Menu,
	TextInput as PaperTextInput,
	Button,
	Avatar,
	FAB,
} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import { createRoom } from "./store/actions/room";

export const SearchBar = (props) => {
	const { searching, setSearching, search, setSearch } = props;
	return !searching ? (
		<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
			<IconButton
				onPress={() => {
					setSearching(true);
				}}
				icon="magnify"
				color="lightgrey"
			/>
			<Options />
		</View>
	) : (
		<View
			style={{
				flexDirection: "row",
				width: Dimensions.get("window").width,
				marginLeft: 75,
			}}
		>
			<IconButton
				onPress={() => {
					setSearching(false);
					setSearch("");
				}}
				icon="arrow-left"
				color="lightgrey"
			/>
			<TextInput
				returnKeyType="search"
				placeholder="Search..."
				autoFocus={true}
				placeholderTextColor={Colors.grey400}
				selectionColor={Colors.orange700}
				style={{ color: Colors.grey200, backgroundColor: Colors.teal600, flex: 1 }}
				value={search}
				onChangeText={(sr) => setSearch(sr)}
			/>
		</View>
	);
};

const Options = (props) => {
	const [visible, setVisible] = useState(false);
	const [img, setImg] = useState("");
	const [groupName, setGroupName] = useState("");

	const { loading } = useSelector((state) => ({
		loading: state.errorReducer.loading,
	}));

	const getImage = async () => {
		let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			alert("Media permissions denied!");
			return;
		}

		let image = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});

		if (!image.cancelled) {
			setImg(image);
		}
	};

	const cancel = () => {
		setImg("");
		setGroupName("");
	};

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const submit = () => {
		dispatch(
			createRoom(img, groupName, () => {
				rbs.close();
				navigation.navigate("chat", {
					username: groupName,
				});
			})
		);
	};

	return (
		<View>
			<Menu
				visible={visible}
				onDismiss={() => setVisible(false)}
				anchor={
					<IconButton
						icon="dots-vertical"
						color="lightgrey"
						onPress={() => setVisible(true)}
					/>
				}
			>
				<Menu.Item
					icon="account-group"
					title="New Group"
					onPress={() => {
						setVisible(false);
						rbs.open();
					}}
				/>
				<Menu.Item icon="account" title="Profile" />
				<Menu.Item
					icon="cog"
					title="Settings"
					onPress={() => {
						setVisible(false);
						navigation.navigate("Settings");
					}}
				/>
			</Menu>
			<RBSheet
				ref={(ref) => {
					rbs = ref;
				}}
				height={Dimensions.get("window").height / 2}
				closeOnDragDown={true}
				onClose={cancel}
				customStyles={{
					container: {
						backgroundColor: "black",
					},
				}}
			>
				<View style={{ margin: 10 }}>
					<View style={{ alignSelf: "center", marginBottom: 10 }}>
						{img ? (
							<Avatar.Image source={{ uri: img.uri }} size={150} />
						) : (
							<Avatar.Icon
								size={150}
								icon="account-group"
								color="grey"
								style={{
									backgroundColor: Colors.grey400,
								}}
							/>
						)}
						<FAB
							icon="camera"
							style={{ position: "absolute", right: 0, bottom: 0 }}
							onPress={() => getImage()}
						/>
					</View>
					<PaperTextInput
						mode="outlined"
						label="Group Name..."
						outlineColor={Colors.green400}
						left={<PaperTextInput.Icon name="account-group" />}
						value={groupName}
						onChangeText={(nm) => setGroupName(nm)}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							marginTop: 10,
						}}
					>
						<Button
							mode="outlined"
							color={Colors.grey600}
							icon="close"
							style={{
								marginRight: 5,
								borderWidth: 1,
								borderColor: Colors.grey600,
							}}
							onPress={() => {
								cancel();
								rbs.close();
							}}
						>
							Cancel
						</Button>
						<Button
							mode="contained"
							color={Colors.green600}
							icon="check"
							onPress={() => submit()}
							loading={loading}
						>
							Create
						</Button>
					</View>
				</View>
			</RBSheet>
		</View>
	);
};
