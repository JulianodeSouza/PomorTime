import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { ButtonGear } from '../assets/components/ButtonGear';
import { ButtonSound } from '../assets/components/ButtonSound';
import { ButtonPlay_Pause } from '../assets/components/ButtonPlay_Pause';


export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [workTime, setWorkTime] = React.useState(5);
    const [shortRestTime, setShortRestTime] = React.useState(5);
    const [longRestTime, setLongRestTime] = React.useState(5);
    const [cycles, setCycles] = React.useState(1);
    const [estado, setEstado] = React.useState("Trabalhando");
    const [ciclosConcluidos, setCiclosConcluidos] = React.useState(0);

    const changeScreen = () => {
        navigation.navigate('configuracoes', { workTime, setWorkTime, shortRestTime, setShortRestTime, longRestTime, setLongRestTime, cycles, setCycles });
        setIsPlaying(false);
    }

    const onCompleteWorkPeriod = () => {
        setEstado('Relaxando');
        setIsPlaying(false);

        if (ciclosConcluidos < cycles) {
            setCiclosConcluidos(ciclosConcluidos + 1);
        }
        return ({ shouldRepeat: false, delay: 5, newInitialRemainingTime: workTime });
    }

    const onCompleteShortRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);

        return ({ shouldRepeat: false, delay: 5, newInitialRemainingTime: shortRestTime });
    }

    const onCompleteLongRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);
        setCiclosConcluidos(0);

        return ({ shouldRepeat: false, delay: 5, newInitialRemainingTime: longRestTime });
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

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={workTime}
                        colors={["#BC0017"]}
                        onComplete={onCompleteWorkPeriod}>
                        {({ remainingTime }) => (<Text style={{ color: 'white', fontSize: 40 }}> {remainingTime} </Text>)}
                    </CountdownCircleTimer>
                )}

                {estado == 'Relaxando' && ciclosConcluidos != cycles && (

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={shortRestTime}
                        colors={["#274F0A"]}
                        onComplete={onCompleteShortRestTime}>
                        {({ remainingTime }) => (<Text style={{ color: 'white', fontSize: 40 }}> {remainingTime} </Text>)}
                    </CountdownCircleTimer>
                )}

                {estado == 'Relaxando' && ciclosConcluidos == cycles && (

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={longRestTime}
                        colors={["#274F0A"]}
                        onComplete={onCompleteLongRestTime}>
                        {({ remainingTime }) => (<Text style={{ color: 'white', fontSize: 40 }}> {remainingTime} </Text>)}
                    </CountdownCircleTimer>
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
