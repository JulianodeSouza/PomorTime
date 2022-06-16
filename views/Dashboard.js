import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { ButtonGear } from '../assets/components/ButtonGear';
import { ButtonSound } from '../assets/components/ButtonSound';
import { ButtonPlay_Pause } from '../assets/components/ButtonPlay_Pause';


export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [primaryTime, setTime] = React.useState(15);
    const [secondaryTime, setTime2] = React.useState(5);
    const [CurrentyTime, setCurrentTime] = React.useState(primaryTime);

    const [estado, setEstado] = React.useState("Trabalhando");

    const changeScreen = () => {
        navigation.navigate('configuracoes', { time: primaryTime, setTime });
        setIsPlaying(false)
    }
    const onComplete = () => {
        setEstado(estado == 'Trabalhando' ? 'Relaxando' : 'Trabalhando');
        setCurrentTime(estado == 'Trabalhando' ? secondaryTime : primaryTime);
        console.log("onComplete");
        return ({ shouldRepeat: true, delay: 10, newInitialRemainingTime: estado == 'Trabalhando' ? secondaryTime : primaryTime });
    }
    return (

        <View style={styles.container}>
            <View style={styles.buttonsConfs}>
                <ButtonSound onPress={() => console.log("Teste")} />
                <ButtonGear style={styles.buttonGear} onPress={changeScreen}> </ButtonGear>
            </View>

            <View style={styles.timer}>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={CurrentyTime}
                    colors={["#1a54d4", "#1441a5", "#0f2f76", "#091c47"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={onComplete}>
                    {({ remainingTime, color }) => (
                        <Text style={{ color, fontSize: 40 }}>
                            {remainingTime}
                        </Text>
                    )}
                </CountdownCircleTimer>
                
                <ButtonPlay_Pause name={isPlaying ? 'pause' : 'play'} onPress={() => setIsPlaying(prev => !prev)}></ButtonPlay_Pause>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#87CEFA',
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
