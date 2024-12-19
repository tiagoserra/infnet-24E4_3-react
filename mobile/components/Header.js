import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/headerStyles";

export default function Header({ title, showBackButton = false }) {
    const router = useRouter();

    return (
        <View style={styles.header}>
            {showBackButton ? (
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            ) : null}
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}