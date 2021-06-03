import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Stacks
import HomeNavigator from "./HomeNavigator";
import WorkoutNavigator from "./WorkoutNavigator";
import ExerciseNavigator from "./ExerciseNavigator";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: "#007FFF",
                style: { height: 65 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-sharp" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Workouts"
                component={WorkoutNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="body" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Exercises"
                component={ExerciseNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="barbell" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="User Profile"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
