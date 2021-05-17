import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import firebase from './firebase-config' 





export default function SignupLogin({navigation}) {
  
  /*let ref = firebase.database().ref()
  ref.on('value',gotData, errData)*/

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [showLogindisplay, setshowLogin] = useState(true);


  /*var passusername = null;

  function gotData(data){
    //console.log(data.val())
    var scores = data.val();
    var keys = Object.keys(scores);
    //console.log(keys)
    for (var i = 0;i < keys.length; i++) {
      var k = keys[i];
      passusername = scores[k].username;
      console.log(passusername)
    }
    //navigation.navigate('Home',{ username : passusername })
  
  }
  function errData(err){
    console.log(err)
  }*/

  function passtohome(navigation){
    navigation.navigate('Home',{ email: email }) 
  }

  









  function toggleShowLogin() {
    setshowLogin(true)
  }

  function toggleShowSignup() {
    setshowLogin(false)
  }
  
  function doLogin() {
    firebase.auth().signInWithEmailAndPassword(email,password).then( () => {
      console.log("login successful");
      passtohome(navigation);
  
  
      
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
      // ...
    })
  }

  function doSignup() {
    // https://firebase.google.com/docs/auth/web/start

    // check if the two password fields match

    setconfirmpassword(password)
    if (password === confirmpassword){
      // do signup
      firebase.auth().createUserWithEmailAndPassword(email,password).then( () => {
        let readDB = firebase.database().ref('Username')
        console.log("created new user successful");
        readDB.push({
          username : username,
          email : email,
        })
        toggleShowLogin(); // show login page
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
    }
    else {
      alert("Password do not match !!!");
    }
  }




  function showSignup() {
    return (
      <View style={styles.container}>
      <Text style = {styles.makeTextCenter}>Bus and Van</Text>
      <View style={styles.userNameAndPass}>

      <Text> username </Text>
        <TextInput style = {styles.inputStyle}
          value={username}
          placeholder="Your name etc. Adam Smith"
          onChangeText={(username) => setusername(username)}></TextInput>

        <Text> Email </Text>
        <TextInput style = {styles.inputStyle}
          value={email}
          placeholder="Email"
          secureTextEntry={false}
          onChangeText={(email) => setemail(email)}></TextInput>

        <Text> Password </Text>
        <TextInput style = {styles.inputStyle}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setpassword(password)}></TextInput>

        <Text> Confirm Password </Text>
        <TextInput style = {styles.inputStyle}
          value={confirmpassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(confirmpassword) => setconfirmpassword(confirmpassword)}></TextInput>
        <View style = {styles.viewButton}>
           <Button title='SignUp' style = {styles.buttonStyle} onPress={doSignup}/>
           <Button title='Login' style = {styles.buttonStyle} onPress={toggleShowLogin}/>
          
        </View>
        
      </View>
    
    </View>
    );
  }

  function showLogin() {
    return (
    <View style={styles.container}>
      <Text style = {styles.makeTextCenter}>Bus and Van</Text>
      <View style={styles.userNameAndPass}>
        <Text> Email </Text>
        <TextInput style = {styles.inputStyle}
          value={email}
          placeholder="Email"
          onChangeText={(email) => setemail(email)}></TextInput>
        <Text> Password </Text>
        <TextInput style = {styles.inputStyle}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setpassword(password)}></TextInput>
        <View style = {styles.viewButton}>
           <Button title='Login' style = {styles.buttonStyle} onPress={doLogin}/>
           <Button title='SignUp' style = {styles.buttonStyle}  onPress={toggleShowSignup}/>
        </View>
        <TouchableOpacity >
          <Text style = {styles.forgot} > Forget Password</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );

  }

    return(
      <View style={{flex:1}}>
        {showLogindisplay ? showLogin() : showSignup() }
      </View>
    );
}












const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAC3A0',
    marginVertical: '35%',
    marginHorizontal: '10%',
    borderRadius: 10,
    paddingVertical: '5%'
  },
  
  userNameAndPass: {
    flex: 1,
    marginVertical: '5%',
    marginHorizontal: '5%'
  },
  
  makeTextCenter : {
    alignSelf: "center"
  },

  inputStyle : {
    borderColor: '#E1D8D2',
    marginVertical: '5%',
    borderBottomWidth: 1
  },

  viewButton : {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  buttonStyle : {
    backgroundColor: 'blue',
    color: 'white'
  },

  forgot : {
    color : 'red',
    fontSize : 10,
    marginLeft : '52%'
  }

});
