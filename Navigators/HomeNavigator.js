import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import Header from "../Shared/Header";
import HomeContainer from "../Screens/Home/HomeContainer";
import SingleExercise from "../Screens/Exercises/SingleExercise";

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
            <Stack.Screen name="Home" component={HomeContainer} />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return <MyStack />;
}
