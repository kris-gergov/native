import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Stacks
import SplashScreen from "../Screens/SplashScreen";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{ headerShown: false }}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
                name="Auth Navigator"
                component={AuthNavigator}
                options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
                name="Tab Navigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Main;
