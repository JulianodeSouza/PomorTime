import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Dashboard from './views/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Configs from './views/Configs';

const Stack = createStackNavigator();

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [time, setTime] = React.useState(15)

  return (
    <>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='tela_inicial' screenOptions={{ headerShown: true }}>
          <Stack.Screen options={{ title: "Tela Inicial" }} name='tela_inicial' component={Dashboard}></Stack.Screen>
          <Stack.Screen options={{ title: "Configurações" }} name='configuracoes' component={Configs}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
