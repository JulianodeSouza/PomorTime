import * as React from 'react';
import { Audio } from 'expo-av';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { ButtonGear } from '../assets/components/ButtonGear';
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

    // Variavel para pausar e reiniciar o timer quando trocar de tela
    // const [pause, setPause] = React.useState(0);
    const [sound, setSound] = React.useState();

    // Função para tocar o ding ao finalizar o timer de foco
    async function playSoundFoco() {
        // constante para criar um evento de som
        const { sound } = await Audio.Sound.createAsync(
            require('../sounds/ding_foco.mp3')
        );
        setSound(sound);

        // Executa o som
        await sound.playAsync();
    }

    // Função para tocar o ding ao finalizar o timer de descanso
    async function playSoundDescanso() {
        // constante para criar um evento de som
        const { sound } = await Audio.Sound.createAsync(
            require('../sounds/ding_descanso.mp3')
        );
        setSound(sound);

        // Executa o som
        await sound.playAsync();
    }

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

    // Função que exibe o tempo formatado
    const renderTime = ({ remainingTime }) => {
        return (
            <Text style={{ color: 'white', fontSize: 40 }}>
                {formatRemainingTime(remainingTime)}
            </Text>
        );
    };

    // Função para redirecionar para a tela de configurações
    const changeScreen = () => {
        setIsPlaying(false);
        // setPause(prevKey => prevKey + 1);
        // Ações para converter os segundos em minutos para a exibição nos campos de texto
        let newWorkTime = workTime / 60;
        let newShortRestTime = shortRestTime / 60;
        let newLongRestTime = longRestTime / 60;
        navigation.navigate('configuracoes', { newWorkTime, setWorkTime, newShortRestTime, setShortRestTime, newLongRestTime, setLongRestTime, cycles, setCycles });
    }

    // Função para alterar o status quando tempo de foco terminar
    const onCompleteWorkPeriod = () => {
        setEstado('Relaxando');
        setIsPlaying(false);

        playSoundFoco();
        return ({ shouldRepeat: false, newInitialRemainingTime: workTime });
    }

    // Função para alterar o status quando tempo de descanso curto terminar
    const onCompleteShortRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);

        if (ciclosConcluidos < cycles) {
            setCiclosConcluidos(ciclosConcluidos + 1);
        }

        playSoundDescanso();
        return ({ shouldRepeat: false, newInitialRemainingTime: shortRestTime });
    }

    // Função para alterar o status quando tempo de descanso longo terminar
    const onCompleteLongRestTime = () => {
        setEstado('Trabalhando');
        setIsPlaying(false);
        setCiclosConcluidos(0);

        playSoundDescanso();
        return ({ shouldRepeat: false, newInitialRemainingTime: longRestTime });
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsConfs}>
                {/* <ButtonSound name={isPlaying ? 'volume-mute-outline' : 'sound'} onPress={() => console.log("Teste")} /> */}
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
                        // key={pause}
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
                        // key={pause}
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
                        // key={pause}
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
        flexDirection: 'row',
    },
    timer: {
        flex: 3,
        alignItems: 'center',
        marginBottom: 145
    }
});