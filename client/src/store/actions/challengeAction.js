import {
    CREATE_CHALLENGE,
    CREATE_CHALLENGE_FAILED,
    FETCH_CHALLENGE_ON_APPROVE,
    FETCH_CHALLENGE_BY_INDEX,
    FETCH_CHALLENGE_BY_INDEX_CLEAN_UP,
    APPROVE_CHALLENGES,
    FETCH_CHALLENGES,
    FETCH_CHALLENGE,
    FETCH_CHALLENGE_CLEAN_UP,
    JOIN_CHALLENGE,
    JOIN_CHALLENGE_CLEAN_UP,
    FETCH_ACTIVITY,
    CLEAN_UP,
    DOPOST,
    DOPOST_CLEAN,
    DOQRCODE,
    DOQRCODE_CLEAN,
    FETCH_MY_CHALLENGE,
    FETCH_MY_CHALLENGES
} from './type'

import moment from 'moment'
import firebase from '../../api/firebase'
import ipfs from '../../api/ipfs'
import history from '../../api/history'
import _ from 'lodash'
import { contract, createTransaction } from '../../contracts/config'
import { Medal } from '../../asset/archievement/Medal'
const db = firebase.firestore()
const storageRef = firebase.storage().ref()

export const CreateChallenge = (challenge, activity) => async dispatch => {
    var userId = firebase.auth().currentUser.uid

    const concat = ({ title, category, times, location }) => {
        return {
            title: title + ":," + location,
            category: category,
            times: times
        }
    }

    activity = _.map(activity, concat)
    await ipfs.add(challenge.image.image, async (error, result) => {
        const image = result[0].hash
        console.log("image: ", image)
        db.collection('challenges').doc().set({
            owner: userId,
            title: challenge.name,
            desc: challenge.desc,
            image: 'https://ipfs.infura.io/ipfs/' + image,
            create_time: challenge.create_time,
            end_time: challenge.end_time,
            activities: activity,
            approved: false,
            finished: false
        }).then(function () {
            // Success
            dispatch({ type: CREATE_CHALLENGE, payload: "รอแอดมินตรวจสอบหลังสร้างชาเลนจ์" })
            setTimeout(() => {
                history.push('/account/status')
            }, 3000)
        }).catch(function (err) {
            // Failed
            dispatch({ type: CREATE_CHALLENGE_FAILED, payload: err.message })
        })
    })
}

export const fetchChallengeOnApprove = () => async dispatch => {
    var challenges = []
    db.collection('challenges').where('approved', '==', false).get().then((snapShot) => {
        snapShot.forEach((res) => {
            const data = res.data()
            data.doc = res.id
            challenges.push(data)
        })
        dispatch({ type: FETCH_CHALLENGE_ON_APPROVE, payload: challenges })
    }).catch((err) => {
        dispatch({ type: FETCH_CHALLENGE_ON_APPROVE, payload: err.message })
    })
}

export const fetchChallengeByIndex = (index) => async dispatch => {
    var challenge = {}
    db.collection('challenges').doc(index).get()
        .then((res) => {
            challenge = res.data()
            dispatch({ type: FETCH_CHALLENGE_BY_INDEX, payload: challenge })
        }).catch((err) => {
            dispatch({ type: FETCH_CHALLENGE_BY_INDEX, payload: err.message })
        })
}

export const fetchChallengeByIndexCleanUp = () => async dispatch => {
    dispatch({ type: FETCH_CHALLENGE_BY_INDEX_CLEAN_UP })
}

export const approveChallenge = (challenge) => async dispatch => {
    const { activities } = challenge
    var timer = 15000

    createChallenge()

    async function createChallenge() {
        console.log("Writing.. Challenge to Blockchain")
        const index = await contract.methods.getChallengeCount().call()
        const data = contract.methods.createChallenge(
            challenge.title, challenge.desc, challenge.image, challenge.create_time, challenge.end_time, challenge.owner
        ).encodeABI()
        const txHash = await createTransaction(data)

        console.log("Challenge Count ", index)
        console.log(txHash)

        setTimeout(() => {
            addActivities(index, txHash, challenge.title)
        }, timer)
    }

    async function addActivities(index, txHash, title) {
        console.log("Writing.. Activitites from Challenge to Blockchain")
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i]
            const result = await transaction(act, index)
            console.log(result)
        }
        console.log('*** Finished ***')
        addMedal(txHash, index, title)
    }

    async function transaction(act, index) {
        var image = act.category === 'post' ? 'QmTVAbNEUe3mtLQibRcWB2drchJgiWxQCaKmaZJB43WMAs' : 'QmRPj4nmcSUyRKTK5KSP73t7Lkj1Tnmaqgkt5pFHQZTPkf'
        const value = contract.methods.addActivity(
            Number(index), act.title, image, act.category, Number(act.times)
        ).encodeABI()
        const result = await createTransaction(value)
        return result
    }

    async function addMedal(txHash, index, title) {
        console.log("Writing... Add medal to challenge")
        for (let i = 0; i < 4; i++) {
            var medal = Medal[i]
            medal.title = medal.title + ":." + title
            const result = await transactionMedal(medal, index)
            console.log(result)
        }
        console.log("Finished Medal added")
        updateStatus(txHash)
    }

    async function transactionMedal(medal, index) {
        const value = contract.methods.addMedal(
            Number(index), medal.title, medal.image
        ).encodeABI()
        const result = await createTransaction(value)
        return result
    }

    async function updateStatus(txHash) {
        console.log("Update status to firebase....")
        var batch = db.batch()
        const doc = await db.collection('challenges').where('title', '==', challenge.title).get().then((res) => {
            return res.docs[0].id
        })
        var challengeRef = db.collection('challenges').doc(doc)
        batch.update(challengeRef, { "approved": true, "signTransaction": txHash })
        await batch.commit().then(() => {
            console.log("Update status approve completed")
            dispatch({ type: APPROVE_CHALLENGES, payload: txHash })
        })
    }
}

export const fetchChallenges = () => async dispatch => {
    var challenges = []
    var userId = firebase.auth().currentUser.uid
    const size = await contract.methods.getChallengeCount().call()
    for (var index = 0; index < size; index++) {
        var challenge = await contract.methods.challenges(index).call()
        const joined = await contract.methods.getJoinedChallenge(index, userId).call()
        const playerCount = await contract.methods.getPlayerCountByChallenge(index).call()
        const actCount = await contract.methods.getActivityCount(index).call()
        challenge.joined = joined
        challenge.playerCount = playerCount
        challenge.actCount = actCount
        challenges.push(challenge)
    }
    dispatch({ type: FETCH_CHALLENGES, payload: challenges })
}

export const fetchChallenge = index => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    const challenge = await contract.methods.challenges(index).call()
    const actCount = await contract.methods.getActivityCount(index).call()
    const playerCount = await contract.methods.getPlayerCountByChallenge(index).call()
    const joined = await contract.methods.getJoinedChallenge(index, userId).call()
    const acts = []
    const players = []
    const medals = []

    for (var count = 0; count < actCount; count++) {
        var data = await contract.methods.getActivityByChallenge(index, count).call()
        data = {
            title: data[0],
            image: data[1],
            category: data[2],
            times: data[3],
            point: data[4],
            exp: data[5]
        }
        const qrcodes = []
        if (data.category === "qrcode") {
            for (var j = 0; j < data.times; j++) {
                const qr = await contract.methods.getQRcodeByChallenge(index, i, j).call()
                qrcodes.push(qr)
            }
            data.qrcode = qrcodes;
        }

        acts.push(data)
    }

    const sizeMedal = await contract.methods.getMedalByChallenge(index).call()
    for (var j = 0; j < sizeMedal; j++) {
        var medal = await contract.methods.getMedalByIndex(index, j).call()
        medal = {
            title: medal[0],
            image: medal[1],
            end_time: medal[3]
        }
        medals.push(medal)
    }

    for (var i = 0; i < playerCount; i++) {
        var uid = await contract.methods.getPlayerUID(index, i).call()
        var player = await contract.methods.getPlayerByChallenge(index, uid).call()
        player = {
            uid: player[0],
            point: player[1]
        }
        players.push(player)
    }
    challenge.medals = medals
    challenge.joined = joined
    challenge.activities = acts
    challenge.players = players
    dispatch({ type: FETCH_CHALLENGE, payload: challenge })
}

export const fetchChallengeCleanUp = () => async dispatch => {
    dispatch({ type: FETCH_CHALLENGE_CLEAN_UP })
}

export const joinChallenge = (index) => async dispatch => {
    var userId = firebase.auth().currentUser.uid

    join()

    async function join() {
        console.log("Writing.. Player to Blockchain")
        const data = contract.methods.joinChallenge(
            index, userId
        ).encodeABI()
        const txHash = await createTransaction(data)
        console.log(txHash)
        dispatch({ type: JOIN_CHALLENGE, payload: txHash })
    }
}

export const joinCleanUp = () => async dispatch => {
    dispatch({ type: JOIN_CHALLENGE_CLEAN_UP })
}

export const cleanUp = () => async dispatch => {
    dispatch({ type: CLEAN_UP })
}
export const fetchActivity = () => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    const size = await contract.methods.getChallengeCount().call()
    const challenges = []
    for (var index = 0; index < size; index++) {
        const acts = []
        const joined = await contract.methods.getJoinedChallenge(index, userId).call()
        if (joined) {
            var challenge = await contract.methods.challenges(index).call()
            const actCount = await contract.methods.getActivityCount(index).call()
            for (var i = 0; i < actCount; i++) {
                const qrcodes = []
                var act = await contract.methods.getActivityByChallenge(index, i).call()
                act = {
                    title: act[0],
                    image: act[1],
                    category: act[2],
                    times: act[3],
                    point: act[4],
                    exp: act[5]
                }
                if (act.category === "qrcode") {
                    for (var j = 0; j < act.times; j++) {
                        const qr = await contract.methods.getQRcodeByChallenge(index, i, j).call()
                        qrcodes.push(qr)
                    }
                    act.qrcode = qrcodes;
                }
                const myAct = await contract.methods.getActivityChallengeByPlayer(index, i, userId).call()
                act.myTitle = myAct[0]
                act.myTimes = myAct[1]
                acts.push(act)
            }
            const myCha = await contract.methods.getPlayerByChallenge(index, userId).call()

            challenge.myUid = myCha[0]
            challenge.myPoint = myCha[1]
            challenge.activities = acts
            challenge.index = index
            challenges.push(challenge)
        }

    }
    dispatch({ type: FETCH_ACTIVITY, payload: challenges })

}

export const Post = (post, index, count) => async dispatch => {
    var timestamp = moment().format('L') + "-" + moment().format('LT')
    var userId = firebase.auth().currentUser.uid
    var check = await contract.methods.doPost(index, count, userId).call()
    var medal = ''
    if (check >= 1 && check <= 3) {
        medal = await contract.methods.getMedalByIndex(index, check - 1).call()
        medal = {
            title: medal[0],
            image: medal[1],
            time: medal[2]
        }
    }

    TransactionPost()

    async function TransactionPost() {
        const post = contract.methods.doPost(
            index, count, userId
        ).encodeABI()
        try {
            const result = await createTransaction(post)
            doPost(result)
        } catch (err) {
            dispatch({ type: DOPOST, payload: "ผู้เล่นได้เล่นจนครบจำนวนเรียบร้อยแล้ว", isPosted: false })
        }
    }

    async function doPost(result) {
        var path = `/posts/${userId}/${result}`
        var postRef = storageRef.child(path)
        postRef.put(post.image.image).then(function (snapshot) {
            console.log("Image Uploaded")
            db.collection('posts').doc().set({
                caption: post.caption,
                image: path,
                timestamp: timestamp,
                signTransaction: result,
                owner: userId
            }).then(function () {
                console.log("Uploaded post on Firebase completed")
                if (check >= 1 && check <= 3) {
                    dispatch({ type: DOPOST, payload: result, isPosted: true, medal: medal })
                } else {
                    dispatch({ type: DOPOST, payload: result, isPosted: true })
                }
            }).catch(function (err) {
                dispatch({ type: DOPOST, payload: err.message, isPosted: false })
            })
        })
    }
}

export const PostClean = () => async dispatch => {
    dispatch({ type: DOPOST_CLEAN })
}
export const doQRcode = (index, count, qrcode) => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    var check = await contract.methods.doQRCode(index, count, userId, qrcode).call()
    var medal = ''
    console.log(check)
    if (check >= 1 && check <= 3) {
        medal = await contract.methods.getMedalByIndex(index, check - 1).call()
        medal = {
            title: medal[0],
            image: medal[1],
            time: medal[2]
        }
    }
    if (check === '0') {
        dispatch({ type: DOQRCODE, payload: 'ผู้เล่นได้สแกนคิวอาโค้ดนี้ไปแล้ว', isPosted: false })
    } else {
        TransacntionQRcode()
    }
    async function TransacntionQRcode() {
        const data = contract.methods.doQRCode(
            index, count, userId, qrcode
        ).encodeABI()
        try {
            const result = await createTransaction(data)
            dispatch({ type: DOQRCODE, payload: result, isPosted: true, medal: medal })
        } catch (err) {
            dispatch({ type: DOQRCODE, payload: "ผู้เล่นได้สแกนคิวอาโค้ดนี้ไปแล้ว", isPosted: false })
        }
    }
}

export const doQRcodeClean = () => async dispatch => {
    dispatch({ type: DOQRCODE_CLEAN })
}

export const fetchMyChallenges = () => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    const challenges = []
    const size = await contract.methods.getChallengeCount().call()
    for (var i = 0; i < size; i++) {
        var owner = await contract.methods.getOwnerByChallenge(i).call()
        if (userId === owner) {
            var challenge = await contract.methods.challenges(i).call()
            challenge.index = i
            challenges.push(challenge)
        }
    }
    const notApprove = []
    await db.collection('challenges').where('owner', '==', userId).get()
        .then(function (snapshot) {
            snapshot.forEach((res) => {
                var challenge = res.data()
                if (challenge.approved === false) {
                    notApprove.push(challenge)
                }
            })
        })
    dispatch({ type: FETCH_MY_CHALLENGE, payload: challenges, myChallenges: notApprove })
}

export const fetchMyChallenge = (index) => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    var challenge = await contract.methods.challenges(index).call()
    const owner = await contract.methods.getOwnerByChallenge(index).call()
    const acts = []
    if (owner === userId) {
        const actCount = await contract.methods.getActivityCount(index).call()
        for (var i = 0; i < actCount; i++) {
            var act = await contract.methods.getActivityByChallenge(index, i).call()
            act = {
                title: act[0],
                image: `https://ipfs.infura.io/ipfs/${act[1]}`,
                category: act[2],
                times: act[3],
                point: act[4],
                exp: act[5]
            }
            const qrcodes = []
            if (act.category === 'qrcode') {
                for (var j = 0; j < act.times; j++) {
                    var qrcode = await contract.methods.getQRcodeByChallenge(index, i, j).call()
                    qrcodes.push(qrcode)
                }
                act.qrcode = qrcodes
            }
            acts.push(act)
        }
        challenge.activities = acts
        dispatch({ type: FETCH_MY_CHALLENGES, payload: challenge, getData: true })
    } else {
        dispatch({ type: FETCH_MY_CHALLENGES, getData: false })
    }
}