import { StyleSheet } from "react-native";
import { ColorsConstants, FontConstants } from './globalStyles';

export const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: ColorsConstants.backgroundColor
    },
    loginImageIcon: {
        height: 200,
    },
    loginHeader: {
        fontSize: FontConstants.sizeTitle,
        padding: 10,
        fontWeight: '700',
        color: FontConstants.color,
        fontFamily: FontConstants.familyRegular,
    },
    loginBtnSubmit: {
        padding: 10,
        marginVertical: 20,
        backgroundColor: "#aaf683",
        width: "50%",
        borderRadius: 10,
        shadowColor: "#343a40",
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 4,
    },
    loginBtnSubmitLabel: {
        fontSize: 20,
        textAlign: 'center',
    }
});