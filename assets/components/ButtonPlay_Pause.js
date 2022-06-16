
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export function ButtonPlay_Pause({ onPress, name }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Feather name={name} size={26} color="black" style={{ marginTop: 10 }} title="Toggle Playing" />
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'blue',


    },

})