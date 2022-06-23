
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";


export function ButtonSave({ onPress, title }) {
    return (
        <TouchableOpacity style={styles.saves} onPress={onPress} >
            <Text style={styles.text}> {title} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    saves: {
        padding: 16,
        backgroundColor: '#4885C3',
        borderRadius: 20,

    },

    text: {
        textAlign: 'center',
        fontSize: 20,
        color: "#FFF",

    }

})