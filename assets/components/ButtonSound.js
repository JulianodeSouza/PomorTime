
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export function ButtonSound({ onPress, name }) {
    return (

        <TouchableOpacity onPress={onPress}>
            {name == "sound" && (
                <AntDesign name='sound' size={26} color="white" />
            )}

            {name == "volume-mute-outline" && (
                <Ionicons name="volume-mute-outline" size={26} color="white" />
            )}
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 16,
    },

})