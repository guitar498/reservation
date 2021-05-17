import { useRoute, useNavigation } from '@react-navigation/native';
import React,{useState, useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput,TouchableOpacity, View, Image, Modal,
  SafeAreaView, Dimensions, ScrollView, TouchableHighlight, MaskedViewComponent,Platform 
} from 'react-native';
import ModalPicker from './ModalPicker'
import TimeModalPicker from './TimePickerNew'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as firebase from 'firebase';



var destinationSelected = null
var timeSelected = null
var readDB = null
var Ref = 'Username'



function Picker(){
  const [chooseData, setChooseData] = useState('Select Destination..');
  const [isModalVisible, setisModalVisible] = useState(false);


  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)
  }

  const setData = (option) => {
    setChooseData(option)
  }

  useEffect(() => {
    destinationSelected = chooseData
  })


  return(
    <SafeAreaView style = {styles.pickerContain}>
      <TouchableOpacity 
      style = {styles.customOpacity}
      onPress = {() => changeModalVisibility(true)}
      > 
        <Text style = {{fontSize : 20}}>
          {chooseData}
        </Text>
      </TouchableOpacity>
      <Modal 
        transparent = {true}
        animationType = 'fade'
        visible = {isModalVisible}
        nRequestClose = {() => changeModalVisibility(false)}
      >

        <ModalPicker 
        changeModalVisibility = {changeModalVisibility}
        setData = {setData}
        />

      </Modal>

    </SafeAreaView>
  )

}

function TimePicker(){
  const [chooseTime, setChooseTime] = useState('Choose a time..');
  const [isModalVisibility, setisModalVisibility] = useState(false);


  const changeModalVisibility = (bool) => {
    setisModalVisibility(bool)
  }

  const setTimeData = (option) => {
    setChooseTime(option)
  }

  useEffect(() => {
     timeSelected = chooseTime
  })


  return(
    <View style = {styles.content}>
      <Text style = {{fontSize : 18}}> Pick a time </Text>
      <View style={{ marginHorizontal: 20, marginTop : 20}}>
        <TouchableOpacity 
        onPress = {() => changeModalVisibility(true)}
        > 
          <Text style = {styles.textStyle}>
           {chooseTime}
          </Text>
        </TouchableOpacity>
        <Modal 
          transparent = {true}
          animationType = 'fade'
          visible = {isModalVisibility}
          onRequestClose = {() => changeModalVisibility(false)}
        >

          <TimeModalPicker 
          changeModalVisibility = {changeModalVisibility}
          setTimeData = {setTimeData}
          />

        </Modal>
      </View>
    </View>
  )

}



export default function ReserveScreen({navigation, route}){
  var loginemail = route.params.email;
  var SSeat = route.params.seat
  let username = 'Username'
  let path = route.params.path
  let type = route.params.type


  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  const [CR, setCR] = useState("Select car");
  
  useEffect(() => {
    if(type == "Van"|| "Bus" ){
    setCR(type)
    }
    else if (type == null){
      setCR("Select Car")
    }
 })


 


  let ref = firebase.database().ref('Username')
  ref.on('value',gotData, errData)



  function gotData(data){
    //console.log(data.val())
    var scores = data.val();
    var keys = Object.keys(scores);
    //console.log(keys)
    for (var i = 0;i < keys.length; i++) {
      var k = keys[i];
      username = scores[k].username;
      var email = scores[k].email;
      if (loginemail == email) {
        readDB = firebase.database().ref(username)
        //console.log(username)
      }
    }
 
  }
  
  function errData(err){
    console.log(err)
  }
  


  const widthModal = Dimensions.get('window').width;
  const heightModal = Dimensions.get('window').height;

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  }
  const onPressCancel = () => {
    setDate(moment());
    setShow(false);
  }

  const onPressDone = () => {
  setShow(false);
  }

  function passToDB(){
  let trueDate = date.format('MMMM Do, YYYY')
  let trueTime = timeSelected
  Ref = firebase.database().ref(path)
  readDB.push({
    destination : destinationSelected,
    time : trueTime,
    date : trueDate,
    seat : SSeat
  }),
  Ref.push({
    seat : SSeat
  })
  //navigation.navigate('Schedule',{email : loginemail, username: username})
  //console.log(SSeat)
  }

  function passToCR(navigation){
    let Des = date.format('YYYY/MM/DD')+"/"+
    destinationSelected+"/"+timeSelected
    navigation.navigate('SelectCar',{destination: Des})
    
  }



  return(
    <View style = {styles.container}>
      <View style = {styles.navbar}>
        
      </View>

      <View style = {styles.mainContent}>
        <View style = {styles.content}> 
          <Text style = {{fontSize : 18}}> To  </Text>

          <Picker />

        </View>
        <View style = {styles.content}> 
          <Text style = {{fontSize : 18}}> Pick a date </Text>
          <View style = {{marginTop: 20}}>
          <View style={{ marginHorizontal: 20}}>
          <TouchableHighlight
            activeOpacity={0}
            onPress={() => setShow(true)}>
            <View>
                <Text style={styles.textStyle}>{date.format('MMMM Do, YYYY')}</Text>

                <Modal
                transparent={true}
                animationType="slide"
                visible={show}
                supportedOrientations={['portrait']}
                onRequestClose={() => setShow(false)}>
                <View style={{flex: 1}}>
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                        }}
                        activeOpacity={1}
                        visible={show}
                        onPress={() => setShow(false)}>
                        <TouchableHighlight
                            underlayColor={'#FFFFFF'}
                            style={{
                                flex: 1,
                                borderTopColor: '#E9E9E9',
                                borderTopWidth: 1,
                        }}
                        onPress={() => console.log('datepicker clicked')}>
                        
                        <View style={{
                            backgroundColor: '#FFFFFF',
                            height:256,
                            overflow: 'hidden',
                        }}>
                            <View style={{marginTop: 50}}>
                                <DateTimePicker
                                    value={new Date(date)}
                                    mode="date"
                                    display="spinner"
                                    minimumDate={new Date(moment())}
                                    onChange={onChange}
                                />
                            </View>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={onPressCancel}
                                style={[styles.btnText,styles.btnCancel]}>
                                <Text >
                                    Cancel
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={onPressDone}
                                style={[styles.btnText,styles.btnDone]}>
                                <Text >
                                    Done
                                </Text>
                            </TouchableHighlight>
                        </View>

                            </TouchableHighlight>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
          </TouchableHighlight>
        </View>
        

      
        </View>
      </View>

        <TimePicker />

        <View style={marginTop=20}> 
          <Text style = {{fontSize : 18}}> Pick car types </Text>
          <View style = {{marginTop: 20}}>
          <View style={{ marginHorizontal: 20}}>
          <TouchableOpacity 
            style={styles.textStyle}
            onPress = {() => passToCR(navigation)}>
              <Text>{CR}</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>


      
        
        <View style = {styles.reserveButton}>
          <TouchableOpacity  onPress = {() => passToDB(navigation)}>
            <Image source = {require('./Pic/yes.png')} style = {styles.reserveIcon} />
          </TouchableOpacity>
        </View>

      </View>
      
      <View style = {styles.bottombar}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home', {email : loginemail}) } style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/home.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Schedule',{email : loginemail})} style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/clock.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Reservation')} style = {styles.buttonBottom}>
            <View style = {{width : 30, height : 30, borderRadius : 3}}>
              <Image source = {require('./Pic/calendar.png')} style = {styles.bottomNavIcon} />
            </View>
        </TouchableOpacity>
      </View>
      </View>
  )
}
 
    


const styles = StyleSheet.create({

    container : {
      flex : 1
    },
  
    navbar : {
      flex : 1,
      backgroundColor : '#DBDDFF',
      paddingTop : '1%'
    },

    

    mainContent : {
      flex : 10,
      backgroundColor : '#DBDDFF'
    },

    mainInput : {
      borderWidth : 1,
      borderColor : '#000000',
      backgroundColor : '#FFFFFF',
      borderRadius : 5,
      padding : 5,
      marginVertical : '3%',
      marginHorizontal : '2%',
      width : '100%'
    },

    fromInput : {
      borderWidth : 1,
      borderColor : '#000000',
      backgroundColor : '#FFFFFF',
      borderRadius : 5,
      padding : 5,
      marginVertical : '3%',
      marginHorizontal : '2%',
      width : '30%'
    },

    content : {
      marginHorizontal : '3%',
      marginTop : '5%'
    },

    rowContent : {
      marginHorizontal : '3%',
      marginTop : '5%',
      flexDirection : 'row'
    },

    pickerContain : {
      marginTop : '2%',
      marginLeft : '6%',
      backgroundColor : '#F3F3F3',
      alignItems : 'flex-end',
      justifyContent : 'center',
      padding : 15,
      height : 40,
      width : 250
    },

    customOpacity : {
      backgroundColor : '#F3F3F3',
      alignSelf : 'stretch',
      paddingHorizontal : 15
    },

    reserveButton : {
      backgroundColor : '#3F97FA',
      justifyContent : 'center',
      marginLeft : '70%',
      marginRight : '10%',
      marginTop : '10%',
      borderRadius : 5,
      height : 40
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
    },
    btnText:{
      position: 'absolute',
      top: 0,
      height: 42,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      },
      btnCancel:{
          left:0
      },
      btnDone:{
          right:0
      },
      textStyle:{
        paddingHorizontal:10,
        paddingVertical: 15,
        borderColor: 'black',
        borderWidth: 1,
      },
    
    modalItem : {
      alignItems : 'center'
    },

    modal : {
      alignSelf : 'center',
      marginTop : '25%',
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#FFFFFF',
      borderRadius : 5,
  },
  reserveIcon : {
    alignSelf: 'center',
    marginTop : '10%',
    width : 64,
    height : 64
  },

})







