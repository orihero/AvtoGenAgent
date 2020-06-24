import React, { Fragment, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	TextInput,
	View
} from "react-native";
import { connect } from "react-redux";
import request from "../../api/requests";
import Text from "../../components/common/CustomText";
import Property from "../../components/common/Property";
import RoundButton from "../../components/common/RoundButton";
import UserInfo from "../../components/common/UserInfo";
import { properties } from "../../components/OrderPill";
import { colors, commonStyles } from "../../constants";
import strings from "../../locales/strings";
import { ordersLoaded } from "../../redux/actions/orders";

export enum OrderStatus {
	INITIAL = 0,
	NOT_STARTED = 1,
	STARTED = 2,
	FINISHED = 3,
	REVIEWED = 4
}

const Details = ({ navigation, parentStatus, ordersLoaded }) => {
	// let item = navigation.getParam('item');
	const [item, setItem] = useState(navigation.getParam("item"));
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(
		parentStatus ? parentStatus : OrderStatus.INITIAL
	);
	let proceed = async status => {
		setLoading(true);
		try {
			let res = await request.booking.setStatus(item.id, status);
			setItem(res.data.data);
			request.booking
				.getAllOrders("processing")
				.then(r => {
					// ordersLoaded({ name: 'current', data: [...orders.current, ...res.data.data] })
					request.booking
						.getAllOrders("arrived")
						.then(res => {
							ordersLoaded({
								name: "current",
								data: [...res.data.data, ...r.data.data]
							});
						})
						.catch(err => {
							console.warn("error in booking");
							console.warn(err.response);
						});
				})
				.catch(err => {
					console.warn("error in booking");
					console.warn(err.response);
				});
		} catch (error) {
			console.warn(error);
		} finally {
			setLoading(false);
		}
	};
	let decline = () => {
		setLoading(true);
		request.booking
			.reject(item.id)
			.then(res => {
				//* Fetch the remaining new orders
				request.booking.getAllOrders("new").then(r => {
					ordersLoaded({ name: "new", data: r.data.data });
					navigation.navigate("Account");
					request.booking
						.getAllOrders("processing")
						.then(r => {
							// ordersLoaded({ name: 'current', data: [...orders.current, ...res.data.data] })
							request.booking
								.getAllOrders("arrived")
								.then(res => {
									ordersLoaded({
										name: "current",
										data: [...res.data.data, ...r.data.data]
									});
								})
								.catch(err => {
									console.warn("error in booking");
									console.warn(err.response);
								});
						})
						.catch(err => {
							console.warn("error in booking");
							console.warn(err.response);
						});
				});
			})
			.catch(res => {
				console.warn(res.response);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	let fetchOrders = async () => {
		setLoading(true);
		try {
			request.booking.getAllOrders("new").then(r => {
				ordersLoaded({ name: "new", data: r.data.data });
				navigation.navigate("Account");
				request.booking
					.getAllOrders("processing")
					.then(r => {
						// ordersLoaded({ name: 'current', data: [...orders.current, ...res.data.data] })
						request.booking
							.getAllOrders("arrived")
							.then(res => {
								ordersLoaded({
									name: "current",
									data: [...res.data.data, ...r.data.data]
								});
							})
							.catch(err => {
								console.warn("error in booking");
								console.warn(err.response);
							});
					})
					.catch(err => {
						console.warn("error in booking");
						console.warn(err.response);
					});
			});
		} catch (error) {
			console.warn(error);
		} finally {
			setLoading(false);
		}
	};
	let accept = () => {
		setLoading(true);
		request.booking
			.accept(item.id)
			.then(res => {
				//* Fetch the remaining new orders
				request.booking.getAllOrders("new").then(r => {
					ordersLoaded({ name: "new", data: r.data.data });
					navigation.navigate("Account");
					request.booking
						.getAllOrders("processing")
						.then(r => {
							// ordersLoaded({ name: 'current', data: [...orders.current, ...res.data.data] })
							request.booking
								.getAllOrders("arrived")
								.then(res => {
									ordersLoaded({
										name: "current",
										data: [...res.data.data, ...r.data.data]
									});
								})
								.catch(err => {
									console.warn("error in booking");
									console.warn(err.response);
								});
						})
						.catch(err => {
							console.warn("error in booking");
							console.warn(err.response);
						});
				});
			})
			.catch(res => {
				console.warn(res.response);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	let renderButtons = () => {
		switch (item.status) {
			case "new":
				return (
					<Fragment>
						<RoundButton
							text={strings.decline}
							full
							flex
							backgroundColor={colors.extraGray}
							textColor={colors.darkGray}
							borderColor={colors.extraGray}
							onPress={decline}
						/>
						<RoundButton
							text={strings.accept}
							fill
							full
							flex
							onPress={accept}
							backgroundColor={colors.yellow}
						/>
					</Fragment>
				);
			case "arrived":
				return (
					<RoundButton
						text={strings.start}
						fill
						full
						flex
						onPress={() => proceed("processing")}
						backgroundColor={colors.yellow}
					/>
				);
			case "processing":
				return (
					<RoundButton
						text={strings.finish}
						fill
						full
						flex
						onPress={() => proceed("done")}
						backgroundColor={colors.yellow}
					/>
				);
			case "done":
				return (
					<RoundButton
						text={strings.ready}
						fill
						full
						flex
						onPress={fetchOrders}
						backgroundColor={colors.yellow}
					/>
				);
			default:
				return null;
		}
	};
	if (loading) {
		return (
			<View style={commonStyles.centeredContainer}>
				<ActivityIndicator color={colors.accent} size={"large"} />
			</View>
		);
	}
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={{ backgroundColor: colors.ultraLightGray }}
		>
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<UserInfo user={item.user} />
					<Property
						title={properties[0].title}
						description={
							typeof item.time === "string" &&
							item.time.split(" ")[0]
						}
						rightText={
							typeof item.time === "string" &&
							item.time.split(" ")[1]
						}
					/>
					<Property
						title={properties[1].title}
						icon={
							!!item && item.car_type && item.car_type.icon
								? item.car_type.icon
								: properties[1].icon
						}
						description={
							item.car_type
								? item.car_type.title
								: properties[1].description
						}
					/>
					<Property
						title={strings.typeOfService}
						description={
							item.booking_services &&
							item.booking_services.reduce((prev, current) => {
								return prev + current.service.title + "\n\n";
							}, "")
						}
					/>
					<Property
						title={properties[3].title}
						price={
							!!item && item.total_cost
								? item.total_cost
								: properties[3].price
						}
					/>
					<Property
						title={strings.car_model}
						price={item.car_model}
					/>
					<Property
						title={strings.car_number}
						price={item.car_number}
					/>
					<Property
						title={strings.car_color}
						price={item.car_color}
					/>
				</View>
				{status === OrderStatus.FINISHED && (
					<View style={styles.finishedWrapper}>
						<Text style={styles.titleText}>
							{strings.clientReview}
						</Text>
						<View style={styles.commentWrapper}>
							<TextInput
								multiline
								numberOfLines={2}
								placeholder={strings.leaveComment}
							/>
						</View>
					</View>
				)}
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonsWrapper}>{renderButtons()}</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	finishedWrapper: {
		marginHorizontal: 30,
		borderTopWidth: 1,
		borderColor: colors.extraGray
	},
	contentContainer: {
		padding: 30
	},
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightGray
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "flex-end"
	},
	buttonsWrapper: {
		flexDirection: "row",
		paddingVertical: 30
	},
	commentWrapper: {
		borderRadius: 20,
		backgroundColor: colors.white,
		borderColor: colors.extraGray,
		borderWidth: 1,
		padding: 20,
		marginVertical: 10
	},
	titleText: {
		fontSize: 18,
		color: colors.accent,
		fontWeight: "400",
		marginVertical: 6
	}
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	ordersLoaded
};

let Connected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Details);

export { Connected as Details };
