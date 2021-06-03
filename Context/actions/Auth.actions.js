import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import baseUrl from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const token = data.token;
                AsyncStorage.setItem("jwt", token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded, data.data.user));
            } else {
                logoutUser(dispatch);
            }
        })
        .catch((err) => {
            Toast.show({
                type: "error",
                text1: "Invalid credentials",
            });
            logoutUser(dispatch);
        });
};

export const updateUser = (user, id, dispatch) => {
    fetch(`${baseUrl}/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                dispatch(updateCurrentUser(data.data.user));
            }
        })
        .catch((err) => {
            Toast.show({
                type: "error",
                text1: "Invalid details",
            });
        });
};

export const getUserProfile = (id) => {
    fetch(`${baseUrl}/users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => res.json().then((data) => console.log(data)));
};

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({})); // dispatch
};

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user,
    };
};

export const updateCurrentUser = (user) => {
    return {
        type: UPDATE_CURRENT_USER,
        userProfile: user,
    };
};
