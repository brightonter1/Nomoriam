import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyByaCBG1tNGrpCQO_aCrv-3g5S5Bh3Wf6s",
    authDomain: "nomoriam.firebaseapp.com",
    databaseURL: "https://nomoriam.firebaseio.com",
    projectId: "nomoriam",
    storageBucket: "nomoriam.appspot.com",
    messagingSenderId: "764700428794",
    appId: "1:764700428794:web:88dd53b86b0e04a2d1fc43",
    measurementId: "G-4VF56KNMNY"
};
firebase.initializeApp(config)

export default firebase

