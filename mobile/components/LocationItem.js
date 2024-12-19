import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function LocationItem({ location, onPress }) {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={styles.title}>{location.name}</Text>
            <Text style={styles.coordinates}>
                Lat: {location.latitude}, Lng: {location.longitude}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    coordinates: {
        fontSize: 14,
        color: "#666",
    },
});