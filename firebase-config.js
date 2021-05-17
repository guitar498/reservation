import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBD4auOiytsva28TIqG_NkRmudU80aku68",
    authDomain: "project-36a8a.firebaseapp.com",
    databaseURL: "https://project-36a8a-default-rtdb.firebaseio.com/",
    projectId: "project-36a8a",
    storageBucket: "project-36a8a.appspot.com",
    messagingSenderId: "23353121459",
    appId: "1:23353121459:web:4d4dfaacda1003ea67aec6",
    measurementId: "G-E008NTKPFJ"
  };
  // Initialize Firebase
 
  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();