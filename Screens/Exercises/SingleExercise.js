import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { Card } from "react-native-elements";

const SingleExercise = ({ route, navigation }) => {
    const [item, setItem] = useState(route.params.item);

    return (
        <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />

            <Text style={{ marginBottom: 10 }}>{item.body_part}</Text>
        </Card>
    );
};

export default SingleExercise;
