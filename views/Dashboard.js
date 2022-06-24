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
    const [shortRestTime, setShortRestTime] = React.useState(5);
    const [longRestTime, setLongRestTime] = React.useState(5);
    const [cycles, setCycles] = React.useState(1);

    const [estado, setEstado] = React.useState("Trabalhando");

    const changeScreen = () => {
        navigation.navigate('configuracoes', { workTime, setWorkTime, shortRestTime, setShortRestTime, longRestTime, setLongRestTime, cycles, setCycles });
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
        return ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: shortRestTime });
    }

    return (

        <View style={styles.container}>
            <View style={styles.buttonsConfs}>
                <ButtonSound onPress={() => console.log("Teste")} />
                <ButtonGear style={styles.buttonGear} onPress={changeScreen}> </ButtonGear>
            </View>

            <View style={styles.timer}>

                <Text style={{marginBottom: 25, color: '#FFF', fontSize: 30 , letterSpacing: 1, fontWeight: 'bold'}}>{estado}</Text>


                {estado == 'Trabalhando' && (
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={workTime}
                        colors={["#f64f59", "#AF7AC5", "#12c2e9", "#1565c0"]}
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
                        duration={shortRestTime}
                        colors={["#80ED99 ", "#22577A", "#00F260", "#0575E6",]}
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
        backgroundColor: '#57D0DB',
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
