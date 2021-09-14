import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Avatar, IconButton, FAB, Divider } from "react-native-paper";

const Home = (props) => {
	const renderItem = ({ item }) => (
		<View style={{ flexDirection: "row" }}>
			<Avatar.Image style={{margin: 5}} size={75} source={{ uri: item.image }} />
			<Text style={{fontSize: 25, fontWeight: '600', textAlignVertical: 'center', marginLeft: 5}}>{item.username}</Text>
		</View>
	);

	return (
        <View>
		<FlatList
			data={fakeData}
			keyExtractor={(item) => item.username}
			renderItem={renderItem}
			ItemSeparatorComponent={() => <Divider />}
			ListEmptyComponent={() => (
				<Text style={{ alignSelf: "center", marginTop: 50, color: "grey" }}>
					Start a new Chat!
				</Text>
			)}

            ListFooterComponent={() => <View style={{height: 100}}></View>}
		/>
        </View>
	);
};

export default Home;

const fakeData = [
	{
		username: "first user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "second user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "third user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "fourth user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "fifth user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "sixth user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "seventh user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "eighth user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "ninth user",
		image: "file://abcd/drefef.jpg",
	},
	{
		username: "tenth user",
		image: "file://abcd/drefef.jpg",
	},
];
