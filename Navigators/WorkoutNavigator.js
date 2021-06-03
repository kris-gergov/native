import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import Header from "../Shared/Header";
import WorkoutContainer from "../Screens/Workouts/WorkoutContainer";
import UserWorkout from "../Screens/Workouts/UserWorkout";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewWorkout from "../Screens/Workouts/NewWorkout";

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
                name="Workouts"
                component={WorkoutContainer}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <View>
                            <Button
                                onPress={() => navigation.push("New Workout")}
                                title="Add"
                                type="clear"
                                containerStyle={{ marginRight: 10, padding: 5 }}
                                icon={
                                    <Ionicons
                                        name="add-circle"
                                        size={24}
                                        color="dodgerblue"
                                        style={{ marginLeft: 5 }}
                                    />
                                }
                                iconPosition="right"
                            />
                        </View>
                    ),
                })}
            />
            <Stack.Screen name="User Workout" component={UserWorkout} />
            <Stack.Screen name="New Workout" component={NewWorkout} />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return <MyStack />;
}
