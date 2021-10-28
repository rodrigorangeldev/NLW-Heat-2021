import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontFamily: FONTS.BOLD
    },
    button: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginRight: 12
    }
    
})