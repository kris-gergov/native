import React, { useState, useRef, useContext } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import Timer from "react-compound-timer";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import AuthGlobal from "../../Context/store/AuthGlobal";

const UserWorkout = ({ route, navigation }) => {
    const context = useContext(AuthGlobal);
    const workout = route.params.item;
    const exercisesToComplete = workout.exercises.map((exercise) => {
        return {
            exercise: exercise.exercise._id,
            exercise_name: exercise.exercise.name,
            executed_reps: exercise.default_reps,
        };
    });

    const [userWorkout, setUserWorkout] = useState({
        user: context.stateUser.user.id,
        workout: workout._id,
        date: Date.now(),
        time_taken: 0,
        exercises: exercisesToComplete,
    });

    const timerInput = useRef();

    return (
        <Card>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <Card.Title style={{ fontSize: 24 }}>{workout.name}</Card.Title>

                <Timer
                    formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value}`
                    }
                    ref={timerInput}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginBottom: 15,
                        }}
                    >
                        <Text>
                            <Timer.Hours />:
                        </Text>
                        <Text>
                            <Timer.Minutes />:
                        </Text>
                        <Text>
                            <Timer.Seconds />
                        </Text>
                    </Text>
                </Timer>
            </View>
            <Card.Divider />

            <View
                style={{
                    marginTop: 10,
                    marginBottom: 20,
                    alignSelf: "flex-start",
                    width: "80%",
                }}
            >
                {userWorkout.exercises.map((exercise, index) => {
                    return (
                        <View
                            style={{
                                paddingBottom: 5,
                                paddingTop: 5,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                width: "100%",
                            }}
                            key={exercise.exercise}
                        >
                            <Text style={{ width: "40%", fontSize: 18 }}>
                                {exercise.exercise_name}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    width: "90%",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {exercise.executed_reps.map((set, setIndex) => {
                                    return (
                                        <Input
                                            key={setIndex}
                                            placeholder={set.toString()}
                                            label={`Set ${setIndex + 1}`}
                                            containerStyle={{
                                                width: "25%",
                                            }}
                                            keyboardType="numeric"
                                            onChangeText={(value) => {
                                                let currentWorkout =
                                                    userWorkout;
                                                currentWorkout.exercises[
                                                    index
                                                ].executed_reps[setIndex] =
                                                    value * 1;
                                                setUserWorkout(currentWorkout);
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </View>
            <Button
                title="Finish Workout"
                buttonStyle={{ padding: 15 }}
                titleStyle={{ letterSpacing: 1, textTransform: "uppercase" }}
                onPress={() => {
                    let totalTime = Math.floor(
                        timerInput.current.getTime() / 1000
                    );
                    userWorkout.time_taken = totalTime;
                    let body = JSON.stringify(userWorkout);

                    axios
                        .post(`${baseUrl}/userWorkouts`, body, {
                            headers: {
                                "content-type": "application/json",
                            },
                        })
                        .then((res) => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Home" }],
                            });
                        })
                        .catch((err) => console.log(err));
                }}
            />
        </Card>
    );
};

export default UserWorkout;
