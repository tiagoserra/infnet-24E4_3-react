import React from "react";
import { TouchableOpacity, View } from "react-native";
import { List, MD3Colors, Text } from 'react-native-paper';
import { styles } from "../styles/homeStyles";

export default function LocationItem({ location, onPress }) {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={onPress}
        >
            <View style={styles.rowContainer}>
                <List.Icon color={MD3Colors.tertiary70} icon="map" />
                <Text variant="headlineSmall">Nome:</Text>
                <Text variant="headlineMedium">{location.name}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.coordinates}>
                    Lat: {location.latitude}, Lng: {location.longitude}
                </Text>
            </View>
        </TouchableOpacity>
    )
}