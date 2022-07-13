import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import { ButtonGear } from '../assets/components/ButtonGear';
import { ButtonSound } from '../assets/components/ButtonSound';
import { ButtonPlay_Pause } from '../assets/components/ButtonPlay_Pause';
import CountDown from 'react-native-countdown-component';


export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [workTime, setWorkTime] = React.useState(2);
    const [shortRestTime, setShortRestTime] = React.useState(150);
    const [longRestTime, setLongRestTime] = React.useState(150);
    const [cycles, setCycles] = React.useState(1);
    const [estado, setEstado] = React.useState("Trabalhando");
    const [ciclosConcluidos, setCiclosConcluidos] = React.useState(0);

    console.log("workTime: ", workTime)

    const changeScreen = () => {
        setIsPlaying(false);
        navigation.navigate('configuracoes', { workTime, setWorkTime, shortRestTime, setShortRestTime, longRestTime, setLongRestTime, cycles, setCycles });
    }

    const onCompleteWorkPeriod = () => {
        setEstado('Relaxando');
        setIsPlaying(false);

        if (ciclosConcluidos < cycles) {
            setCiclosConcluidos(ciclosConcluidos + 1);
        }
        return ({ shouldRepeat: false, newInitialRemainingTime: workTime });
    }

    const onCompleteShortRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);

        return ({ shouldRepeat: false, newInitialRemainingTime: shortRestTime });
    }

    const onCompleteLongRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);
        setCiclosConcluidos(0);

        return ({ shouldRepeat: false, newInitialRemainingTime: longRestTime });
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsConfs}>
                <ButtonSound name={isPlaying ? 'volume-mute-outline' : 'sound'} onPress={() => console.log("Teste")} />
                <ButtonGear style={styles.buttonGear} onPress={changeScreen}> </ButtonGear>
            </View>

            <View style={styles.timer}>
                <Text style={{ marginBottom: 25, color: '#FFF', fontSize: 30, letterSpacing: 1, fontWeight: 'bold' }}>{estado}</Text>
                {estado == 'Trabalhando' && (

                    <CountDown
                        until={workTime}
                        timeToShow={['M', 'S']}
                        onFinish={() => onCompleteWorkPeriod()}
                        onPress={() => setIsPlaying(prev => !prev)}
                        size={20}
                        running={isPlaying}>
                    </CountDown>
                )}

                {estado == 'Relaxando' && ciclosConcluidos != cycles && (

                    <CountDown
                        until={shortRestTime}
                        timeToShow={['M', 'S']}
                        onFinish={() => onCompleteShortRestTime()}
                        onPress={() => setIsPlaying(prev => !prev)}
                        size={20}
                        running={isPlaying}>
                    </CountDown>
                )}

                {estado == 'Relaxando' && ciclosConcluidos == cycles && (

                    <CountDown
                        until={longRestTime}
                        timeToShow={['M', 'S']}
                        onFinish={() => onCompleteLongRestTime()}
                        onPress={() => setIsPlaying(prev => !prev)}
                        size={20}
                        running={isPlaying}>
                    </CountDown>
                )}
                <ButtonPlay_Pause name={isPlaying ? 'pause' : 'play'} onPress={() => setIsPlaying(prev => !prev)}></ButtonPlay_Pause>
            </View>


            <View>
                <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 15 }}>Ciclos: {ciclosConcluidos}/{cycles}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#57D0DB',
        padding: 8,
    },
    buttonsConfs: {
        flex: 2,
        paddingTop: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    timer: {
        flex: 3,
        alignItems: 'center',
        marginBottom: 145
    }
});
