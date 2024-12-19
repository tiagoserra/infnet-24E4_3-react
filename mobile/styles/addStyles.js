import { StyleSheet } from "react-native";

export const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    readOnly: {
        backgroundColor: "#f5f5f5",
        color: "#888",
    },
    map: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    button: {
        backgroundColor: "#FF6347",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});