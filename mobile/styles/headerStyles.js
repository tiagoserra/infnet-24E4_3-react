import { StyleSheet } from "react-native";
import { ColorsConstants } from './globalStyles';

export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: ColorsConstants.backgroundColor,
        padding: 15,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});