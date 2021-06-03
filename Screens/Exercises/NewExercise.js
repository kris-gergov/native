import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import AnimatedLoader from "react-native-animated-loader";
import Toast from "react-native-toast-message";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

const NewExercise = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [category, setCategory] = useState("");

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <Card>
                <Card.Title style={{ fontSize: 24 }}>New Exercise</Card.Title>
                <Card.Divider />

                <Input
                    label="Name"
                    value={name}
                    onChangeText={(v) => setName(v)}
                />
                <Input
                    label="Body part"
                    value={bodyPart}
                    onChangeText={(v) => setBodyPart(v)}
                />
                <Input
                    label="Category"
                    value={category}
                    onChangeText={(v) => setCategory(v)}
                />
                <Button
                    title="Add exercise"
                    buttonStyle={{ padding: 15 }}
                    titleStyle={{
                        letterSpacing: 1,
                        textTransform: "uppercase",
                    }}
                    onPress={() => {
                        let newExercise = {
                            name: name,
                            body_part: bodyPart,
                            category: category,
                        };

                        let body = JSON.stringify(newExercise);

                        axios
                            .post(`${baseUrl}/exercises`, body, {
                                headers: {
                                    "content-type": "application/json",
                                },
                            })
                            .then((res) => {
                                Toast.show({
                                    type: "success",
                                    text1: "Exercise added!        ",
                                });
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Exercises" }],
                                });
                            })
                            .catch((err) => console.log(err));
                    }}
                />
            </Card>
        </ScrollView>
    );
};

export default NewExercise;
