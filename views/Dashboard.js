import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { ButtonGear } from '../assets/components/ButtonGear';
import { ButtonSound } from '../assets/components/ButtonSound';
import { ButtonPlay_Pause } from '../assets/components/ButtonPlay_Pause';


export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [workTime, setWorkTime] = React.useState(10);
    const [restTime, setRestTime] = React.useState(5);
    const [estado, setEstado] = React.useState("Trabalhando");

    const changeScreen = () => {
        navigation.navigate('configuracoes', {workTime, setWorkTime, restTime, setRestTime });
        setIsPlaying(false)
    }

    const onCompleteWorkPeriod = () => {
        console.log("terminou")

        setEstado('Relaxando');
        return ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: workTime });
    }

    const onCompleteRestTime = () => {
        console.log("terminou")

        setEstado('Trabalhando');
        return ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: restTime });
    }

    return (

        <View style={styles.container}>
            <View style={styles.buttonsConfs}>
                <ButtonSound onPress={() => console.log("Teste")} />
                <ButtonGear style={styles.buttonGear} onPress={changeScreen}> </ButtonGear>
            </View>

            <View style={styles.timer}>

                {estado == 'Trabalhando' && (
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={workTime}
                        colors={["#d02224", "#bd1f21", "#ac1c1e", "#9c191b"]}
                        colorsTime={[10, 6, 3, 0]}
                        onComplete={onCompleteWorkPeriod}>
                        {({ remainingTime }) => (
                            <Text style={{ color: 'white', fontSize: 40 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>
                )}

                {estado == 'Relaxando' && (
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={restTime}
                        colors={["#d02224", "#bd1f21", "#ac1c1e", "#9c191b"]}
                        colorsTime={[10, 6, 3, 0]}
                        onComplete={onCompleteRestTime}>
                        {({ remainingTime }) => (
                            <Text style={{ color: 'white', fontSize: 40 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>
                )}


                <ButtonPlay_Pause name={isPlaying ? 'pause' : 'play'} onPress={() => setIsPlaying(prev => !prev)}></ButtonPlay_Pause>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#5390d9',
        padding: 8,
    },
    buttonsConfs: {
        paddingTop: 12,
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    timer: {
        flex: 3,
        alignItems: 'center'

    }
});
