import AsyncStorage from "@react-native-community/async-storage";
import strings from "./../../locales/strings";
import {
	SET_LANGUAGE,
	USER_LOADED,
	USER_LOGGED_IN,
	USER_LOGGED_OUT
} from "./../types";

const initialState = {
	//   token: '',
	settings: {
		language: "ru"
	}
};

export const user = (state = initialState, { type, payload }) => {
	let newState;
	switch (type) {
		case USER_LOADED:
			return { ...state, ...payload };
		case USER_LOGGED_IN:
			newState = { ...state, ...payload };
			AsyncStorage.setItem("@user", JSON.stringify(newState));
			return newState;
		case SET_LANGUAGE:
			strings.setLanguage(payload);
			newState = {
				...state,
				settings: { ...state.settings, language: payload }
			};
			AsyncStorage.setItem("@user", JSON.stringify(newState));
			return newState;
		case USER_LOGGED_OUT:
			AsyncStorage.setItem("@user", JSON.stringify(initialState));
			return initialState;
		default:
			return state;
	}
};
