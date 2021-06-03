import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    FlatList,
    SafeAreaView,
    View,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { Text, Button } from "react-native-elements";
const dayjs = require("dayjs");
import AnimatedLoader from "react-native-animated-loader";
import { MaterialIcons } from "@expo/vector-icons";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import AuthGlobal from "../../Context/store/AuthGlobal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Stats = ({ navigation }) => {
    const context = useContext(AuthGlobal);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let id = context.stateUser.user.id;
            if (!id) {
                navigation.navigate("User Profile");
            }
            setLoading(true);
            axios
                .get(`${baseUrl}/userWorkouts/stats`, {
                    params: { user: id },
                })
                .then((res) => {
                    setStats(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });

            return () => {
                setStats({});
            };
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.4)"
                    source={require("../../assets/common/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
            ) : (
                <View
                    style={{
                        marginLeft: 25,
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                >
                    <Text h4 h4Style={{ color: "#323232" }}>
                        Statistics
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            width: "92%",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                borderColor: "#007FFF",
                                borderWidth: 0.5,
                                borderRadius: 20,
                                width: windowWidth * 0.86,
                                height: windowHeight * 0.2,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <Text style={{ fontSize: 35, color: "#007FFF" }}>
                                {stats.workoutStatistics
                                    ? stats.workoutStatistics[0].totalWorkouts
                                    : 0}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                Total workouts
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderColor: "#007FFF",
                                borderWidth: 0.5,
                                borderRadius: 20,
                                width: windowWidth * 0.4,
                                height: windowHeight * 0.2,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <Text style={{ fontSize: 35, color: "#007FFF" }}>
                                {stats.workoutStatistics
                                    ? Math.round(
                                          stats.workoutStatistics[0].totalTime /
                                              60
                                      )
                                    : 0}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                Total time
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderColor: "#007FFF",
                                borderWidth: 0.5,
                                borderRadius: 20,
                                width: windowWidth * 0.4,
                                height: windowHeight * 0.2,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <Text style={{ fontSize: 35, color: "#007FFF" }}>
                                {stats.workoutStatistics
                                    ? Math.round(
                                          stats.workoutStatistics[0]
                                              .averageNumOfExercise
                                      )
                                    : 0}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                Average # of exercises
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderColor: "#007FFF",
                                borderWidth: 0.5,
                                borderRadius: 20,
                                width: windowWidth * 0.4,
                                height: windowHeight * 0.2,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <Text style={{ fontSize: 35, color: "#007FFF" }}>
                                {stats.exerciseStatistics
                                    ? stats.exerciseStatistics[0].totalSets
                                    : 0}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                Total sets
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderColor: "#007FFF",
                                borderWidth: 0.5,
                                borderRadius: 20,
                                width: windowWidth * 0.4,
                                height: windowHeight * 0.2,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <Text style={{ fontSize: 35, color: "#007FFF" }}>
                                {stats.exerciseStatistics
                                    ? stats.exerciseStatistics[0].totalReps
                                    : 0}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                Total reps
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Stats;
