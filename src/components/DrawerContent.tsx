import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	Picker,
	Modal,
	TouchableNativeFeedback
} from "react-native";
import Avatar from "./common/Avatar";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { colors } from "../constants";
import { FlatList } from "react-native-gesture-handler";
import YellowButton from "./common/YellowButton";
import { userLoggedOut } from "../redux/actions";
import DrawerItem from "../components/DrawerItem";
import strings from "../locales/strings";
import request from "../api/requests";
import { warnUser } from "../../utils/warn";

const DrawerContent = ({ navigation, dispatch, user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCarType, setSelectedCarType] = useState();
	const [services, setServices] = useState([]);
	const [carTypes, setCarTypes] = useState([]);
	const [selectedServices, setSelectedServices] = useState({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		request.services.getAll().then(({ data }) => {
			setServices(data.data);
		});
		request.handbook.getCarTypes().then(({ data }) => {
			setCarTypes(data.data);
		});
	}, []);
	const menuList = [
		{
			id: 1,
			type: "clock",
			name: strings.history,
			to: "History"
		},
		{
			id: 2,
			type: "plus",
			name: strings.add,
			to: "",
			handler: () => setIsOpen(true)
		}
	];
	const logoutAlert = () => {
		Alert.alert(strings.wait, strings.wannaLogout, [
			{
				text: strings.no,
				onPress: () => {},
				style: "cancel"
			},
			{
				text: strings.ok,
				onPress: () => {
					dispatch(userLoggedOut());
					navigation.navigate("Login");
				}
			}
		]);
	};

	const checkBoxHandler = (id: number) => {
		setSelectedServices((prevState: { [key: number]: boolean }) => {
			return {
				...prevState,
				[id]: !selectedServices[id]
			};
		});
	};

	const submitFormHandler = async () => {
		if (loading) {
			return;
		}
		const services = [];
		setLoading(true);
		for (const key in selectedServices) {
			if (selectedServices[key]) {
				services.push(key);
			}
		}

		try {
			const res = await request.booking.create({
				booking_type: "manual",
				services,
				car_type_id: selectedCarType,
				payment_type: "cash"
			});
		} catch (error) {
			console.warn(error.response);
		}
		setLoading(false);
		setIsOpen(false);
		warnUser(strings.success);
	};

	return (
		<>
			<Modal visible={isOpen}>
				<View style={styles.addOrderModal}>
					<View style={styles.modalHeader}>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							Add new order
						</Text>
					</View>
					<View style={styles.form}>
						<Text style={{ marginTop: 20 }}>Chooser car type</Text>
						<Picker
							style={{ marginBottom: 20 }}
							selectedValue={selectedCarType}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedCarType(itemValue)
							}
						>
							{carTypes.map(carType => (
								<Picker.Item
									label={carType.title}
									value={carType.id}
								/>
							))}
						</Picker>
						<View style={styles.services}>
							{services.map(service => (
								<View
									style={{
										flexDirection: "row",
										marginBottom: 20
									}}
								>
									<TouchableNativeFeedback
										onPress={() =>
											checkBoxHandler(service.id)
										}
									>
										<Text
											style={{
												width: "80%",
												marginRight: 20
											}}
										>
											{service.title}
										</Text>
									</TouchableNativeFeedback>
									<CheckBox
										isChecked={selectedServices[service.id]}
										onClick={() =>
											checkBoxHandler(service.id)
										}
									/>
								</View>
							))}
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								marginTop: 30
							}}
						>
							<Text
								style={{
									...styles.btn,
									backgroundColor: colors.accent
								}}
								onPress={() => setIsOpen(false)}
							>
								{strings.cancel}
							</Text>
							<Text
								style={{
									...styles.btn,
									backgroundColor: colors.yellow,
									color: colors.accent
								}}
								onPress={submitFormHandler}
							>
								{loading ? strings.loading : strings.add}
							</Text>
						</View>
					</View>
				</View>
			</Modal>
			<View style={styles.container}>
				<View style={styles.top}>
					<View style={styles.nameWrapper}>
						<Text
							style={styles.name}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{user.name}
						</Text>
					</View>
					<View style={styles.avatarWrapper}>
						<Avatar imageURL={user.avatar} size={100} notEdit />
					</View>
				</View>
				<View style={styles.bottom}>
					<FlatList
						data={menuList}
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => {
							return <DrawerItem item={item} />;
						}}
					/>
					<View style={styles.buttonWrapper}>
						<YellowButton
							type={"power"}
							onPress={() => {
								logoutAlert();
							}}
						/>
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	form: {
		justifyContent: "center"
	},
	btn: {
		width: 150,
		height: 40,
		lineHeight: 35,
		textAlign: "center",
		color: "#fff",
		marginHorizontal: 10
	},
	addOrderModal: {
		backgroundColor: "#fff",
		padding: 20,
		alignItems: "center"
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	container: {
		flex: 1
	},
	closeBtn: {
		fontSize: 20
	},
	top: {
		backgroundColor: colors.yellow,
		paddingVertical: 80,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: 100,
		elevation: 10
	},
	nameWrapper: {
		width: 110,
		marginLeft: 100
	},
	name: {
		fontSize: 20,
		fontWeight: "bold"
	},
	avatarWrapper: {},
	bottom: {
		flex: 1,
		paddingVertical: 30
	},
	buttonWrapper: {
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center"
	}
});

let mapStateToProps = ({ user }) => {
	return { user };
};

export default connect(
	mapStateToProps,
	null
)(DrawerContent);
