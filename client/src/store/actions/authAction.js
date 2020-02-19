import {
    SIGN_IN,
    SIGN_OUT
} from './type'

import firebase from '../../api/firebase'
import history from '../../api/history'


export const SignIn = (social) => async dispatch => {
    var currentUser = firebase.auth().currentUser
    var user = {}
    var provider
    var db = firebase.firestore()
    if (social === 'google.com') {
        provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async function (result) {
            await db.collection('users').doc(result.user.uid).get().then((res) => {
                const data = res.data()
                if (data) {
                    user = {
                        userId: result.user.uid,
                        name: result.user.displayName,
                        photoURL: result.user.photoURL,
                        roleAdmin: data.role === "admin" ? true : false
                    }
                } else {
                    user = {
                        userId: result.user.uid,
                        name: result.user.displayName,
                        photoURL: result.user.photoURL
                    }
                }
            })

            if (result.additionalUserInfo.isNewUser) {
                db.collection('users').doc(result.user.uid).set({
                    displayname: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    role: "player"
                })
                dispatch({ type: SIGN_IN, payload: user })
                history.push("/")
            } else {
                dispatch({ type: SIGN_IN, payload: user })
            }
        })
    } else if (social === 'facebook.com') {
        provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async function (result) {
            await db.collection('users').doc(result.user.uid).get().then((res, err) => {
                const data = res.data()
                if (data) {
                    user = {
                        userId: result.user.uid,
                        name: result.user.displayName,
                        photoURL: result.user.photoURL,
                        roleAdmin: data.role === "admin" ? true : false
                    }
                } else {
                    user = {
                        userId: result.user.uid,
                        name: result.user.displayName,
                        photoURL: result.user.photoURL
                    }
                }
            })

            if (result.additionalUserInfo.isNewUser) {
                db.collection('users').doc(result.user.uid).set({
                    displayname: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    role: "player"
                })
                dispatch({ type: SIGN_IN, payload: user })
                history.push("/")
            } else {
                dispatch({ type: SIGN_IN, payload: user })
            }
        })
    } else {
        await db.collection('users').doc(currentUser.uid).get().then((res) => {
            const data = res.data()
            if (data) {
                user = {
                    userId: currentUser.uid,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    roleAdmin: data.role === "admin" ? true : false
                }
            } else {
                user = {
                    userId: currentUser.uid,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL
                }
            }
        })

        dispatch({ type: SIGN_IN, payload: user })
    }

}

export const SignOut = () => dispatch => {
    firebase.auth().signOut().then(function () {
        dispatch({ type: SIGN_OUT })
    })
}
