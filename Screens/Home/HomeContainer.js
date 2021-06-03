import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, SafeAreaView, View, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-elements";
const dayjs = require("dayjs");
import AnimatedLoader from "react-native-animated-loader";
import { MaterialIcons } from "@expo/vector-icons";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import AuthGlobal from "../../Context/store/AuthGlobal";

const HomeContainer = ({ navigation }) => {
    const context = useContext(AuthGlobal);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let id = context.stateUser.user.id;
            if (!id) {
                navigation.navigate("User Profile");
            }
            setLoading(true);
            axios
                .get(`${baseUrl}/userWorkouts/mine`, {
                    params: { user: id },
                })
                .then((res) => {
                    setWorkouts(res.data.data.docs);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });

            return () => {
                setWorkouts([]);
            };
        }, [context.stateUser])
    );

    const renderWorkout = ({ item }) => {
        const date = dayjs(new Date(item.date));
        const name = item.workout.name;

        return (
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "rgba(0, 0, 0, 0.3)",
                    padding: 10,
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: 10,
                        borderBottomWidth: 0.5,
                    }}
                >
                    <Text
                        style={{
                            width: "60%",
                            fontSize: 16,
                        }}
                    >
                        {date.format("ddd D MMM, YYYY [at] HH:mm")}
                    </Text>
                    <Text
                        style={{
                            width: "30%",
                            color: "rgba(0, 0, 0, 0.7)",
                            fontStyle: "italic",
                        }}
                    >{`${name}  |  ${item.timeInMinutes} min`}</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        alignSelf: "flex-start",
                        marginLeft: 20,
                        width: "75%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 5,
                        }}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                fontWeight: "700",
                                width: "70%",
                            }}
                        >
                            Exercises
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                fontWeight: "700",
                            }}
                        >
                            Sets
                        </Text>
                    </View>
                    {item.exercises.map((exercise) => {
                        return (
                            <View
                                style={{
                                    paddingBottom: 5,
                                    paddingTop: 5,
                                    flex: 1,
                                    flexDirection: "row",
                                    width: "100%",
                                }}
                                key={exercise._id}
                            >
                                <Text style={{ width: "70%" }}>
                                    {exercise.exercise.name}
                                </Text>
                                <Text
                                    style={{
                                        letterSpacing: 1,
                                        flexWrap: "wrap",
                                    }}
                                >{`${exercise.executed_reps.join(
                                    " | "
                                )}`}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.45)"
                    source={require("../../assets/common/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
            ) : (
                <View>
                    <View
                        style={{
                            marginLeft: 25,
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        <Text h4 h4Style={{ color: "#323232" }}>
                            Recent workouts
                        </Text>
                    </View>
                    {workouts.length ? (
                        <FlatList
                            data={workouts}
                            renderItem={renderWorkout}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{
                                width: "100%",
                                alignItems: "center",
                            }}
                        />
                    ) : (
                        <View style={{}}>
                            <AnimatedLoader
                                visible={true}
                                overlayColor="rgba(255,255,255,0.05)"
                                source={require("../../assets/common/404.json")}
                                animationStyle={{
                                    width: 250,
                                    height: 250,
                                }}
                                speed={1}
                                modal={false}
                            />
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    padding: 25,
                                    height: "80%",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#323232",
                                        fontWeight: "normal",
                                        fontSize: 18,
                                        marginBottom: 15,
                                        letterSpacing: 2,
                                    }}
                                >
                                    None found
                                </Text>

                                <Button
                                    title="Start one"
                                    onPress={() =>
                                        navigation.navigate("Workouts")
                                    }
                                    buttonStyle={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default HomeContainer;
