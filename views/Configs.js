import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

export default function Configs({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(true)
    const [time, setTime] = React.useState(15)

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20 }}>Configuração em desenvolvimento</Text>
            <Button title="Voltar" onPress={() => navigation.navigate('tela_inicial')} />
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
