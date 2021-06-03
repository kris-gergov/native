import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import Error from "../../Shared/Error";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [goal, setGoal] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            passwordConfirm === "" ||
            height === "" ||
            weight === "" ||
            age === ""
        ) {
            setError("Please fill in the required fields");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            height: height,
            weight: weight,
            age: age,
            goal: goal,
        };
        let body = JSON.stringify(user);

        axios
            .post(`${baseUrl}/users`, body, {
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => {
                if (res.status == 201) {
                    Toast.show({
                        type: "success",
                        text1: "Success!",
                        text2: "Please login into your account",
                    });
                    setTimeout(() => {
                        navigation.navigate("Login");
                    }, 500);
                }
            })
            .catch((err) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: { err },
                });
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Register </Text>

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
            <View style={styles.inputView}>
                <Input
                    placeholder="Email"
                    placeholderTextColor="#8a8787"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(v) => setEmail(v)}
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                />
            </View>
            <View style={styles.inputView}>
                <Input
                    placeholder="Password"
                    placeholderTextColor="#8a8787"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(v) => setPassword(v)}
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                />
            </View>
            <View style={styles.inputView}>
                <Input
                    placeholder="Confirm Password"
                    placeholderTextColor="#8a8787"
                    value={passwordConfirm}
                    secureTextEntry={true}
                    onChangeText={(v) => setPasswordConfirm(v)}
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
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

                {/*  <Picker
                    style={{
                        height: 50,
                        marginBottom: 10,
                        marginLeft: 10,
                        width: "50%",
                    }}
                    selectedValue={goal}
                    onValueChange={(itemValue, itemIndex) => {
                        if (!itemValue) {
                            return;
                        }
                        setGoal(itemValue);
                    }}
                >
                    <Picker.Item
                        label="Goal"
                        value=""
                        color="gray"
                        enabled={false}
                    />
                    <Picker.Item label="General" value="general" />
                    <Picker.Item label="Weight loss" value="weight_loss" />
                    <Picker.Item label="Muscle gain" value="muscle_gain" />
                </Picker> */}
            </View>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text style={styles.registerText}>Login </Text>
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

export default Register;
