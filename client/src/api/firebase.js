import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// const config = {
//     apiKey: "AIzaSyByaCBG1tNGrpCQO_aCrv-3g5S5Bh3Wf6s",
//     authDomain: "nomoriam.firebaseapp.com",
//     databaseURL: "https://nomoriam.firebaseio.com",
//     projectId: "nomoriam",
//     storageBucket: "nomoriam.appspot.com",
//     messagingSenderId: "764700428794",
//     appId: "1:764700428794:web:88dd53b86b0e04a2d1fc43",
//     measurementId: "G-4VF56KNMNY"
// };

const config = {
    apiKey: "AIzaSyCcv_sqajnMQCPfOjEJhxr50N3qzR7qak8",
    authDomain: "crytonomoriam.firebaseapp.com",
    databaseURL: "https://crytonomoriam.firebaseio.com",
    projectId: "crytonomoriam",
    storageBucket: "crytonomoriam.appspot.com",
    messagingSenderId: "39566705430",
    appId: "1:39566705430:web:68c7b83e210964d4430637"
};

firebase.initializeApp(config)

export default firebase

