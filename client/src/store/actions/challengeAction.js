import {
    CREATE_CHALLENGE,
    FETCH_CHALLENGES_APPROVE,
    FETCH_CHALLENGES_NOTFOUND,
    APPROVE_CHALLENGES,
    FETCH_CHALLENGES,
    FETCH_CHALLENGE,
    JOIN_CHALLENGE
} from './type'

import firebase from '../../api/firebase'
import { contract, createTransaction } from '../../contracts/config'
import history from '../../api/history'

const db = firebase.firestore()

export const createChallenge = (challenge, activities, userId) => async dispatch => {
    db.collection('challenges').doc().set({
        name: challenge.name,
        desc: challenge.desc,
        image: challenge.image,
        start_time: challenge.create_time,
        end_time: challenge.end_time,
        activities: activities,
        owner: userId,
        approve: false,
        finish: false
    })
    setTimeout(() => {
        dispatch({ type: CREATE_CHALLENGE })
        history.push('/')
    }, 5000)
}

export const fetchChallengesByApprove = () => async dispatch => {
    var challenges = []
    db.collection('challenges').where('approve', '==', false).get().then((snapShot) => {
        snapShot.forEach((res) => {
            const data = res.data()
            challenges.push(data)
        })
        if (challenges.length === 0) {
            dispatch({ type: FETCH_CHALLENGES_NOTFOUND, payload: false })
        } else {
            dispatch({ type: FETCH_CHALLENGES_APPROVE, payload: challenges })
        }
    })
}


export const approveChallenge = (challenge, activities) => async dispatch => {
    var timer = 15000

    createChallenge()

    async function createChallenge() {
        console.log("Writing.. Challenge to Blockchain")
        const index = await contract.methods.getChallengeCount().call()
        const data = contract.methods.createChallenge(
            challenge.name, challenge.desc, challenge.image, challenge.start_time, challenge.end_time, challenge.owner
        ).encodeABI()
        const txHash = await createTransaction(data)

        console.log("Challenge Count ", index)
        console.log(txHash)

        setTimeout(() => {
            addActivities(index, txHash)
        }, timer)
    }

    async function addActivities(index, txHash) {
        console.log("Writing.. Activitites from Challenge to Blockchain")
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i]
            const result = await transaction(act, index)
            console.log(result)
        }
        console.log('*** Finished ***')
        updateStatus(txHash)
    }

    async function transaction(act, index) {
        const value = contract.methods.addActivity(
            Number(index), act.title, act.image, act.type, Number(act.times), "", "", act.location
        ).encodeABI()
        const result = await createTransaction(value)
        return result
    }

    async function updateStatus(txHash) {
        console.log("Update status to firebase....")
        var batch = db.batch()
        const doc = await db.collection('challenges').where('name', '==', challenge.name).get().then((res) => {
            return res.docs[0].id
        })
        var challengeRef = db.collection('challenges').doc(doc)
        batch.update(challengeRef, { "approve": true, "signTransaction": txHash })
        await batch.commit().then(() => {
            console.log("Update status approve completed")
            dispatch({ type: APPROVE_CHALLENGES, payload: txHash, isComplete: true })
        })
    }
}

export const fetchChallenges = (userId) => async dispatch => {
    var challenges = []

    fetchFromNetwork()

    async function fetchFromNetwork() {
        const size = await contract.methods.getChallengeCount().call()
        for (var i = 0; i < size; i++) {
            var data = await contract.methods.challenges(i).call()
            await db.collection('challenges').where('name', '==', data.title).get().then((snap) => {
                snap.forEach((res) => {
                    var { owner } = res.data()
                    data.owner = owner
                })
            })
            await db.collection('users').doc(data.owner).get().then((res) => {
                var { displayname } = res.data()
                data.displayName = displayname
            })
            if (userId) {
                const result = await contract.methods.getJoinedChallenge(i, userId).call()
                data.joined = result
            }
            challenges.push(data)
        }
        if (challenges.length === 0) {
            dispatch({ type: FETCH_CHALLENGES, payload: challenges, isComplete: false })
        } else {
            dispatch({ type: FETCH_CHALLENGES, payload: challenges, isComplete: true })
        }
    }
}

export const fetchChallenge = (index, userId) => async dispatch => {
    var players = []
    var box = []
    const challenge = await contract.methods.challenges(index).call()
    const playerCount = await contract.methods.getPlayerCountByChallenge(index).call()

    if (userId) {
        const result = await contract.methods.getJoinedChallenge(index, userId).call()
        challenge.joined = result
        for (var d = 0; d < playerCount; d++) {
            var uid = await contract.methods.getPlayerUID(index, d).call()
            await contract.methods.getPlayerByChallenge(index, uid).call().then((res) => {
                db.collection('users').doc(res[0]).get().then((snap) => {
                    const { displayname, photo } = snap.data()
                    var player = {
                        displayName: displayname,
                        photo,
                        userId: res[0],
                        point: res[1]
                    }
                    players.push(player)
                })
            })
        }
        challenge.players = players
    }



    const actCount = await contract.methods.getActivityCount(index).call()
    for (var i = 0; i < actCount; i++) {
        var data = await contract.methods.getActivityByChallenge(index, i).call()
        var qrcode = []
        var activity = {
            title: data[0],
            image: data[1],
            category: data[2],
            times: data[3],
            point: data[4],
            exp: data[5],
            location: data[6]
        }
        if (activity.category === 'question') {
            var act = await contract.methods.getQuestionByChallenge(index, i).call()
            activity.question = act[0]
            activity.answer = act[1]
        }
        if (activity.category === 'qrcode') {
            for (var j = 0; j < activity.times; j++) {
                var hash = await contract.methods.getQRcodeByChallenge(index, i, j).call()
                qrcode.push(hash)
            }
            activity.qrcode = qrcode
        }
        box.push(activity)
    }
    challenge.activities = box
    dispatch({ type: FETCH_CHALLENGE, payload: challenge, index })
}

export const joinChallenge = (userId, index) => async dispatch => {
    joinChallenge()
    async function joinChallenge() {
        console.log("Writing.. Player to Blockchain")
        const data = contract.methods.joinChallenge(
            index, userId
        ).encodeABI()
        const txHash = await createTransaction(data)
        console.log(txHash)
        dispatch({ type: JOIN_CHALLENGE, isJoined: true })
    }

}