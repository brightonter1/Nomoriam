import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_CHALLENGE_OWNER,
    FETCH_ACTIVITY_BYOWNER,
    DO_POST
} from './type'

import firebase from '../../api/firebase'
import history from '../../api/history'
import { contract, createTransaction } from '../../contracts/config'
import moment from 'moment'
const db = firebase.firestore()
var storageRef = firebase.storage().ref()

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
                        name: data.displayname,
                        photoURL: data.photo,
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
                    name: data.displayname,
                    photoURL: data.photo,
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

export const fetchChallengesByOwner = (userId) => async dispatch => {
    var challenges = []
    db.collection('challenges').where('owner', '==', userId).get().then((snapshot) => {
        snapshot.forEach((res) => {
            challenges.push(res.data())
        })
        if (challenges.length === 0) {
            dispatch({ type: FETCH_CHALLENGE_OWNER, payload: false })
        } else {
            dispatch({ type: FETCH_CHALLENGE_OWNER, payload: challenges })
        }
    })
}

export const fetchActivityByOwner = (userId) => async dispatch => {
    var challenges = []
    var activities = []
    var playerActs = []
    const size = await contract.methods.getChallengeCount().call()
    for (var i = 0; i < size; i++) {
        var challenge = await contract.methods.challenges(i).call()
        var joined = await contract.methods.getJoinedChallenge(i, userId).call()
        if (joined) {
            var actCount = await contract.methods.getActivityCount(i).call()
            for (var j = 0; j < actCount; j++) {
                var act = await contract.methods.getActivityByChallenge(i, j).call()
                act = {
                    title: act[0],
                    image: act[1],
                    category: act[2],
                    times: act[3],
                    point: act[4],
                    exp: act[5],
                    location: act[6]
                }
                if (act.category === 'qrcode') {
                    var qrcode = []
                    for (var k = 0; k < act.times; k++) {
                        var hash = await contract.methods.getQRcodeByChallenge(i, j, k).call()
                        qrcode.push(hash)
                    }
                    act.qrcode = qrcode
                }
                if (act.category === 'question') {
                    var issue = await contract.methods.getQuestionByChallenge(i, k).call()
                    act.question = issue[0]
                    act.answer = issue[1]
                }

                var playerAct = await contract.methods.getActivityChallengeByPlayer(i, j, userId).call()
                playerAct = {
                    title: playerAct[0],
                    times: playerAct[1]
                }
                playerActs.push(playerAct)
                activities.push(act)
            }
            challenge.myActivity = playerActs
            challenge.activities = activities
            playerActs = []
            activities = []
            challenge.index = i
            challenges.push(challenge)
        }
    }
    dispatch({ type: FETCH_ACTIVITY_BYOWNER, payload: challenges })
}

export const doPost = (index, count, userId, post) => async dispatch => {
    const { image, caption } = post
    const { fileName, buffer } = image

    doPost()

    function uploadImage() {
        var ref = storageRef.child(`images/${fileName}`)
        ref.put(buffer).then((snapshot) => {
            console.log('Uploaded an array!')
            uploadPost()
        })

    }

    function uploadPost() {
        db.collection('posts').doc().set({
            caption,
            image: `images/${fileName}`,
            userId,
            date: moment().format('YYYY-MM-DD, HH:mm:ss ')
        })
    }

    async function doPost() {
        var data = contract.methods.doPost(index, count, userId).encodeABI()
        const txHash = await createTransaction(data)
        console.log(txHash)
        uploadImage()
        dispatch({ type: DO_POST, payload: true })
    }
}