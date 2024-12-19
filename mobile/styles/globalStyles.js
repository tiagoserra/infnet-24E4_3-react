import { StyleSheet, Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerButton: {
        fontSize: 18,
        color: "#FF6347",
        fontWeight: "bold",
    },
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

export const ColorsConstants = {
    backgroundColor: isDarkMode ? "#023047" : "#ffffff",
};

export const  FontConstants = {
    familyRegular: 'Comfortaa',
    color: isDarkMode ? "#ffffff" : "#023047",
    sizeTitle: 26,
    sizeSubitle: 24,
    sizeLabel: 20,
};
