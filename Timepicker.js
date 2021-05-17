import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput,TouchableOpacity, View, Image, Modal,RNDateTimePicker,
    SafeAreaView, Dimensions, ScrollView, TouchableHighlight, MaskedViewComponent,Platform 
  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';


const Timecurrentpicker = (props) => {
  const { textStyle } = props;
  const [date, setDate] = useState(moment());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onPressCancel = () => {
    setDate(moment());
    setShow(false);
  };
  const onPressDone = (navigation) => {
    props.onDateChange(date)
    setShow(false);
  }; 
  return(
    <TouchableHighlight
        activeOpacity={0}
        onPress={() => setShow(true)}>
        <View>
            <Text style={textStyle}>{moment(date).format('HH:mm')}</Text>

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
                            mode='time'
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}
                          />
                        </View>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={onPressCancel}
                            style={[styles.btnText,styles.btnCancel]}>
                            <Text >
                                Cancle
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
)
};

Timecurrentpicker.defaultProps = {
  textStyle:{},
};


const styles = StyleSheet.create({
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
  }
})

   
export default Timecurrentpicker ;


