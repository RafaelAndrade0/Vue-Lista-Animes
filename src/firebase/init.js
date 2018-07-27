import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIFfAm4wf4wtpttEIQSUV8yXaSDMW12nc",
    authDomain: "vue-lista-anime.firebaseapp.com",
    databaseURL: "https://vue-lista-anime.firebaseio.com",
    projectId: "vue-lista-anime",
    storageBucket: "vue-lista-anime.appspot.com",
    messagingSenderId: "420605740808"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  // export firestore database
  export default firebaseApp.firestore()