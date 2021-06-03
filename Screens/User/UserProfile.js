import React, { useContext, useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { Card, Button, Avatar } from "react-native-elements";
import AnimatedLoader from "react-native-animated-loader";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState({});
    const [weeklyStats, setWeeklyStats] = useState({});
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Auth Navigator" }],
                });
            } else {
                axios
                    .get(`${baseUrl}/userWorkouts/weeklyStats`, {
                        params: { user: context.stateUser.user.id },
                    })
                    .then((res) => {
                        setWeeklyStats(res.data.data);
                        setUserProfile(context.stateUser.userProfile);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }, [context.stateUser])
    );

    return (
        <View>
            {loading ? (
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.45)"
                    source={require("../../assets/common/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
                                }}
                            />

                            <Text style={styles.name}>{userProfile.name} </Text>
                            <Text style={styles.goal}>{userProfile.goal} </Text>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View
                            style={{
                                position: "absolute",
                                height: 102,
                                width: 40,
                                top: -48,
                                left: 16,
                                zIndex: 1,
                                backgroundColor: "rgba(160, 160, 160, 1)",
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    transform: [{ rotate: "270deg" }],
                                    width: 70,
                                    color: "white",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: "bold",
                                }}
                            >
                                Weekly
                            </Text>
                        </View>
                        <View style={[styles.userInfo]}>
                            <View style={styles.section}>
                                <Text style={styles.space}>
                                    {weeklyStats.workoutStatistics
                                        ? weeklyStats.workoutStatistics[0]
                                              .totalWorkouts
                                        : 0}
                                </Text>
                                <Text
                                    style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Completed workouts
                                </Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.space}>
                                    {weeklyStats.workoutStatistics
                                        ? Math.round(
                                              weeklyStats.workoutStatistics[0]
                                                  .totalTime / 60
                                          ) + " mins "
                                        : 0}
                                </Text>
                                <Text
                                    style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Workout Time
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.space}>
                                    {weeklyStats.workoutStatistics
                                        ? Math.round(
                                              weeklyStats.workoutStatistics[0]
                                                  .averageNumOfExercise
                                          )
                                        : 0}
                                </Text>
                                <Text
                                    style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Average # of exercises
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate("Stats");
                            }}
                            style={{ width: "90%" }}
                        >
                            <View
                                style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                    width: "100%",
                                    paddingVertical: 20,
                                    paddingHorizontal: 25,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "#d6d6d6",
                                }}
                            >
                                <Ionicons
                                    name="podium-outline"
                                    size={28}
                                    color="black"
                                    onPress={() => alert("Bla")}
                                />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 20,
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                    }}
                                >
                                    Statistics
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.push("Edit Profile", {
                                    item: userProfile,
                                });
                            }}
                            style={{ width: "90%" }}
                        >
                            <View
                                style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                    width: "100%",
                                    paddingVertical: 20,
                                    paddingHorizontal: 25,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "#d6d6d6",
                                }}
                            >
                                <Ionicons
                                    name="settings-outline"
                                    size={28}
                                    color="black"
                                    onPress={() => alert("Bla")}
                                />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 20,
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                    }}
                                >
                                    Edit Profile
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("jwt");
                                logoutUser(context.dispatch);
                            }}
                            style={{ width: "90%" }}
                        >
                            <View
                                style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                    width: "100%",
                                    paddingVertical: 20,
                                    paddingHorizontal: 25,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "#d6d6d6",
                                }}
                            >
                                <Ionicons
                                    name="exit-outline"
                                    size={28}
                                    color="black"
                                    onPress={() => alert("Bla")}
                                />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 20,
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                    }}
                                >
                                    Log Out
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                /*                 <Card>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Divider />
                    <Card.Title>{userProfile.name}</Card.Title>
                    <Card.Divider />
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Email: </Text>
                        <Text>{userProfile.email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Weight: </Text>
                        <Text>: {userProfile.weight}kg</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Height: </Text>
                        <Text>{userProfile.height}cm</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Goal: </Text>
                        <Text>{userProfile.goal}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            margin: 10,
                        }}
                    >
                        <Button
                            title="Sign out"
                            type="outline"
                            buttonStyle={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingRight: 15,
                                paddingLeft: 15,
                            }}
                            onPress={() => {
                                AsyncStorage.removeItem("jwt");
                                logoutUser(context.dispatch);
                            }}
                        />
                    </View>
                </Card> */
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: 20,
        backgroundColor: "#d6d6d6",
    },
    headerContent: {
        padding: 20,
        alignItems: "center",
        display: "flex",
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: "600",
    },
    goal: {
        fontSize: 16,
        color: "rgba(10, 10, 10, 0.75)",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginTop: 10,
    },
    body: {
        backgroundColor: "white",
        height: 500,
        alignItems: "center",
    },
    item: {
        flexDirection: "row",
    },
    infoContent: {
        flex: 1,
        alignItems: "flex-start",
        paddingLeft: 5,
    },
    iconContent: {
        flex: 1,
        alignItems: "flex-end",
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "#FFFFFF",
    },
    userInfo: {
        flexDirection: "row",
        paddingVertical: 8,
        fontSize: 16,
        color: "#778899",
        backgroundColor: "rgba(80, 80, 80, 1)",
        fontWeight: "600",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginHorizontal: 16,
        marginTop: -48,
        marginLeft: 45,
    },
    bordered: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "gray",
    },
    section: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    space: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 3,
        color: "#007FFF",
    },
});

export default UserProfile;
