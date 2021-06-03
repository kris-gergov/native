import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import Error from "../../Shared/Error";

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = ({ navigation }) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Tab Navigator" }],
            });
        }
        return () => {
            setEmail("");
            setPassword("");
            setError("");
        };
    }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = { email: email, password: password };

        if (email === "" || password === "") {
            setError("Please fill in the required fields");
        } else {
            loginUser(user, context.dispatch);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/transparent_logo.png")}
                resizeMode="contain"
                style={{ height: 100, marginBottom: 25 }}
            />
            <Text style={styles.logo}>Welcome </Text>

            <View style={styles.inputView}>
                <Input
                    placeholder="Email"
                    placeholderTextColor="#8a8787"
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    spellCheck={false}
                    autoCorrect={false}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(v) => setEmail(v)}
                />
            </View>
            <View style={styles.inputView}>
                <Input
                    placeholder="Password"
                    placeholderTextColor="#8a8787"
                    value={password}
                    style={styles.inputText}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    secureTextEntry={true}
                    onChangeText={(v) => setPassword(v)}
                />
            </View>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("Register")}>
                <Text style={styles.registerText}>Register </Text>
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
    inputText: {
        height: 20,
        color: "#4f4f4f",
        marginTop: 25,
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

export default Login;
