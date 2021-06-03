import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Shared/Header";

import UserProfile from "../Screens/User/UserProfile";
import Stats from "../Screens/User/Stats";
import EditProfile from "../Screens/User/EditProfile";

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
            <Stack.Screen name="User Profile" component={UserProfile} />
            <Stack.Screen name="Stats" component={Stats} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
        </Stack.Navigator>
    );
}

export default function UserNavigator() {
    return <MyStack />;
}
