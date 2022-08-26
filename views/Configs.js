import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonSave } from '../assets/components/ButtonSave';
import { TextInputMask } from 'react-native-masked-text'

export default function Configs({ route, navigation }) {
    const inputAccessoryViewID = 'uniqueID';

    const { newWorkTime, setWorkTime, newShortRestTime, setShortRestTime, newLongRestTime, setLongRestTime, cycles, setCycles } = route.params;
    const [textWork, setWorkText] = React.useState(newWorkTime.toString());
    const [textShortRest, setShortText] = React.useState(newShortRestTime.toString());
    const [textLongRest, setLongRestText] = React.useState(newLongRestTime.toString());
    const [textCycles, setCyclesText] = React.useState(cycles + '');

    const save = () => {
        let minutesWork = textWork * 60;
        let minutesShortRest = textShortRest * 60;
        let minutesLongRest = textLongRest * 60;


        setWorkTime(Number(minutesWork));
        setShortRestTime(Number(minutesShortRest));
        setLongRestTime(Number(minutesLongRest));
        setCycles(Number(textCycles));
    }

    const alertFormatoCamposMinimo = () => Alert.alert(
        "Atenção",
        "Todos os campos precisam ter tempos maiores que 1 minuto.",
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

    const alertFormatoCamposMaximo = () => Alert.alert(
        "Atenção",
        "Todos os campos precisam ter tempos menors que 60 minutos.",
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

    const alertTamanhoCampos = () => Alert.alert(
        "Atenção",
        "Todos campos precisam estar preenchidos!",
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

    const alertTamanhoCiclos = () => Alert.alert(
        "Atenção",
        "Quantidade de ciclos não pode ser inferior a 1.",
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
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Tempo de foco (minutos)</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setWorkText}
                    value={textWork}
                    placeholder={'00'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Descanso curto (minutos)</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setShortText}
                    value={textShortRest}
                    placeholder={'00'}
                    keyboardType="numeric" />
            </View>

            <View style={styles.inputs}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Descanso Longo (minutos)</Text>
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99'
                    }}
                    style={styles.camposText}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setLongRestText}
                    value={textLongRest}
                    placeholder={'00'}
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
                    if (textWork >= 1 && textShortRest >= 1 && textLongRest >= 1) {
                        if (textCycles >= 1) {
                            if (textWork != '' && textShortRest != '' && textLongRest != '' && textCycles != '') {
                                if (textWork <= 60 && textShortRest <= 60 && textLongRest <= 60 && textCycles <= 60) {
                                    save();
                                    navigation.navigate('tela_inicial');
                                } else {
                                    alertFormatoCamposMaximo();
                                }
                            } else {
                                alertTamanhoCampos();
                            }
                        } else {
                            alertTamanhoCiclos();
                        }
                    } else {
                        alertFormatoCamposMinimo();
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
