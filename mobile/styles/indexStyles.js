import { StyleSheet } from "react-native";

export const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FF6347",
        padding: 15,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    tabletContainer: {
        flex: 1,
        flexDirection: "row",
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRightWidth: 1,
        borderRightColor: "#ccc",
    },
    mapContainer: {
        flex: 2,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    coordinates: {
        fontSize: 14,
        color: "#666",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#FF6347",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});