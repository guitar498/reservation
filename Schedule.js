import React, {useCallback, useEffect,useState} from 'react';
import { RefreshControl,ScrollView,Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import ListSchedule, {ScheduleTimeAndDes} from './ListSchedule'
import firebase from './firebase-config'



function ScheduleScreen({navigation, route}) {
  
  var email = route.params.email;
  var userName = route.params.name;

  var userData = []

  const [currentRef, setCurrentRef] = useState('')





  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => setRefreshing(false));
  }, []);


  /*useEffect(() => {
    setTimeout(onRefresh(),3000);
  });*/

  async function getData(data){
    //console.log(data.val())
    var scores = data.val();
    var keys = Object.keys(scores);
    //console.log(keys)
    for (let i = 0;i < keys.length; i++) {
      let k = keys[i];
      let date = scores[k].date;
      let destination = scores[k].destination;
      let time = scores[k].time
      let seat = scores[k].seat
      let data = {
        date : date,
        destination : destination,
        time : time,
        seat : seat
      };
      userData.push(data)
    }
    //console.log(userData)

  }
  function errData(err){
    console.log(err)
  }
  
  let ref = firebase.database().ref(userName)
  ref.on('value',getData, errData)
  
  const options = userData.map((item, index) => {
    return(
        <ScheduleTimeAndDes date = {item.date} time = {item.time} destination = {item.destination} seat = {item.seat} key = {index}/>
    )
})


/*View style = {styles.container}>
        <View style = {styles.navbar}>
        </View>
      
        <View style = {styles.mainContent}>
          <View style = {styles.mainSchedule}>
            {options}
          </View>
        </View>*/

    return (



        <View style = {styles.container} >
          <View style = {styles.navbar}>
          </View>
          <View style = {styles.mainContent}> 
            <ScrollView style={styles.mainContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
              <View style = {styles.mainSchedule}>
              {options}
              </View>    
            </ScrollView>
          </View>
          
        
          
        <View style = {styles.bottombar}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Home',{email : email});
            }} style = {styles.buttonBottom}>
              <View style = {{width : 30, height : 30, borderRadius : 3}}>
                <Image source = {require('./Pic/home.png')} style = {styles.bottomNavIcon} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate('Schedule');
          }} style = {styles.buttonBottom}>
              <View style = {{width : 30, height : 30, borderRadius : 3}}>
                <Image source = {require('./Pic/clock.png')} style = {styles.bottomNavIcon} />
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate('Reservation',{email : email});
          }} style = {styles.buttonBottom}>
              <View style = {{width : 30, height : 30, borderRadius : 3}}>
                <Image source = {require('./Pic/calendar.png')} style = {styles.bottomNavIcon} />
              </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  
}

export default ScheduleScreen;



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

    mainSchedule : {
      marginVertical : '3%',     
      marginHorizontal : '3%'
    },

    showReserve : {
      marginLeft : '8%',
      marginTop : '2%',
      backgroundColor : '#F8FFC9',
      borderRadius : 5
    },

    bottombar : {
      flex : 1,
      backgroundColor : '#C7CAFD',
      flexDirection : 'row'
    },

    bottomNavIcon : {
      width : 30,
      height : 30
    },

    buttonBottom : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
    }

})







