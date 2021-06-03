import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Shared/Header";

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: (props) => <Header {...props} />,
                headerStyle: {
                    height: 110,
                },
                headerTitleAlign: {
                    width: "100%",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    padding: 2,
                    marginTop: 30,
                    marginBottom: 5,
                },
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function AuthNavigator() {
    return <MyStack />;
}
