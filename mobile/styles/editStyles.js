import { StyleSheet } from "react-native";

export const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FF6347",
    },
    headerBack: {
        color: "#fff",
        fontSize: 16,
        marginRight: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
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
    buttonDelete: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
});
