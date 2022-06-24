import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonSave } from '../assets/components/ButtonSave';

export default function Configs({ route, navigation }) {
    const inputAccessoryViewID = 'uniqueID';

    const { workTime, setWorkTime, shortRestTime, setShortRestTime, longRestTime, setLongRestTime, cycles, setCycles } = route.params;
    const [textWork, setWorkText] = React.useState(workTime.toString());
    const [textShortRest, setShortText] = React.useState(shortRestTime.toString());
    const [textLongRest, setLongRestText] = React.useState(longRestTime.toString());
    const [textCycles, setCyclesText] = React.useState(cycles + '');

    const save = () => {
        setWorkTime(Number(textWork));
        setShortRestTime(Number(textShortRest));
        setLongRestTime(Number(textLongRest));
        setCycles(Number(textCycles));
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center'}}>Tempo de foco</Text>
                <TextInput style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setWorkText} value={textWork} placeholder={'Digite o tempo.'} />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center'}}>Tempo descanso curto</Text>
                <TextInput style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setShortText} value={textShortRest} placeholder={'Digite o tempo.'} />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center'}}>Descanso Longo</Text>
                <TextInput style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setLongRestText} value={textLongRest} placeholder={'Digite a quantidade.'} />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center'  }}>Ciclos</Text>
                <TextInput style={styles.camposText} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setCyclesText} value={textCycles} placeholder={'Digite a quantidade.'} />
            </View>

            <View style={styles.save}>
                <ButtonSave title="Salvar" onPress={() => {
                    save()
                    navigation.navigate('tela_inicial')
                }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {          
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#57D0DB',
        height: '100%',
    },  
    inputs: {      
        marginTop: 10,               
        width: '100%',
        alignItems: 'center'
    },
    camposText: {
        textAlign: 'center',
        padding: 10,
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    save: {
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 130
    }
});
