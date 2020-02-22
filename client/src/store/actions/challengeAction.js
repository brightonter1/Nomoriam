import {
    CREATE_CHALLENGE,
    FETCH_CHALLENGES_APPROVE,
    FETCH_CHALLENGES_NOTFOUND,
    APPROVE_CHALLENGES
} from './type'

import firebase from '../../api/firebase'
import _ from 'lodash'
import { contract, createTransaction } from '../../contracts/config'
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

