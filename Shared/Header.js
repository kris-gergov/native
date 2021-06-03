import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

const Header = (props) => {
    return (
        <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={{ height: 60 }}
        />
    );
};

export default Header;
