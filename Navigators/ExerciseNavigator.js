import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Shared/Header";
import ExerciseContainer from "../Screens/Exercises/ExerciseContainer";
import SingleExercise from "../Screens/Exercises/SingleExercise";
import NewExercise from "../Screens/Exercises/NewExercise";

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
                name="Exercises"
                component={ExerciseContainer}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <View>
                            <Button
                                onPress={() => navigation.push("New Exercise")}
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
            <Stack.Screen name="Exercise Detail" component={SingleExercise} />
            <Stack.Screen name="New Exercise" component={NewExercise} />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return <MyStack />;
}
