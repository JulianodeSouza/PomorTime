import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonSave } from '../assets/components/ButtonSave';
import { TextInputMask } from 'react-native-masked-text'

export default function Configs({ route, navigation }) {
    const inputAccessoryViewID = 'uniqueID';

    const { workTime, setWorkTime, shortRestTime, setShortRestTime, longRestTime, setLongRestTime, cycles, setCycles } = route.params;
    const [textWork, setWorkText] = React.useState(workTime.toString());
    const [textShortRest, setShortText] = React.useState(shortRestTime.toString());
    const [textLongRest, setLongRestText] = React.useState(longRestTime.toString());
    const [textCycles, setCyclesText] = React.useState(cycles + '');

    const save = () => {
        let minutes = textWork.split(':');
        minutes = minutes[0] * 60;

        setWorkTime(Number(minutes));
        setSecondsWorkTime(Number(secondsFoco))
        setShortRestTime(Number(textShortRest));
        setLongRestTime(Number(textLongRest));
        setCycles(Number(textCycles));
    }

    const showAlert = () =>
        Alert.alert(
            "Atenção",
            "Preencha os campos corretamente!",
            [
                {
                    text: "Fechar",
                    style: "cancel",
                },
                {
                    cancelable: true,
                }
            ],
        );

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Tempo de foco</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99:99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setWorkText}
                    value={textWork}
                    placeholder={'0:00'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Descanso curto</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99:99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setShortText}
                    value={textShortRest}
                    placeholder={'00:00'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Descanso Longo</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99:99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setLongRestText}
                    value={textLongRest}
                    placeholder={'00:00'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Ciclos</Text>
                <TextInput
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setCyclesText}
                    value={textCycles}
                    placeholder={'Digite a quantidade.'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.save}>
                <ButtonSave title="Salvar" onPress={() => {
                    if (textWork < 1 || textShortRest < 1 || textLongRest < 1 || textCycles < 1) {
                        showAlert();
                    } else {
                        save();
                        navigation.navigate('tela_inicial');
                    }
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
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    camposText: {
        textAlign: 'center',
        backgroundColor: "white",
        borderColor: 'black',
        width: '100%',
        padding: 10,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 10,
    },
    save: {
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 230
    }
});
