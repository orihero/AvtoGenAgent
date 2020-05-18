import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../constants";
import { userLoaded } from "../../redux/actions";
import NotificationService from "../../../utils/NotificationService";
import request from "../../api/requests";
import logo from "../../assets/images/logo.png";

const Loader = ({ navigation, userLoaded }) => {
	let bootstrap = async () => {
		let data = await AsyncStorage.getItem("@user");
		// console.warn(data);
		if (!data) {
			navigation.navigate("Login");
			return;
		}
		let userData = JSON.parse(data);
		if (!userData || !userData.token) {
			navigation.navigate("Login");
			return;
		}
		let { settings } = userData;
		if (!settings) {
			navigation.navigate("Login");
			return;
		}
		userLoaded(userData);
		try {
			NotificationService.init();
			let fcm_token = await NotificationService.getFcmToken();
			let res = await request.profile.setFcmToken({ fcm_token });
		} catch (error) {
			navigation.navigate("Login");
			return;
		}
		navigation.navigate("Account");
	};
	useEffect(() => {
		bootstrap();
	}, []);
	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white
	},
	logo: {
		width: 200,
		height: 200 / 1.24
	}
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
	userLoaded
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Loader);
