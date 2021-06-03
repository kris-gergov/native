import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "react-native-elements";

const LevelFilter = ({ levels, levelFilter }) => {
    const [active, setActive] = useState(0);

    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{
                backgroundColor: "#f2f2f2",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }}
        >
            {levels.map((level, index) => {
                return (
                    <ListItem
                        style={{ margin: 0, padding: 0, borderRadius: 0 }}
                        key={level}
                    >
                        <TouchableOpacity
                            key={1}
                            onPress={() => {
                                levelFilter(level);
                                setActive(index);
                            }}
                            activeOpacity={0.9}
                        >
                            <Badge
                                value={level}
                                status="primary"
                                badgeStyle={[
                                    styles.badge,
                                    active === index ? styles.activeLevel : {},
                                ]}
                                textStyle={styles.badgeText}
                            />
                        </TouchableOpacity>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    badge: {
        padding: 15,
        backgroundColor: "#4DA5FF",
    },
    badgeText: {
        fontSize: 14,
    },
    activeLevel: {
        backgroundColor: "#007FFF",
    },
});

export default LevelFilter;
