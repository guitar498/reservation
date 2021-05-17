import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createNativeWrapper, ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase-config'

const images = [
  require('./Pic/MonFri.png'),
  require('./Pic/Fri.png'),
  require('./Pic/Sat.png')
]

var userName = 'Username'

export default function HomeScreen({navigation, route}){
    var email = route.params.email;

    let ref = firebase.database().ref('Username')
    ref.on('value',gotData, errData)

    
    function gotData(data){
      //console.log(data.val())
      var scores = data.val();
      var keys = Object.keys(scores);
      //console.log(keys)
      for (let i = 0;i < keys.length; i++) {
        let k = keys[i];
        let username = scores[k].username;
        let userEmail = scores[k].email;
        if (email == userEmail) {
          userName = username
        }
      }
   
    }

    function errData(err){
      console.log(err)
    }


    return (
      <View style = {styles.container}>
      <View style = {styles.navbar}>
        
      </View>
      
      <View style = {styles.mainContent}>
        <View style = {styles.topSchedule}>
          <Image source = {require('./Pic/schedule.png')} style = {styles.scheduleImage} />
          <Text style = {{alignSelf : 'center', fontSize : 20}}>  Schedule </Text>
        </View>
        <View style = {styles.showSchedule}>
            <View style = {styles.listSchedule}>
              <ScrollView>
                {
                  images.map((image, index) =>(
                    <Image 
                      key = {index}
                      style = {styles.scheduleTable}
                      source = {image}
                    />
                  ))
                }
              </ScrollView>
            </View>
        </View>
      </View>
      
      <View style = {styles.bottombar}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home') } style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/home.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Schedule', {email : email, name : userName})} style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/clock.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Reservation', {email : email} ) } style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/calendar.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>
      </View>
      </View>
    );
  
}




const styles = StyleSheet.create({

    container : {
      flex : 1
    },
  
    navbar : {
      flex : 1,
      backgroundColor : 'black',
      paddingTop : '1%'
    },
    mainContent : {
      flex : 8,
      backgroundColor : '#DBDDFF'
    },

    topSchedule : {
      marginVertical : '5%',
      marginHorizontal : '5%',
      flex : 1
    },

    scheduleImage : {
      width : 60 ,
      height : 60 ,
      alignSelf : 'center'
    },

    bottomNavIcon : {
      width : 30,
      height : 30
    },

    showSchedule : {
      flex : 5,
      marginBottom : '5%',
      marginHorizontal : '3%',
      marginTop : '4%'
    },
    
    listSchedule : {
      flexDirection : 'row'
    },

    scheduleTable : {
      width : '90%',
      height : 200,
      marginRight : '2%',
      resizeMode : 'contain',
    },

    bottombar : {
      flex : 1,
      backgroundColor : '#C7CAFD',
      flexDirection : 'row'
    },

    buttonBottom : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
    }

})
