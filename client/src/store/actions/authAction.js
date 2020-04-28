import {
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_OUT,
    SIGN_UP,
    SIGN_UP_FAILED,
    FETCH_PROFILE,
    INITIAL_PROFILE,
    INITIAL_PROFILE_CLEAN,
    EDITE_PHOTO,
    EDITE_PROFILE,
    EDITE_CLEAN
} from './type'

import firebase from '../../api/firebase'
import history from '../../api/history'
import { contract } from '../../contracts/config'
import _ from 'lodash'
const db = firebase.firestore()
const storageRef = firebase.storage().ref()


export const isSignIn = () => async dispatch => {
    var currentUser = firebase.auth().currentUser
    var user = {}
    var ranks = []
    if (currentUser) {
        await db.collection('users').doc(currentUser.uid).get().then((res) => {
            const data = res.data()
            if (data) {
                user = {
                    userId: currentUser.uid,
                    displayname: data.displayname,
                    photoURL: data.photoURL,
                    roleAdmin: data.role === "admin" ? true : false,
                    bio: data.bio
                }
            }
        })

        var data = await contract.methods.getPlayer(currentUser.uid).call()
        user.POINT = data[1]
        user.EXP = data[2]
        user.CHALLENGE_COUNT = data[3]

        await db.collection('ranks').get().then((snapshot) => {
            snapshot.forEach((res) => {
                var dataRank = res.data()
                ranks.push(dataRank)
            })
        })

        for (var k = 0; k < ranks.length; k++) {
            if (ranks[k].rankStart <= user.EXP && user.EXP <= ranks[k].rankExp) {
                user.rankName = ranks[k].rankName
                user.rankExp = ranks[k].rankExp
                user.rankImage = ranks[k].rankImage
                user.rankStart = ranks[k].rankStart
            }
        }
        dispatch({ type: SIGN_IN, payload: user })
    } else {
        dispatch({ type: SIGN_IN_FAILED })
    }

}

export const SignIn = ({ email, pwd }) => async dispatch => {
    var user = {}
    var ranks = []

    firebase.auth().signInWithEmailAndPassword(email, pwd).then(function (result) {
        // Login Completed
        db.collection('users').doc(result.user.uid).get().then(async (res) => {
            const data = res.data()
            if (data) {
                user = {
                    userId: result.user.uid,
                    displayname: data.displayname,
                    photoURL: data.photoURL,
                    roleAdmin: data.role === "admin" ? true : false,
                    bio: data.bio
                }
            }
            var eiei = await contract.methods.getPlayer(result.user.uid).call()
            user.POINT = eiei[1]
            user.EXP = eiei[2]
            user.CHALLENGE_COUNT = eiei[3]

            await db.collection('ranks').get().then((snapshot) => {
                snapshot.forEach((res) => {
                    var dataRank = res.data()
                    ranks.push(dataRank)
                })
            })

            for (var k = 0; k < ranks.length; k++) {
                if (ranks[k].rankStart <= user.EXP && user.EXP <= ranks[k].rankExp) {
                    user.rankName = ranks[k].rankName
                    user.rankExp = ranks[k].rankExp
                    user.rankImage = ranks[k].rankImage
                    user.rankStart = ranks[k].rankStart
                }
            }
            dispatch({ type: SIGN_IN, payload: user })
        })
    }).catch(function (err) {
        // Login Failed
        dispatch({ type: SIGN_IN_FAILED, payload: err.message })
    })
}

export const SignInGoogle = () => async dispatch => {
    var provider = new firebase.auth.GoogleAuthProvider();
    var user = {}
    var ranks = []
    firebase.auth().signInWithPopup(provider).then(async function (result) {
        if (result.additionalUserInfo.isNewUser) {
            db.collection('users').doc(result.user.uid).set({
                displayname: result.user.displayName,
                email: result.user.email,
                role: "player",
                photoURL: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
            })
            user = {
                userId: result.user.uid,
                displayname: result.user.displayName,
                email: result.user.email,
                roleAdmin: false,
                bio: ''
            }

            var eiei = await contract.methods.getPlayer(result.user.uid).call()
            user.POINT = eiei[1]
            user.EXP = eiei[2]
            user.CHALLENGE_COUNT = eiei[3]

            await db.collection('ranks').get().then((snapshot) => {
                snapshot.forEach((res) => {
                    var dataRank = res.data()
                    ranks.push(dataRank)
                })
            })

            for (var k = 0; k < ranks.length; k++) {
                if (ranks[k].rankStart <= user.EXP && user.EXP <= ranks[k].rankExp) {
                    user.rankName = ranks[k].rankName
                    user.rankExp = ranks[k].rankExp
                    user.rankImage = ranks[k].rankImage
                    user.rankStart = ranks[k].rankStart
                }
            }
            dispatch({ type: SIGN_IN, payload: user })
            history.push('/')
        } else {
            await db.collection('users').doc(result.user.uid).get().then((res) => {
                const data = res.data()
                user = {
                    userId: result.user.uid,
                    displayname: data.displayname,
                    photoURL: data.photoURL,
                    roleAdmin: data.role === "admin" ? true : false,
                    bio: result.bio
                }
                dispatch({ type: SIGN_IN, payload: user })
                history.push('/')
            })
        }
    })
}

export const SignOut = () => async dispatch => {
    firebase.auth().signOut().then(function () {
        dispatch({ type: SIGN_OUT })
        history.push('/')
    })
}

export const SignUp = user => async dispatch => {

    await firebase.auth().createUserWithEmailAndPassword(user.email, user.pwd).then((result) => {
        db.collection('users').doc(result.user.uid).set({
            displayname: user.displayname,
            email: user.email,
            role: "player",
            photoURL: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
            bio: ''
        }).then(() => { // Success
            // firebase.auth().signOut().then(function () {
            dispatch({ type: SIGN_UP, payload: "สมัครสมาชิกสำเร็จ" })

            setTimeout(() => {
                history.push('/')
            }, 3000)
            // })

        }).catch((err) => { // Failed
            firebase.auth().signOut()
            dispatch({ type: SIGN_UP_FAILED, payload: err.message })
        })

    }).catch(function (err) {
        console.log("Error")
        dispatch({ type: SIGN_UP_FAILED, payload: err.message })
    })
}

export const FetchProfile = () => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    var player = {}
    var posts = []
    var data = await contract.methods.getPlayer(userId).call()
    const medalCount = await contract.methods.getMedalCountByPlayer(userId).call()
    const medals = []
    for (var i = 0; i < medalCount; i++) {
        var medal = await contract.methods.getMedalByPlayer(userId, i).call()
        medal = {
            title: medal[0].split(':.')[0],
            challenge: medal[0].split(':.')[1],
            image: `https://ipfs.infura.io/ipfs/${medal[1]}`,
            end_time: medal[2]
        }
        medals.push(medal)
    }
    await db.collection('posts').where('owner', '==', userId).get()
        .then((snapshot) => {
            snapshot.forEach((res) => {
                var post = res.data()
                storageRef.child(post.image).getDownloadURL().then(function (url) {
                    post.image = url
                })
                posts.push(post)
            })
        }).catch((err) => {
            console.log("Not FOund")
            console.log(err.message)
        })

    player.exp = data[2]
    var ranks = []
    await db.collection('ranks').get().then((snapshot) => {
        snapshot.forEach((res) => {
            var data = res.data()
            ranks.push(data)
        })
    })

    for (var k = 0; k < ranks.length; k++) {
        if (ranks[k].rankStart <= player.exp && player.exp <= ranks[k].rankExp) {
            player.rankName = ranks[k].rankName
            player.rankExp = ranks[k].rankExp
            player.rankImage = ranks[k].rankImage
            player.rankStart = ranks[k].rankStart
        }
    }

    posts = _.sortBy(posts, function (o) {
        return new Date(o.timestamp)
    }).reverse();
    player.posts = posts
    player.challengeCount = data[3]
    player.medals = medals
    player.oneCount = player.medals.filter(medal => medal.title === 'ผู้ชนะอันดับที่ 1')
    player.twoCount = player.medals.filter(medal => medal.title === 'ผู้ชนะอันดับที่ 2')
    player.threeCount = player.medals.filter(medal => medal.title === 'ผู้ชนะอันดับที่ 3')
    player.fourCount = player.medals.filter(medal => medal.title === 'ถ้วยรางวัลผู้เข้าร่วม')


    dispatch({ type: FETCH_PROFILE, payload: player })
}

export const load = (data) => async dispatch => {
    dispatch({ type: INITIAL_PROFILE, payload: data })
}

export const cleanLoad = () => async dispatch => {
    dispatch({ type: INITIAL_PROFILE_CLEAN })
}

export const EditPhoto = (profile) => async dispatch => {
    console.log("Start ....")
    var userId = firebase.auth().currentUser.uid
    var batch = db.batch()
    var profileRef = db.collection('users').doc(userId)
    storageRef.child(`/profiles/${userId}`).put(profile.image.image)
        .then(function () {
            console.log("Image Profile Uploaded")
            storageRef.child(`/profiles/${userId}`).getDownloadURL()
                .then(async function (url) {
                    console.log("Read path Image")
                    batch.update(profileRef, { "photoURL": url })
                    await batch.commit().then(() => {
                        console.log("COmpleted")
                        dispatch({ type: EDITE_PHOTO, isEdit: true })
                    })
                })
        }).catch(function () {
            dispatch({ type: EDITE_PHOTO, isEdit: false })
        })
}

export const EditProfile = (profile) => async dispatch => {
    console.log("Start ....")
    var userId = firebase.auth().currentUser.uid
    var batch = db.batch()
    var profileRef = db.collection('users').doc(userId)
    batch.update(profileRef, { "displayname": profile.displayname, "bio": profile.bio })
    await batch.commit().then(() => {
        console.log("Complete")
        dispatch({ type: EDITE_PROFILE, isEdit: true })
    })
}

export const EditClean = () => async dispatch => {
    dispatch({ type: EDITE_CLEAN })
}