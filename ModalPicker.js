import React from 'react'
import { Button, StyleSheet, Text, TextInput, 
    TouchableOpacity, View, Image, Modal, SafeAreaView, Dimensions, ScrollView 
  } from 'react-native';

var destination = ['Rangsit', 'Bangkadi']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option)
    }

    const options = destination.map((item, index) => {
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
        <View style = {[styles.modal, {width: WIDTH , height : HEIGHT/6}]}>
            <ScrollView>
                {options}
            </ScrollView>
        </View>
      </TouchableOpacity>
    )
}

export default ModalPicker;


const styles = StyleSheet.create({
    
    modal : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFFFFF',
        borderRadius : 10,
        marginTop: '25%'
    },

    styleOption : {
        alignItems : 'center',
    },

    text : {
        margin : 15,
        fontSize : 20,
        fontWeight : 'bold'
    }
})
