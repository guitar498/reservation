import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import firebase from './firebase-config'


function ScheduleTimeAndDes(props){

    return(
        <View>
            <Text style = {styles.date}>
                {props.date}
            </Text>
            <View style = {styles.detail}>
                <View style = {{flexDirection : 'row', margin : '3%'}}>
                    <View style = {styles.timeBox}>
                        <Text style = {styles.detailTime}>
                            {props.time}
                        </Text>
                    </View>
                    <Text style = {styles.detailText}>
                        {props.destination}
                    </Text>
                    <Text style = {styles.SeatText}>   
                        {props.seat}
                        </Text>
                </View>
            </View>
        </View>
    )
}



function ListSchedule(){


    return(
        <View style = {styles.container}>
            <Text style = {styles.date}>
                10 March 2021
            </Text>
            <View style = {styles.detail}>
                <View style = {{flexDirection : 'row', margin : '3%'}}>
                    <View style = {styles.timeBox}>
                        <Text style = {styles.detailTime}>
                            12:30
                        </Text>
                    </View>
                    <Text style = {styles.detailText}>
                        Rangsit
                    </Text>
                </View>
                <View style = {{flexDirection : 'row', margin : '3%'}}>
                    <View style = {styles.timeBox}>
                        <Text style = {styles.detailTime}>
                            14:30
                        </Text>
                    </View>
                    <Text style = {styles.detailText}>
                        Bangkadi
                    </Text>
                </View>
            </View>
            <Text style = {styles.date}>
                24 March 2021
            </Text>
            <View style = {styles.detail}>
                <View style = {{flexDirection : 'row', margin : '3%'}}>
                    <View style = {styles.timeBox}>
                        <Text style = {styles.detailTime}>
                            10:50
                        </Text>
                    </View>
                    <Text style = {styles.detailText}>
                        Bangkadi
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container : {
        marginVertical : '2%',
        marginHorizontal : '2%'
    },

    date : {
        fontWeight : 'bold',
        fontSize : 25
    },

    detail : {
        backgroundColor : '#96C9FF',
        borderRadius : 5,
        marginLeft : '8%',
        marginVertical : '3%',
        shadowColor : '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    },

    detailText : {
        fontSize : 20,
        alignSelf : 'center',
        marginLeft : 20
    },

    timeBox : {
        backgroundColor : '#4F9DF0',
        borderRadius : 5
    },

    detailTime : {
        fontSize : 20,
        color : '#FFF',
        padding : 10
    },
    SeatText:{
        fontSize : 20,
        alignSelf : 'center',
        marginLeft : 20,
        color: "#0852F1",
        marginLeft: "20%",
        fontWeight: "bold",
    },

    

})

export default ListSchedule;
export {ScheduleTimeAndDes}