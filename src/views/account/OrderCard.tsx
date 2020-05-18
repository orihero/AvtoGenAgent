// import React, {useState} from 'react';
// import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

// import {colors} from '../../constants/index';
// import Property, {PropertyProps} from '../../components/common/Property';
// import UserInfo from '../../components/common/UserInfo';
// import {OrderStatus} from '../order';

// export interface UserProps {
//   name: string;
//   phone: string;
//   image: string;
// }
// export interface OrderProps {
//   user: UserProps;
//   properties: PropertyProps[];
//   status?: OrderStatus;
// }

// let {width, height} = Dimensions.get('window');

// const OrderCard = ({user, properties}: OrderProps) => {
//   let [cardOn, setCardOn] = useState(false);

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           top: cardOn ? 0 : height - 120,
//         },
//       ]}>
//       <View style={{alignItems: 'center'}}>
//         <View style={styles.indicator} />
//       </View>
//       <UserInfo {...user} toggleCard={setCardOn} cardVisibility={cardOn} />
//       <ScrollView
//         style={styles.properties}
//         showsVerticalScrollIndicator={false}>
//         {properties.map((e, key) =>
//           e.price ? null : <Property {...e} {...{key}} />,
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     backgroundColor: colors.white,
//     borderRadius: 15,
//     paddingHorizontal: 30,
//     top: height - 120,
//     bottom: 0,
//     // marginTop: 273 - height,
//     // top: 0,
//     // paddingVertical: 15,
//     // marginVertical: 7.5,
//   },
//   indicator: {
//     width: 40,
//     height: 4,
//     borderRadius: 5,
//     backgroundColor: colors.ultrLightBlue,
//     marginTop: 10,
//   },
//   properties: {},
// });

// export default OrderCard;

//mutal's fucking UI
import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	LayoutAnimation,
	Animated,
	Dimensions
} from "react-native";
import { colors } from "../../constants/colors";
import { Icons } from "../../constants/icons";
import RoundButton from "../../components/common/RoundButton";
import strings from "../../locales/strings";
import {
	PanGestureHandler,
	State,
	FlatList
} from "react-native-gesture-handler";
import Text from "../../components/common/CustomText";
import OrderPill from "../../components/OrderPill";
import { demoOrder } from "./Account";
import { commonStyles } from "../../constants";

const OrderCard = ({ onPress, ordersList }) => {
	let { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

	let isExpanded = false;
	const [expanded, setExpanded] = useState(false);
	let height = new Animated.Value(0);
	let onGestureEvent = Animated.event([
		{
			nativeEvent: {
				translationY: height
			}
		}
	]);
	let onHandlerStateChange = ({ nativeEvent }) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			if (nativeEvent.translationY > 0) {
				Animated.spring(height, { toValue: deviceHeight }).start(() => {
					isExpanded = false;
					height.setOffset(0);
					height.setValue(0);
				});
			} else {
				Animated.spring(height, { toValue: 80 - deviceHeight }).start(
					() => {
						isExpanded = true;
						height.setOffset(80 - deviceHeight);
						height.setValue(0);
					}
				);
			}
		}
	};
	let contentHeight = Animated.subtract(0, height).interpolate({
		inputRange: [0, deviceHeight - 80],
		outputRange: [0, deviceHeight - 80],
		extrapolate: "clamp"
	});
	let translateY = contentHeight.interpolate({
		inputRange: [0, 80],
		outputRange: [500, -20],
		extrapolate: "clamp"
	});
	return (
		<Animated.View>
			<View style={styles.container}>
				<PanGestureHandler
					onGestureEvent={onGestureEvent}
					onHandlerStateChange={onHandlerStateChange}
				>
					<View>
						<View
							style={{
								backgroundColor: colors.white,
								padding: 5,
								borderRadius: 10,
								alignItems: "center"
								// elevation: 1,
							}}
						>
							<View style={styles.indicator} />
						</View>
					</View>
				</PanGestureHandler>
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					style={{
						height: contentHeight
					}}
				>
					<FlatList
						data={ordersList}
						renderItem={({ item, ...props }) => (
							<OrderPill
								item={item}
								{...props}
								collapsed={true}
							/>
						)}
						keyExtractor={e => e.id.toString()}
						ListEmptyComponent={() => (
							<View style={commonStyles.centeredContainer}>
								<Text
									style={{
										fontWeight: "bold",
										marginTop: 20,
										...styles.mainText
									}}
								>
									{strings.noOrders}
								</Text>
							</View>
						)}
					/>
				</Animated.ScrollView>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	row: { flexDirection: "row" },
	container: {
		backgroundColor: colors.white,
		position: "absolute",
		right: 0,
		left: 0,
		padding: 15,
		paddingHorizontal: 30,
		borderRadius: 30,
		minHeight: 260,
		bottom: -50
	},
	indicator: {
		width: 40,
		height: 4,
		borderRadius: 5,
		backgroundColor: colors.extraGray,
		margin: 10,
		marginTop: 5
	},
	top: {
		flexDirection: "row",
		paddingBottom: 10
	},
	iconWrapper: {},
	titleWrapper: {
		flex: 1,
		paddingHorizontal: 10,
		justifyContent: "center"
	},
	title: {
		fontSize: 17,
		fontWeight: "bold"
	},
	location: {
		fontSize: 12,
		color: colors.lightGray
	},
	distanceWrapper: {},
	distance: {
		fontSize: 17,
		fontWeight: "bold"
	},
	content: {
		paddingVertical: 15,
		marginBottom: 0
	},
	borderTop: {
		paddingVertical: 12,
		borderTopWidth: 1,
		borderColor: colors.ultraLightGray
	},
	timeHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	mainText: {
		fontSize: 16
	},
	twoBorder: {
		paddingVertical: 7,
		width: 250,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	timeText: {},
	bold: {
		fontWeight: "bold"
	},
	bottom: {
		flexDirection: "row",
		paddingBottom: 10,
		paddingHorizontal: 5
	}
});

export default OrderCard;
