import React from 'react'
import { Button, StyleSheet, Text, TextInput, 
    TouchableOpacity, View, Image, Modal, SafeAreaView, Dimensions, ScrollView 
  } from 'react-native';

  var timeSchedule = ['8:00', '12:10', '14:20', '17:30']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height

const TimeModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setTimeData(option)
    }

    const options = timeSchedule.map((item, index) => {
        return(
            <TouchableOpacity 
            style = {styles.styleOption}
            key = {index}
            onPress = {() => onPressItem(item) }
            >
                <Text style = {styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })
    return (
      <TouchableOpacity
        onPress = {() => props.changeModalVisibility(false)}
      >
        <View style = {[styles.modal, {width: WIDTH / 2, height : HEIGHT/4}]}>
            <ScrollView >
                {options}
            </ScrollView>
        </View>
      </TouchableOpacity>
    )
}

export default TimeModalPicker;


const styles = StyleSheet.create({
    
    modal : {
        alignSelf : 'center',
        marginTop : '50%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFFFFF',
        borderRadius : 5,
    },

    styleOption : {
        alignItems : 'center'
    },

    text : {
        margin : 15,
        fontSize : 20,
        fontWeight : 'bold'
    }
})
