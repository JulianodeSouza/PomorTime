import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import { ButtonGear } from '../assets/components/ButtonGear';
import { ButtonSound } from '../assets/components/ButtonSound';
import { ButtonPlay_Pause } from '../assets/components/ButtonPlay_Pause';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [workTime, setWorkTime] = React.useState(1500);
    const [shortRestTime, setShortRestTime] = React.useState(300);
    const [longRestTime, setLongRestTime] = React.useState(900);
    const [cycles, setCycles] = React.useState(2);
    const [estado, setEstado] = React.useState("Trabalhando");
    const [ciclosConcluidos, setCiclosConcluidos] = React.useState(0);
    const [playPause, setPlayPause] = React.useState(0);

    const formatRemainingTime = time => {
        if (time == 3600) {
            const minutes = time / 60;
            const seconds = time % 60;

            if (seconds == '0') {
                return `${minutes}:${seconds}0`;
            } else {
                return `${minutes}:${seconds}`;
            }
        } else {
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;

            if (seconds == '0') {
                return `${minutes}:${seconds}0`;
            } else {
                return `${minutes}:${seconds}`;
            }
        }
    };

    const renderTime = ({ remainingTime }) => {
        return (
            <Text style={{ color: 'white', fontSize: 40 }}>
                {formatRemainingTime(remainingTime)}
            </Text>
        );
    };

    const changeScreen = () => {
        setIsPlaying(false);
        setPlayPause(prevKey => prevKey + 1)
        // Ações para converter os segundos em minutos para a exibição nos campos de texto
        let newWorkTime = workTime / 60;
        let newShortRestTime = shortRestTime / 60;
        let newLongRestTime = longRestTime / 60;
        navigation.navigate('configuracoes', { newWorkTime, setWorkTime, newShortRestTime, setShortRestTime, newLongRestTime, setLongRestTime, cycles, setCycles });
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

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={workTime}
                        colors={["#d02224", "#bd1f21", "#ac1c1e", "#9c191b"]}
                        colorsTime={[10, 6, 3, 0]}
                        key={playPause}
                        onComplete={onCompleteWorkPeriod}>
                        {renderTime}
                    </CountdownCircleTimer>
                )}

                {estado == 'Relaxando' && ciclosConcluidos != cycles && (

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={shortRestTime}
                        colors={["#d02224", "#bd1f21", "#ac1c1e", "#9c191b"]}
                        colorsTime={[10, 6, 3, 0]}
                        key={playPause}
                        onComplete={onCompleteShortRestTime}>
                        {renderTime}
                    </CountdownCircleTimer>
                )}

                {estado == 'Relaxando' && ciclosConcluidos == cycles && (

                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={longRestTime}
                        colors={["#d02224", "#bd1f21", "#ac1c1e", "#9c191b"]}
                        colorsTime={[10, 6, 3, 0]}
                        key={playPause}
                        onComplete={onCompleteLongRestTime}>
                        {renderTime}
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