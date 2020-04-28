import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCZ3I1bnhWoHWou9lgHrx6dj4qPF2k3ODQ",
    authDomain: "nomoriam-fe66e.firebaseapp.com",
    databaseURL: "https://nomoriam-fe66e.firebaseio.com",
    projectId: "nomoriam-fe66e",
    storageBucket: "nomoriam-fe66e.appspot.com",
    messagingSenderId: "705160787283",
    appId: "1:705160787283:web:2e1795fbc25cf5586c9da6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// const config = {
//     apiKey: "AIzaSyCcv_sqajnMQCPfOjEJhxr50N3qzR7qak8",
//     authDomain: "crytonomoriam.firebaseapp.com",
//     databaseURL: "https://crytonomoriam.firebaseio.com",
//     projectId: "crytonomoriam",
//     storageBucket: "crytonomoriam.appspot.com",
//     messagingSenderId: "39566705430",
//     appId: "1:39566705430:web:68c7b83e210964d4430637"
// };

// firebase.initializeApp(config)

export default firebase

