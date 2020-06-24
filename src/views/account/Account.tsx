import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import request from "../../api/requests";
import Avatar from "../../components/common/Avatar";
import Text from "../../components/common/CustomText";
import YellowButton from "../../components/common/YellowButton";
import Modal from "../../components/Modal";
import { colors } from "../../constants";
import strings from "../../locales/strings";
import { userLoaded } from "../../redux/actions";
import { ordersLoaded } from "../../redux/actions/orders";
import NewOrder from "./NewOrder";
import OrderCard, { OrderProps } from "./OrderCard";

interface AccountProps {
	navigation: any;
}
export let demoOrder: OrderProps = {
	properties: [
		{
			title: "Дата посещения",
			rightText: "16:35",
			description: "03.12.2019"
		},
		{
			title: "Тип автомобиля",
			icon: "light",
			description: "Легковой"
		},
		{
			title: "Тип услуги",
			description: "Бесконтактная мойка кузова автомобиля, коврики пороги"
		},
		{ title: "Цена умлуги", price: "40 000 сум" }
	]
};

const AccountScreen = ({
	navigation,
	user,
	orders,
	ordersLoaded,
	userLoaded
}: AccountProps) => {
	let [companyDetails, setCompanyDetails] = useState({});
	const [isActive, setisActive] = useState(true);
	let [loading, setLoading] = useState(false);

	useEffect(() => {
		// showCompany
		console.warn(user);
		request.user
			.show()
			.then(res => {
				console.warn(res);
				userLoaded(res.data.data);
			})
			.catch(err => {
				console.warn(err.response);
			});
		request.profile
			.showCompany()
			.then(res => {
				setCompanyDetails(res.data.data);
				//bookings
				console.warn(res.data.data);
			})
			.catch(err => {
				console.warn("error in showCompany");
				console.warn(err.response);
				setCompanyDetails({
					company_address: strings.noCompany
				});
			});
		request.booking
			.getAllOrders("arrived")
			.then(r => {
				ordersLoaded({
					name: "current",
					data: r.data.data
				});
				// request.booking
				// 	.getAllOrders("arrived")
				// 	.then(res => {
				// 		ordersLoaded({
				// 			name: "current",
				// 			data: [...res.data.data, ...r.data.data]
				// 		});
				// 	})
				// 	.catch(err => {
				// 		console.warn("error in booking");
				// 		console.warn(err.response);
				// 	});
			})
			.catch(err => {
				console.warn("error in booking");
				console.warn(err.response);
			});

		request.booking
			.getAllOrders("new")
			.then(res => {
				ordersLoaded({ name: "new", data: res.data.data });
			})
			.catch(err => {
				console.warn("error in booking");
				console.warn(err.response);
			});
	}, []);

	let changeStatus = async val => {
		request.user.updateUser({ status: val ? 1 : 0 });
		setisActive(val);
	};

	let accept = () => {
		navigation.navigate("Details", { item: orders.new[0] });
	};
	let decline = item => {
		setLoading(true);
		request.booking
			.reject(item.id)
			.then(res => {
				//* Fetch the remaining new orders
				request.booking.getAllOrders("new").then(r => {
					ordersLoaded({ name: "new", data: r.data.data });
					navigation.navigate("Account");
				});
			})
			.catch(res => {
				console.warn(res.response);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.avatarWrapper}>
						<YellowButton
							primaryType={"menu"}
							onPress={() => {
								navigation.toggleDrawer();
							}}
						/>
						<Avatar imageURL={user.avatar || ""} />
						<View style={{ width: 60 }} />
					</View>
					<View style={styles.infoWrapper}>
						<Text style={styles.nameText}>{user.name || ""}</Text>
						<Text style={styles.legalName}>
							{(!!companyDetails && companyDetails.title) || ""}
						</Text>
						<Text style={styles.address}>
							{(!!companyDetails &&
								companyDetails.company_address) ||
								""}
						</Text>
					</View>
					<View style={styles.sideRow}>
						<Text style={styles.active}>{strings.active}</Text>
						<Switch
							onValueChange={changeStatus}
							style={styles.switch}
							value={isActive}
							trackColor={{
								true: colors.yellow,
								false: colors.accent
							}}
						/>
					</View>
					<Text style={styles.ordersText}>{strings.orders}</Text>
				</View>
			</View>
			<OrderCard ordersList={orders.current} />
			{orders.new.length > 0 && (
				<Modal isOpen={orders.new.length > 0}>
					{loading ? (
						<ActivityIndicator
							size={"large"}
							color={colors.accent}
						/>
					) : (
						<NewOrder {...orders.new[0]} {...{ accept, decline }} />
					)}
				</Modal>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: colors.ultraLightGray
	},
	modalContent: {
		padding: 15
	},
	avatarWrapper: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	ordersText: {
		color: colors.accent,
		fontSize: 16,
		fontWeight: "bold",
		paddingVertical: 15,
		paddingHorizontal: 15
	},
	infoWrapper: {
		height: 90,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10
	},
	sideRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 15,
		borderBottomWidth: 1,
		paddingBottom: 10,
		borderColor: colors.extraGray
	},
	container: {
		padding: 15,
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: colors.ultraLightGray
	},
	contact: {
		flexDirection: "row",
		justifyContent: "center"
	},
	content: {
		flex: 1,
		justifyContent: "flex-start"
	},
	nameText: {
		fontSize: 20,
		color: colors.accent,
		marginBottom: 10,
		textAlign: "center"
	},
	legalName: {
		fontWeight: "bold",
		fontSize: 20,
		color: colors.accent,
		textAlign: "center"
	},
	address: {
		fontWeight: "400",
		fontSize: 14,
		color: colors.darkGray,
		textAlign: "center"
	},
	active: {
		fontSize: 13,
		color: colors.accent
	},
	switch: {
		transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
	}
});

const mapStateToProps = ({ user, orders }) => {
	return { user, orders };
};
const mapDispatchToProps = {
	ordersLoaded,
	userLoaded
};

let Account = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountScreen);
export { Account };
