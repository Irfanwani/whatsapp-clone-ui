import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Avatar, FAB, Divider, Colors } from "react-native-paper";

import styles from "./styles";

import { SearchBar } from "./components";

import { getRooms } from "./store/actions/room";
import { useDispatch, useSelector } from "react-redux";

// import { io } from "socket.io-client";

// const socket = io("http://192.168.83.205:80");

const Home = (props) => {
	const [searching, setSearching] = useState(false);
	const [search, setSearch] = useState("");

	const [isMounted, setMounted] = useState(false);

	const [connected, setConnected] = useState(false);

	const { rooms } = useSelector((state) => ({
		rooms: state.roomReducer.rooms,
	}));

	const dispatch = useDispatch();

	if (!isMounted) {
		dispatch(getRooms());
	}

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<SearchBar
					searching={searching}
					setSearching={setSearching}
					search={search}
					setSearch={setSearch}
				/>
			),
		});
	});

	useEffect(() => {
		setMounted(true);

		// socket.on("connect", () => {
		// 	setConnected(true);
		// });
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
				onPress={() => props.navigation.navigate("chat", { item })}
			>
				<Text style={styles.title}>
					{item.room}
					{connected ? "🟢" : ""}
				</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={rooms
					.filter((room) =>
						room.room.toLowerCase().includes(search.toLowerCase())
					)
					.reverse()}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <Divider />}
				ListEmptyComponent={() => (
					<Text style={{ alignSelf: "center", marginTop: 50, color: "grey" }}>
						Start a new Chat!
					</Text>
				)}
				ListFooterComponent={() => <View style={{ height: 100 }}></View>}
			/>

			<FAB
				color={Colors.grey200}
				onPress={() => props.navigation.navigate("newchat")}
				icon="chat-plus"
				style={{
					position: "absolute",
					bottom: 20,
					right: 20,
					backgroundColor: Colors.green600,
				}}
			/>
		</View>
	);
};

export default Home;
