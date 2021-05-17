import React,{useState,useEffect} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity,Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase-config'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const Stack = createStackNavigator();

var seat = []

export default function App({navigation,route}) {
  let readDB = route.params.readDB
  let path = route.params.path
  let type = route.params.type

  const Data = [
    {id:"asfasf",name : "A1",isSelected: false},
    {id:"asffsf",name : "A2",isSelected: false},
    {id:"asfdfh",name : "A3",isSelected: false},
    {id:"asfkuj",name : "A4",isSelected: false},
    {id:"asfajk",name : "B1",isSelected: false},
    {id:"asfkuk",name : "B2",isSelected: false},
    {id:"asfadf",name : "B3",isSelected: false},
    {id:"aewesf",name : "B4",isSelected: false},
    {id:"asgfsa",name : "C1",isSelected: false},
    {id:"askuyu",name : "C2",isSelected: false},
    {id:"asfatr",name : "C3",isSelected: false},
    {id:"asvbnn",name : "C4",isSelected: false},
    {id:"asfasf",name : "D1",isSelected: false},
    {id:"asffsf",name : "D2",isSelected: false},
    {id:"asfdfh",name : "D3",isSelected: false},
    {id:"asfkuj",name : "D4",isSelected: false},
    {id:"asfajk",name : "E1",isSelected: false},
    {id:"asfkuk",name : "E2",isSelected: false},
    {id:"asfadf",name : "E3",isSelected: false},
    {id:"aewesf",name : "E4",isSelected: false},
    {id:"asgfsa",name : "F1",isSelected: false},
    {id:"askuyu",name : "F2",isSelected: false},
    {id:"asfatr",name : "G1",isSelected: false},
    {id:"asvbnn",name : "G2",isSelected: false},
    {id:"asfajk",name : "H1",isSelected: false},
    {id:"asfkuk",name : "H2",isSelected: false},
    {id:"asfadf",name : "H3",isSelected: false},
    {id:"aewesf",name : "H4",isSelected: false},
    {id:"asfajk",name : "I1",isSelected: false},
    {id:"asfkuk",name : "I2",isSelected: false},
    {id:"asfadf",name : "I3",isSelected: false},
    {id:"aewesf",name : "I4",isSelected: false},
    {id:"asfajk",name : "J1",isSelected: false},
    {id:"asfkuk",name : "J2",isSelected: false},
    {id:"asfadf",name : "J3",isSelected: false},
    {id:"aewesf",name : "J4",isSelected: false},
    {id:"asfajk",name : "K1",isSelected: false},
    {id:"asfkuk",name : "K2",isSelected: false},
    {id:"asfadf",name : "K3",isSelected: false},
    {id:"aewesf",name : "K4",isSelected: false},
    {id:"asfajk",name : "L1",isSelected: false},
    {id:"asfkuk",name : "L2",isSelected: false},
    {id:"asfadf",name : "L3",isSelected: false},
    {id:"aewesf",name : "L4",isSelected: false},
    {id:"asfajk",name : "L5",isSelected: false},
    
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
    navigation.navigate('Reservation',{seat : SeatData,path: path,type:type})
  }
    
    return (
    <View style={styles.container}>
      <View style={styles.viewA}>
        { 
          listData.map((item, index)=>{
            while (index < 2){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 40,
                width: 50,
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }



      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 2 || index == 3 ){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 40,
                width: 50,
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>


      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 4 || index == 5){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 6 || index == 7 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
      { 
          listData.map((item, index)=>{
            while (index == 8 || index == 9){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
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
                height: 40,
                width: 50,
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 12 || index == 13){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 14 || index == 15 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 16 || index == 17){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 18 || index == 19 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
      <View style={{marginTop: 10,marginLeft:15}}>
      <Button title="Go back"  onPress={() => navigation.goBack()} />
      </View>
      <View style={{flexDirection: 'row',marginLeft:'25%',}}>
        {
          listData.map((item, index)=>{
            if (index == 20 || index == 21 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>


      <View style={styles.viewB}>
      <View style={{flexDirection: 'row',marginLeft:'54%',}}>
        {
          listData.map((item, index)=>{
            if (index == 22 || index == 23 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 24 || index == 25){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 26 || index == 27 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 28 || index == 29){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 40,
                width: 50,
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 30 || index == 31 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 32 || index == 33){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 34 || index == 35 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>

      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index == 36 || index == 37){
            return(
              <TouchableOpacity
                key= {Math.random().toString(36).substr(2,9)}
                onPress={() => selectionHandler(index)}
                style={{
                marginTop: 10,
                margin: 5,
                height: 40,
                width: 50,
                borderRadius: 10,
                flexDirection: 'row',
                backgroundColor: item.isSelected? 'red':'green',
                justifyContent: "center",
                paddingHorizontal: 15,
                alignItems: 'center'}}
              >
                <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
              </TouchableOpacity>
            )}
        })
        }

      <View style={{flexDirection: 'row',marginLeft:'18%',}}>
        {
          listData.map((item, index)=>{
            if (index == 38 || index == 39 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
      </View>
      </View>



      <View style={styles.viewB}>
        { 
          listData.map((item, index)=>{
            while (index >= 40 ){
            return(
              <TouchableOpacity
              key= {Math.random().toString(36).substr(2,9)}
              onPress={() => selectionHandler(index)}
              style={{
              marginTop: 10,
              margin: 5,
              height: 40,
              width: 50,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: item.isSelected? 'red':'green',
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: 'center'}}
            >
              <Text style={{color:item.isSelected? 'black':'white',fontSize:15}}>{item.name}</Text>
            </TouchableOpacity>
            )}
        })
        }
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
    paddingTop:'10%',
    marginLeft:'15%',
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
  
});


