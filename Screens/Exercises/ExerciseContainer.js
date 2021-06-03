import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "./CategoryFilter";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
const data = require("../../assets/exercises.json");
const categories = ["All", "Bodyweight", "Dumbbell", "Barbell"];

const ExerciseContainer = ({ navigation }) => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        axios
            .get(`${baseUrl}/exercises`)
            .then((res) => {
                setExercises(res.data.data.docs);
                setFilteredExercises(res.data.data.docs);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            setExercises([]);
            setFilteredExercises([]);
        };
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the exercises
            // Update execisesFiltered
            const newData = exercises.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredExercises(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredExercises(exercises);
            setSearch(text);
        }
    };

    // Categories
    const categoryFilterFunction = (category) => {
        {
            category === "All"
                ? [setFilteredExercises(exercises)]
                : [
                      setFilteredExercises(
                          exercises.filter((i) => i.category === category)
                      ),
                  ];
        }
    };

    const renderExercise = ({ item }) => {
        return (
            <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: "#ededed" }}
                onPress={() =>
                    navigation.push("Exercise Detail", { item: item })
                }
            >
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                        {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.body_part}</ListItem.Subtitle>
                </ListItem.Content>
                <Ionicons
                    name="add"
                    size={28}
                    color="black"
                    onPress={() => alert(item.body_part)}
                />
            </ListItem>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                placeholder="Find an exercise..."
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction("")}
                value={search}
                searchIcon={<Ionicons name="search" size={24} color="black" />}
                clearIcon={
                    <Ionicons
                        name="close"
                        size={24}
                        color="black"
                        onPress={() => searchFilterFunction("")}
                    />
                }
                containerStyle={{
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputStyle={{ backgroundColor: "white" }}
                inputContainerStyle={{ backgroundColor: "white" }}
            />
            <View>
                <CategoryFilter
                    categories={categories}
                    categoryFilter={categoryFilterFunction}
                />
            </View>
            <FlatList
                data={filteredExercises}
                renderItem={renderExercise}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            />
        </SafeAreaView>
    );
};

export default ExerciseContainer;
