import React,{useState,useEffect} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform, StyleSheet, Text, View,Modal,
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity,Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase-config'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Carpicker from './Carnum'
const Stack = createStackNavigator();

var SSS = ""
var VVV = ""
var AAA = ""
var CCC = null

export default function App({navigation,route}) {
  let desDB = route.params.destination



  const Data = [
    {id:"trhtreh",name : "Van",isSelected: false},
    {id:"erfdeff",name : "Bus",isSelected: false},
  ]


  const [SeatData,setSeatData] = useState("");
  const [listData,setListData] = useState(Data);
  const [choosecar, setChoosecar] = useState('Select Car');


  function CCPicker(){
    const [isModalVisibility, setisModalVisibility] = useState(false);
  
  
    const changeModalVisibility = (bool) => {
      setisModalVisibility(bool)
    }
  
    const setTimeData = (option) => {
      setChoosecar(option)
    }
  
    useEffect(() => {
       CCC = choosecar
    })
  
    return(
      <View style = {styles.content}>
        <View style={styles.textStyle}>
          <TouchableOpacity 
          onPress = {() => changeModalVisibility(true)}
          > 
            <Text style = {{color:'white',fontSize:20}}>
             {choosecar}
            </Text>
          </TouchableOpacity>
          <Modal 
            transparent = {true}
            animationType = 'fade'
            visible = {isModalVisibility}
            onRequestClose = {() => changeModalVisibility(false)}
          >
  
            <Carpicker 
            changeModalVisibility = {changeModalVisibility}
            setTimeData = {setTimeData}
            />
  
          </Modal>
        </View>
      </View>
    )
  }


  function selectionHandler(ind){ 
    const dapa = listData;
    let arr = dapa.map((item,index)=>{
      if (ind == index){
        item.isSelected = !item.isSelected;
        if(item.isSelected == true){
          AAA = item.name
          SSS = firebase.database().ref(desDB+"/"+AAA+"/"+CCC)
          VVV = desDB+"/"+AAA+"/"+CCC
          console.log(SSS)
        }
      }
      return{...item}
    })
    setListData(arr);
  }


  function passToDB(navigation){
    //console.log(seat)
    if(AAA == 'Van'){
        navigation.navigate('Van',{readDB : SSS,path: VVV,type:AAA})
    }
    else if(AAA == 'Bus'){
        navigation.navigate('Bus',{readDB : SSS,path: VVV,type:AAA})
    }
  }

    
    return (
    <View style={styles.container}>
      <View>
        <CCPicker/>
      </View>
      <View style={styles.viewA}>
        { 
          listData.map((item, index)=>{
            while (index < 3){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: '70%',
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:20}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }
      </View>


      <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity  onPress = {() => passToDB(navigation)} style={{ paddingHorizontal: 8,
              paddingVertical: 6,
              borderRadius: 4,
              backgroundColor: "orange",
              alignSelf: "flex-start",
              marginHorizontal: "1%",
              marginBottom: 6,
              minWidth: "48%",
              textAlign: "center"}}>
            <Text style={{textAlign: "center",marginBottom: 10,fontSize: 24}}>
              Done</Text>
          </TouchableOpacity>
      </View> 
    </View>
    )
  
}
const styles = StyleSheet.create({

  container : {
    flex : 1
  },
  viewA : {
    marginLeft:'20%',
    flexDirection: 'column',

  },  
  viewB : {
      flexDirection: 'row',
      marginLeft:'20%',
  }, 
  bar : {
    marginTop: 10,
    height: 50,
    width: '75%',
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  reserveButton : {
    backgroundColor : '#3F97FA',
    justifyContent : 'center',
    marginLeft : '20%',
    marginRight : '10%',
    marginTop : '10%',
    borderRadius : 1,
    height : 20
  },
  textStyle:{
    marginTop: 10,
    margin: 5,
    height: 60,
    width: '70%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: 'center',
    color: 'white',

    
  },
  content : {
    paddingTop:'50%',
    marginLeft:'20%',
    flexDirection: 'column',
  },
  
  
});


