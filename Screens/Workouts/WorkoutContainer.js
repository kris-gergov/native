import React, { useState, useEffect, useCallback } from "react";
import {
    FlatList,
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Overlay, Card, Text, Button, Divider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import LevelFilter from "./LevelFilter";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const WorkoutContainer = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [visible, setVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            axios
                .get(`${baseUrl}/workouts `)
                .then((res) => {
                    setWorkouts(res.data.data.docs);
                    setFilteredWorkouts(res.data.data.docs);
                })
                .catch((err) => {
                    console.log(err);
                });

            return () => {
                setWorkouts([]);
                setFilteredWorkouts([]);
                setSelectedWorkout(null);
            };
        }, [])
    );

    // Categories
    const levelFilterFunction = (level) => {
        {
            level === "All"
                ? [setFilteredWorkouts(workouts)]
                : [
                      setFilteredWorkouts(
                          workouts.filter(
                              (i) =>
                                  i.level.toUpperCase() === level.toUpperCase()
                          )
                      ),
                  ];
        }
    };

    const toggleOverlay = (item) => {
        setSelectedWorkout(item);
        setVisible(!visible);
    };

    const renderWorkout = ({ item }) => {
        const exercises = item.exercises.map((exercise) => {
            return ` ${exercise.exercise.name}`;
        });

        return (
            <TouchableOpacity
                key={item._id}
                onPress={() => toggleOverlay(item)}
                activeOpacity={0.6}
            >
                <Card>
                    <Card.Title style={{ fontSize: 18 }}>
                        {item.name}
                    </Card.Title>
                    <Card.Divider />
                    <Card.FeaturedTitle
                        style={{
                            color: "#545454",
                            fontSize: 16,
                            textAlign: "center",
                        }}
                    >
                        {item.description}
                    </Card.FeaturedTitle>
                    <Text style={{ color: "#545454", margin: 10 }}>
                        {`Exercises: ${exercises}...`}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <LevelFilter
                    levels={levels}
                    levelFilter={levelFilterFunction}
                />
            </View>
            <FlatList
                data={filteredWorkouts}
                renderItem={renderWorkout}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            />
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                    backgroundColor: "rgba(250, 250, 250, 0.95)",
                    width: "70%",
                    padding: 30,
                    borderRadius: 25,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                }}
                animationType="fade"
            >
                <Text h2 style={{ textAlign: "center", marginBottom: 20 }}>
                    {selectedWorkout ? selectedWorkout.name : ""}
                </Text>
                <Divider />
                <Text
                    style={{
                        marginVertical: 15,
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    {selectedWorkout ? selectedWorkout.description : ""}
                </Text>
                <Divider />
                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 20,
                        alignSelf: "flex-start",
                        width: "80%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                fontWeight: "700",
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
                    {selectedWorkout && selectedWorkout.exercises
                        ? selectedWorkout.exercises.map((exercise) => {
                              return (
                                  <View
                                      style={{
                                          paddingBottom: 5,
                                          paddingTop: 5,

                                          flexDirection: "row",
                                          alignItems: "center",
                                          width: "100%",
                                      }}
                                      key={exercise._id}
                                  >
                                      <Text style={{ width: "80%" }}>
                                          {exercise.exercise.name}
                                      </Text>
                                      <Text
                                          style={{
                                              letterSpacing: 1,
                                              flexWrap: "wrap",
                                              width: "45%",
                                          }}
                                      >{`${exercise.default_reps.join(
                                          " | "
                                      )}`}</Text>
                                  </View>
                              );
                          })
                        : null}
                </View>
                <Button
                    title="Start"
                    onPress={() =>
                        navigation.push("User Workout", {
                            item: selectedWorkout,
                        })
                    }
                    buttonStyle={{ marginBottom: 10 }}
                    titleStyle={{
                        letterSpacing: 1,
                        textTransform: "uppercase",
                    }}
                />
            </Overlay>
        </SafeAreaView>
    );
};

export default WorkoutContainer;
