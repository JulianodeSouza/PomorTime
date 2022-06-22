
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export function ButtonGear({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome name="gear" size={26} color="white" />
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 16,
    },

})