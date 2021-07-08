import firebase from 'firebase';

require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyAyspPBqu1_r6bLDE99bGJyClryxaH6z-M",
  authDomain: "business-mart-dc51c.firebaseapp.com",
  projectId: "business-mart-dc51c",
  storageBucket: "business-mart-dc51c.appspot.com",
  messagingSenderId: "825834681573",
  appId: "1:825834681573:web:00c15c7e588c3243ad500c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} 
export default firebaseConfig;