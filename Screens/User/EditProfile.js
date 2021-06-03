import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { updateUser } from "../../Context/actions/Auth.actions";
import AuthGlobal from "../../Context/store/AuthGlobal";

import Error from "../../Shared/Error";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const EditProfile = ({ navigation, route }) => {
    const context = useContext(AuthGlobal);
    const currentUser = route.params.item;
    const [name, setName] = useState(currentUser.name);
    const [height, setHeight] = useState(currentUser.height.toString());
    const [weight, setWeight] = useState(currentUser.weight.toString());
    const [age, setAge] = useState(currentUser.age.toString());
    const [goal, setGoal] = useState(currentUser.goal);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (name === "" || height === "" || weight === "" || age === "") {
            setError("Please fill in the required fields");
            return;
        }

        const user = {
            name: name,
            height: height,
            weight: weight,
            age: age,
            goal: goal,
        };

        updateUser(user, currentUser._id, context.dispatch);
        Toast.show({
            type: "success",
            text1: "Success!   ",
            topOffset: 40,
        });
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "User Profile" }],
            });
        }, 500);

        /*   axios
            .patch(`${baseUrl}/users/${currentUser._id}`, body, {
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        type: "success",
                        text1: "Success!   ",
                        topOffset: 40,
                    });
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "User Profile" }],
                        });
                    }, 500);
                }
            })
            .catch((err) => {
                console.log(err);
            }); */
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Edit Profile </Text>

            <View style={styles.inputView}>
                <Input
                    placeholder="Name"
                    placeholderTextColor="#8a8787"
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    spellCheck={false}
                    autoCorrect={false}
                    value={name}
                    autoCapitalize="none"
                    onChangeText={(v) => setName(v)}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                }}
            >
                <View style={styles.smallInputView}>
                    <Input
                        placeholder="Height(cm)"
                        placeholderTextColor="#8a8787"
                        value={height}
                        onChangeText={(v) => setHeight(v)}
                        style={styles.smallInputText}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                </View>
                <View style={styles.smallInputView}>
                    <Input
                        placeholder="Weight(kg)"
                        placeholderTextColor="#8a8787"
                        value={weight}
                        onChangeText={(v) => setWeight(v)}
                        style={styles.smallInputText}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                }}
            >
                <View style={[styles.smallInputView, { width: "30%" }]}>
                    <Input
                        placeholder="Age"
                        placeholderTextColor="#8a8787"
                        value={age}
                        keyboardType="numeric"
                        onChangeText={(v) => setAge(v)}
                        style={styles.smallInputText}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                </View>
                <View style={[styles.smallInputView, { width: "65%" }]}>
                    <RNPickerSelect
                        style={{
                            inputAndroid: {
                                color: "black",
                                width: "100%",
                                height: 50,
                                fontSize: 18,
                                marginLeft: 8,
                            },
                            iconContainer: {
                                top: 12,
                                right: 6,
                            },
                            placeholder: {
                                color: "gray",
                            },
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return (
                                <Ionicons
                                    name="caret-down"
                                    size={24}
                                    color="gray"
                                />
                            );
                        }}
                        placeholder={{
                            label: "Goal",
                            value: null,
                            color: "gray",
                        }}
                        value={goal}
                        onValueChange={(value) => {
                            if (value) {
                                setGoal(value);
                            }
                        }}
                        items={[
                            { label: "General", value: "general" },
                            { label: "Weight loss", value: "weight_loss" },
                            { label: "Muscle gain", value: "muscle_gain" },
                        ]}
                    />
                </View>
            </View>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.loginText}>Save profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        fontSize: 50,
        color: "#007FFF",
        marginBottom: 40,
        letterSpacing: 2,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#d9d9d9",
        borderWidth: 1,
        borderColor: "#8a8787",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    smallInputView: {
        width: "48%",
        backgroundColor: "#d9d9d9",
        borderWidth: 1,
        borderColor: "#8a8787",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 20,
        color: "#4f4f4f",
        marginTop: 25,
    },
    smallInputText: {
        height: 20,
        color: "#4f4f4f",
        marginTop: 25,
        width: 50,
    },
    forgot: {
        color: "red",
        fontSize: 11,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#007FFF",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },

    loginText: {
        color: "white",
        fontSize: 20,
        letterSpacing: 1,
    },
    registerText: {
        color: "#4f4f4f",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EditProfile;
