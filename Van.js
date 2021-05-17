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

var seat = []


export default function App({navigation,route}) {
  let readDB = route.params.readDB
  let path = route.params.path
  let type = route.params.type
  console.log(readDB)

  const Data = [
    {id:"asfasf",name : "A1",isSelected: false},
    {id:"asffsf",name : "A2",isSelected: false},
    {id:"asfdfh",name : "A3",isSelected: false},
    {id:"asfkuj",name : "B1",isSelected: false},
    {id:"asfajk",name : "B2",isSelected: false},
    {id:"asfkuk",name : "B3",isSelected: false},
    {id:"asfadf",name : "C1",isSelected: false},
    {id:"aewesf",name : "C2",isSelected: false},
    {id:"asgfsa",name : "C3",isSelected: false},
    {id:"askuyu",name : "D1",isSelected: false},
    {id:"asfatr",name : "D2",isSelected: false},
    {id:"asvbnn",name : "D3",isSelected: false},
  ]



  const [SeatData,setSeatData] = useState("");
  const [listData,setListData] = useState(Data);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  readDB.on('value',gotData, errData)

  function gotData(data){
    const dapa = listData;
    var scores = data.val();
    if (scores !== null){
      var keys = Object.keys(scores);
      for (var i = 0;i < keys.length; i++) {
        var k = keys[i];
        seat.push(scores[k].seat)
        //console.log(seat)
      }
    }
    else if(scores == null){
      Alert.alert("All seat is free")
      readDB.push({
        Text: "Start Servise"
      })
    } 
    //wait(1000).then(() => checkseat());
  }
  function errData(err){
    console.log(err)
  }

  function checkseat(){ 
    const dapa = listData;
    for (var i = 0;i < seat.length; i++){
      for (var j = 0;j < dapa.length; j++){
        if (seat[i] == dapa[j].name){
          dapa[j].isSelected = true
          console.log(readDB)
        }
      }
    }

    let arr = dapa.map((item,index)=>{
      return{...item}
    })
    setListData(arr);
  }




  function selectionHandler(ind){ 
    const dapa = listData;
    let arr = dapa.map((item,index)=>{
      if (ind == index){
        item.isSelected = !item.isSelected;
        if(item.isSelected == true){
          setSeatData(item.name)
        }
      }
      return{...item}
    })
    setListData(arr);
  }


  function passToDB(navigation){
    //console.log(seat)
    seat = []
    navigation.navigate('Reservation',{seat : SeatData,path: path,type:type})
  }

    
    return (
    <View style={styles.container}>
      <View style={{
                marginTop: 50,
                height: 60,
                width: 100,             
                
                }}>
      <Button title="Go back"  onPress={() => navigation.goBack()} />
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
                width: 60,
                borderRadius: 50,
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


      <View style={styles.viewB}>
      <View>
      {
          listData.map((item, index)=>{
            if (index == 3 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        <View style={{flexDirection: 'row',marginLeft:'20%',}}>
        {
          listData.map((item, index)=>{
            if (index == 4 || index == 5 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        </View>
        



        <View style={styles.viewB}>
      <View>
      {
          listData.map((item, index)=>{
            if (index == 6 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        <View style={{flexDirection: 'row',marginLeft:'20%',}}>
        {
          listData.map((item, index)=>{
            if (index == 7 || index == 8 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        </View>

        


        <View style={styles.viewB}>
      <View>
      {
          listData.map((item, index)=>{
            if (index == 9 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        <View style={{flexDirection: 'row',marginLeft:'20%',}}>
        {
          listData.map((item, index)=>{
            if (index == 10 || index == 11 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 60,
                width: 60,
                borderRadius: 50,
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
        </View>







        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity  onPress = {() => checkseat()} style={{ paddingHorizontal: 8,
              paddingVertical: 6,
              borderRadius: 4,
              backgroundColor: "orange",
              alignSelf: "flex-start",
              marginHorizontal: "1%",
              marginBottom: 6,
              minWidth: "48%",
              textAlign: "center"}}>
            <Text style={{textAlign: "center",marginBottom: 10,fontSize: 24}}>
              Check</Text>
          </TouchableOpacity>
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
    paddingTop:'20%',
    marginLeft:'32%',
    flexDirection: 'row',

  },  
  viewB : {
      flexDirection: 'row',
      marginLeft:'15%',
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
    paddingHorizontal:15,
    paddingVertical: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  content : {
      marginTop: 10,
      margin: 5,
      height: 60,
      width: '70%',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: "center",
      paddingHorizontal: 1,
      alignItems: 'center'
  },
  

  
});


