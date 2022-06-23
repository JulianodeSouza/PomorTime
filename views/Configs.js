import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonSave } from '../assets/components/ButtonSave';

export default function Configs({ route, navigation }) {
    const inputAccessoryViewID = 'uniqueID';
    const initialText = '';
    const { workTime, setWorkTime, restTime, setRestTime } = route.params;
    const [textWork, setWorkText] = React.useState(workTime);
    const [textShortRest, setText] = React.useState(restTime);


    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={{ fontSize: 20 }}>Tempo de foco</Text>
                <TextInput onBlur={() => {
                    Number(textWork)
                    setWorkTime(Number(textWork))

                }} style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setWorkText} value={textWork} placeholder={'Please type here…'} />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20 }}>Tempo descanso curto</Text>
                <TextInput onBlur={() => {
                    Number(textShortRest)
                    setRestTime(Number(textShortRest))

                }} style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setText} value={textShortRest} placeholder={'Please type here…'} />
            </View>

            <View style={styles.save}>
                <ButtonSave title="Salvar" onPress={() => navigation.navigate('tela_inicial')} />
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
        backgroundColor: '#57D0DB',
        padding: 8,
    },

    inputs: {
        flex: 2,
        alignItems: 'center',
        marginTop: 50,
    },

    inputShort: {
        flex: 3,
        alignItems: 'center',
    },

    camposText: {
        padding: 16,
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    
    save: {
        marginBottom: 10,
        width: '100%',
        borderRadius: '50px'
    }
});
