import * as React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity,Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home.js'
import ScheduleScreen from './Schedule.js'
import ReserveScreen from './Reserve.js'
import Authentication from './Login.js'
import Van from './Van.js'
import Bus from './Bus.js'
import SelectCar from './SelectCar.js'

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Authentication} options = {{ headerShown : false}} />
          <Stack.Screen name="Home" component={HomeScreen} options = {{ headerShown : false}}/>
          <Stack.Screen name="Schedule" component={ScheduleScreen} options = {{ headerShown : false}}/>
          <Stack.Screen name="Reservation" component={ReserveScreen} options = {{ headerShown : false}}/>
          <Stack.Screen name="Van" component={Van} options = {{ headerShown : false}} />
          <Stack.Screen name="Bus" component={Bus} options = {{ headerShown : false}} />
          <Stack.Screen name="SelectCar" component={SelectCar} options = {{ headerShown : false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}




const styles = StyleSheet.create({

  container : {
    flex : 1
  },
  
});

