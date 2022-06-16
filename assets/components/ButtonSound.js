
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';


export function ButtonSound({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AntDesign name="sound" size={26} color="black" />
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'blue',


    },

})