// Import React and Component
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            //Check if jwt is set or not
            //If not then send for Authentication
            //else send to Home Screen
            AsyncStorage.getItem("jwt").then((value) =>
                navigation.replace(
                    value === null ? "Auth Navigator" : "Tab Navigator"
                )
            );
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.45)"
                source={require("../assets/common/splash.json")}
                animationStyle={{ width: 300, height: 300 }}
                speed={1}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0e0e0",
    },
    activityIndicator: {
        alignItems: "center",
        height: 80,
    },
});
