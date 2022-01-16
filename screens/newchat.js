import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Pressable } from "react-native";
import * as Contacts from "expo-contacts";
import { Divider, Avatar, Colors, FAB } from "react-native-paper";
import styles from "./styles";

import { SearchBar } from "./components";

import { addUsers, getRooms } from "./store/actions/room";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const NewChat = (props) => {
	const { loading } = useSelector((state) => ({
		loading: state.errorReducer.loading,
	}));

	const [contactList, setContactList] = useState("");

	const [searching, setSearching] = useState(false);
	const [search, setSearch] = useState("");

	const [selectedUsers, setSelectedUsers] = useState([]);

	const { addingUsers, item } = props.route.params
		? props.route.params
		: { addingUsers: null, item: null };

	const getContacts = async () => {
		let { status } = await Contacts.requestPermissionsAsync();
		if (status !== "granted") {
			alert("Permissions denied!");
			return;
		}

		let { data } = await Contacts.getContactsAsync();

		setContactList(data);

		return data.length;
	};

	const dispatch = useDispatch();
	const add = () => {
		if (selectedUsers.length > 0) {
			dispatch(
				addUsers(
					{ room_id: item ? item.id : null, user: [...new Set(selectedUsers)] },
					() => {
						dispatch(getRooms());
						props.navigation.navigate("chat", { item });
					}
				)
			);
		} else {
			showMessage({
				message: "Please select some users to proceed",
				type: "warning",
				icon: "warning",
				position: 'center'
			});
		}
	};

	useEffect(() => {
		getContacts();

		(async () => {
			let len = await getContacts();

			props.navigation.setOptions({
				headerTitle: () => (
					<View>
						<Text
							style={[styles.title, { color: Colors.grey200, marginLeft: 0 }]}
						>
							Select Contact
						</Text>
						<Text style={{ fontSize: 10, color: Colors.grey200 }}>
							{len} contacts
						</Text>
					</View>
				),
			});
		})();
	}, []);

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

	const renderItem = ({ item }) => (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: selectedUsers.includes(item.phoneNumbers[0].number)
					? Colors.green100
					: "transparent",
			}}
		>
			<Avatar.Image
				style={{ margin: 5 }}
				size={75}
				source={{ uri: item.image }}
			/>
			<Pressable
				style={{ justifyContent: "center", flex: 1 }}
				delayLongPress={100}
				onLongPress={() => {
					addingUsers
						? setSelectedUsers([...selectedUsers, item.phoneNumbers[0].number])
						: null;
				}}
				android_ripple={{
					color: Colors.green200,
					radius: 1000,
				}}
				onPress={() => {
					!addingUsers
						? props.navigation.navigate("chat", {
								item: {
									room: item.name ? item.name : item.phoneNumbers[0].number,
								},
						  })
						: selectedUsers.includes(item.phoneNumbers[0].number)
						? setSelectedUsers(
								selectedUsers.filter(
									(num) => num != item.phoneNumbers[0].number
								)
						  )
						: null;
				}}
			>
				<Text style={styles.title}>
					{item.name ? item.name : item.phoneNumbers[0].number}
				</Text>
			</Pressable>
		</View>
	);

	const data = contactList
		? contactList.filter(
				(cont) =>
					cont.name.toLowerCase().includes(search.toLowerCase()) ||
					cont.phoneNumbers[0].number.includes(search)
		  )
		: [];

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={data}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <Divider />}
				ListEmptyComponent={() => (
					<Text style={styles.noContact}>No Contacts found!</Text>
				)}
				ListFooterComponent={() => <View style={{ height: 100 }}></View>}
			/>
			{(addingUsers && data.length > 0 && (
				<FAB
					loading={loading}
					label={`Add Users (${[...new Set(selectedUsers)].length})`}
					icon="check"
					style={{
						position: "absolute",
						bottom: 20,
						right: 10,
						backgroundColor: Colors.pink600,
					}}
					color={Colors.grey200}
					onPress={() => add()}
				/>
			)) ||
				null}
		</View>
	);
};

export default NewChat;

/* Array [
  Object {
    "contactType": "person",
    "firstName": "Adil",
    "id": "52",
    "imageAvailable": false,
    "lastName": "CUK",
    "lookupKey": "3390i1b644c000cb155a5.3789r52-2A303A402E523E",
    "name": "Adil CUK",
    "phoneNumbers": Array [
      Object {
        "id": "3",
        "isPrimary": 0,
        "label": "home",
        "number": "+919541091939",
        "type": "1",
      },
      Object {
        "id": "190",
        "isPrimary": 0,
        "label": "home",
        "number": "+919541091939",
        "type": "1",
      },
    ],
  },
] */
