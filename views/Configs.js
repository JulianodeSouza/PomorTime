import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';

export default function Configs({ route, navigation }) {
    const inputAccessoryViewID = 'uniqueID';
    const initialText = '';
    const { time, setTime } = route.params;
    const [text, setText] = React.useState(time);


    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text>Tempo de foco</Text>
                <TextInput onBlur={() => {
                    Number(text)
                    setTime(Number(text))

                }} style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setText} value={text} placeholder={'Please type here…'} />
            </View>









            <View style={styles.save}>
                <Button title="Salvar" onPress={() => navigation.navigate('tela_inicial')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#87CEFA',
        padding: 8,
    },
    inputs: {
        flex: 2,
    },
    camposText: {
        padding: 16,
        marginTop: 50,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    save: {
        flex: 3,
    }
});
