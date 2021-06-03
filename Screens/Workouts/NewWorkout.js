import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import AnimatedLoader from "react-native-animated-loader";
import Toast from "react-native-toast-message";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const NewWorkout = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [exercises, setExercises] = useState([
        { exercise: "", default_reps: [0] },
    ]);
    const [selectedLevel, setSelectedLevel] = useState("Beginner");
    const [exerciseList, setExerciseList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${baseUrl}/exercises`)
            .then((res) => {
                setExerciseList(res.data.data.docs);
                setExercises([
                    {
                        exercise: res.data.data.docs[0]._id,
                        default_reps: [0],
                    },
                ]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            setExerciseList([]);
        };
    }, []);

    const addExercise = (e) => {
        setExercises([
            ...exercises,
            {
                exercise: exerciseList[0]._id,
                default_reps: [0],
            },
        ]);
    };

    const addSet = (e, index) => {
        let test = [...exercises];
        test[index]["default_reps"].push(0);
        setExercises(test);
    };

    const removeExercise = (index) => {
        setExercises(exercises.filter((s, sindex) => index !== sindex));
    };

    const handleChange = (e, name, index, setIndex) => {
        let test = [...exercises];
        if (name === "default_reps") {
            test[index][name][setIndex] = e * 1;
        } else {
            test[index][name] = e;
        }
        setExercises(test);
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            {loading ? (
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.45)"
                    source={require("../../assets/common/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
            ) : (
                <Card>
                    <Card.Title style={{ fontSize: 24 }}>
                        New Workout
                    </Card.Title>
                    <Card.Divider />

                    <Input
                        label="Name"
                        value={name}
                        onChangeText={(v) => setName(v)}
                    />
                    <Input
                        label="Description"
                        value={description}
                        onChangeText={(v) => setDescription(v)}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            fontWeight: "bold",
                            color: "grey",
                            fontSize: 16,
                        }}
                    >
                        Level
                    </Text>
                    <Picker
                        style={{
                            height: 50,
                            marginBottom: 10,
                            marginLeft: 2,
                        }}
                        selectedValue={selectedLevel}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLevel(itemValue)
                        }
                    >
                        <Picker.Item label="Beginner" value="Beginner" />
                        <Picker.Item
                            label="Intermediate"
                            value="Intermediate"
                        />
                        <Picker.Item label="Advanced" value="Advanced" />
                    </Picker>
                    {exercises.map((exercise, index) => {
                        return (
                            <View key={index}>
                                <Card.Divider />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                            color: "grey",
                                            fontSize: 16,
                                            width: "80%",
                                            paddingTop: 3,
                                        }}
                                    >
                                        {`Exercise ${index + 1}`}
                                    </Text>
                                    {index != 0 ? (
                                        <Ionicons
                                            name="remove-circle"
                                            size={28}
                                            color="crimson"
                                            style={{
                                                width: "10%",
                                            }}
                                            onPress={() =>
                                                removeExercise(index)
                                            }
                                        />
                                    ) : null}
                                </View>
                                <Picker
                                    style={{
                                        height: 50,
                                        marginBottom: 10,
                                        marginLeft: 2,
                                    }}
                                    selectedValue={exercises[index].exercise}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange(
                                            itemValue,
                                            "exercise",
                                            index
                                        )
                                    }
                                >
                                    {exerciseList.map((exercise, index) => {
                                        return (
                                            <Picker.Item
                                                label={exercise.name}
                                                value={exercise._id}
                                                key={index}
                                            />
                                        );
                                    })}
                                </Picker>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                    }}
                                >
                                    {exercises[index].default_reps.map(
                                        (set, setIndex) => {
                                            return (
                                                <Input
                                                    key={setIndex}
                                                    placeholder="0"
                                                    name="default_reps"
                                                    label={`Set ${
                                                        setIndex + 1
                                                    }`}
                                                    keyboardType="numeric"
                                                    value={exercises[
                                                        index
                                                    ].default_reps[
                                                        setIndex
                                                    ].toString()}
                                                    onChangeText={(e) =>
                                                        handleChange(
                                                            e,
                                                            "default_reps",
                                                            index,
                                                            setIndex
                                                        )
                                                    }
                                                    containerStyle={{
                                                        width: "20%",
                                                    }}
                                                />
                                            );
                                        }
                                    )}
                                    <Button
                                        type="clear"
                                        onPress={(e) => addSet(e, index)}
                                        containerStyle={{
                                            padding: 5,
                                        }}
                                        icon={
                                            <Ionicons
                                                name="add-circle"
                                                size={30}
                                                color="dodgerblue"
                                                style={{ marginLeft: 5 }}
                                            />
                                        }
                                        iconPosition="bottom"
                                    />
                                </View>
                            </View>
                        );
                    })}
                    <View style={{ marginBottom: 20 }}>
                        <Button
                            title="Add exercise"
                            type="clear"
                            onPress={(e) => addExercise(e)}
                        />
                    </View>
                    <Button
                        title="Add workout"
                        buttonStyle={{ padding: 15 }}
                        titleStyle={{
                            letterSpacing: 1,
                            textTransform: "uppercase",
                        }}
                        onPress={() => {
                            let newWorkout = {
                                name: name,
                                description: description,
                                level: selectedLevel.toLowerCase(),
                                exercises: exercises,
                            };
                            let body = JSON.stringify(newWorkout);

                            axios
                                .post(`${baseUrl}/workouts`, body, {
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                })
                                .then((res) => {
                                    Toast.show({
                                        type: "success",
                                        text1: "Workout added!        ",
                                    });
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: "Workouts" }],
                                    });
                                })
                                .catch((err) => console.log(err));
                        }}
                    />
                </Card>
            )}
        </ScrollView>
    );
};

export default NewWorkout;
