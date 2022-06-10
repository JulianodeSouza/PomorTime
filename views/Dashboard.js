import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Feather } from '@expo/vector-icons'; 

export default function Dashboard({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(true)
    const [time, setTime] = React.useState(15)

    return (        
        <View style={styles.container}>
             <Button title='configurações' onPress={() => navigation.navigate('configuracoes')}></Button>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={time}
                colors={["#1a54d4", "#1441a5", "#0f2f76", "#091c47"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
                {({ remainingTime, color }) => (
                    <Text style={{ color, fontSize: 40 }}>
                        {remainingTime}
                    </Text>
                )}
            </CountdownCircleTimer>
            <Button style={{ marginBottom: 20 }} title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} />
            <Feather name="play" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#87CEFA',
        padding: 8,
    }
});
