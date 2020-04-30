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
    FETCH_MY_CHALLENGES,
    FETCH_POST,
    FETCH_MY_CHALLENGES_CLEAN,
    FETCH_JOINED,
    CLEAR_JOINED,
    FETCH_PLAYERS,
    CLEAR_PLAYERS
} from './type'

import moment from 'moment'
import firebase from '../../api/firebase'
import ipfs from '../../api/ipfs'
import history from '../../api/history'
import _ from 'lodash'
import { contract, createTransaction, createAsyncTransaction } from '../../contracts/config'
import { Medal } from '../../asset/archievement/Medal'
const db = firebase.firestore()
const storageRef = firebase.storage().ref()

export const CreateChallenge = (challenge) => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    let time = moment().format().split('T')[1].split('+')[0]
    var timestamp = moment().format("DD-MM-YYYY") + " " + time

    await ipfs.add(challenge.image.image, async (error, result) => {
        const image = result[0].hash
        db.collection('challenges').doc().set({
            owner: userId,
            title: challenge.name,
            desc: challenge.desc,
            goal: challenge.goal,
            image: 'https://ipfs.infura.io/ipfs/' + image,
            create_time: challenge.create_time,
            end_time: challenge.end_time,
            activities: challenge.activities,
            timestamp: timestamp,
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
            data.documentId = res.id
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
        challenge.desc = challenge.desc + ">,<" + challenge.goal
        challenge.create_time = challenge.create_time + ">time<" + challenge.timestamp
        console.log("Writing.. Challenge to Blockchain")
        const index = await contract.methods.getChallengeCount().call()
        const data = contract.methods.createChallenge(
            challenge.title, challenge.desc, challenge.image,
            challenge.create_time, challenge.end_time, challenge.owner
        ).encodeABI()
        const txHash = await createAsyncTransaction(data)

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
        if (act.location === 'map') {
            act.category = act.category + ">location<" + act.location + ">extra<" + act.extra + ">latlng<" + act.latlng
        } else {
            act.category = act.category + ">location<" + act.location + ">extra<" + "none" + ">latlng<" + "none"
        }
        var image = act.category === 'post' ? 'QmTVAbNEUe3mtLQibRcWB2drchJgiWxQCaKmaZJB43WMAs' : 'QmRPj4nmcSUyRKTK5KSP73t7Lkj1Tnmaqgkt5pFHQZTPkf'
        const value = contract.methods.addActivity(
            Number(index), act.title, image, act.category, Number(act.times)
        ).encodeABI()
        const result = await createAsyncTransaction(value)
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
        const result = await createAsyncTransaction(value)
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
        const owner = await contract.methods.getOwnerByChallenge(index).call()
        await db.collection('users').doc(owner).get().then(function (res) {
            var data = res.data()
            challenge.owner = data.displayname
        }).catch(() => {
        })
        challenge.joined = joined
        challenge.playerCount = playerCount
        challenge.actCount = actCount
        challenges.push(challenge)
    }
    dispatch({ type: FETCH_CHALLENGES, payload: challenges })
}

export const fetchChallenge = index => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    var qrcodes = []
    const challenge = await contract.methods.challenges(index).call()
    const owner = await contract.methods.getOwnerByChallenge(index).call()
    db.collection('users').doc(owner).get().then((res) => {
        var data = res.data()
        challenge.owner = data.displayname
    }).catch(() => { })
    const actCount = await contract.methods.getActivityCount(index).call()
    const playerCount = await contract.methods.getPlayerCountByChallenge(index).call()
    const joined = await contract.methods.getJoinedChallenge(index, userId).call()
    const acts = []
    var players = []
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

        if (data.category.split('>location<')[0] === "qrcode") {
            for (var j = 0; j < data.times; j++) {
                const qr = await contract.methods.getQRcodeByChallenge(index, count, j).call()
                qrcodes.push(qr)
            }
            data.qrcode = qrcodes;
        }

        acts.push(data)
    }

    var ranks = []
    await db.collection('rank').get().then((snapshot) => {
        snapshot.forEach((res) => {
            var dataRank = res.data()
            ranks.push(dataRank)
        })
    })

    for (var i = 0; i < playerCount; i++) {
        var uid = await contract.methods.getPlayerUID(index, i).call()
        var player = await contract.methods.getPlayerByChallenge(index, uid).call()
        player = {
            uid: player[0],
            point: player[1]
        }
        await db.collection('users').doc(player.uid).get()
            .then(function (res) {
                var www = res.data()
                player.displayname = www.displayname
                player.photoURL = www.photoURL
            }).catch(() => { })

        const data = await contract.methods.getPlayer(player.uid).call()
        player.exp = data[2]

        for (var k = 0; k < ranks.length; k++) {
            if (ranks[k].rankStart <= player.exp && player.exp <= ranks[k].rankExp) {
                player.rankName = ranks[k].rankName
                player.rankExp = ranks[k].rankExp
                player.rankImage = ranks[k].rankImage
                player.rankStart = ranks[k].rankStart
            }
        }
        players.push(player)
    }

    players = _.orderBy(players, ['point'], ['desc'])
    _.forEach(players, function (player, i) {
        player.rankNumber = i + 1
    })

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
                if (act.category.split('>location<')[0] === "qrcode") {
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
            const userBC = await contract.methods.getPlayer(userId).call()
            challenge.userBC = {
                main_POINT: userBC[1],
                main_EXP: userBC[2],
                challenge_COUNT: userBC[3]
            }

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
    let time = moment().format().split('T')[1].split('+')[0]
    var timestamp = moment().format("DD-MM-YYYY") + " " + time
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
            var actCount = await contract.methods.getActivityCount(i).call()
            challenge.actCount = actCount
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
                    challenge.documentId = res.id
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
    const players = []
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


            const playerCount = await contract.methods.getPlayerCountByChallenge(index).call()
            for (var p = 0; p < playerCount; p++) {
                var uid = await contract.methods.getPlayerUID(index, p).call()
                var player = await contract.methods.getPlayerByChallenge(index, uid).call()
                player = {
                    uid: player[0],
                    point: player[1]
                }
                db.collection('users').doc(player.uid).get()
                    .then((res) => {
                        var data = res.data()
                        player.displayname = data.displayname
                        player.photoURL = data.photoURL
                    })
                players.push(player)
            }
        }
        player = _.sortBy(player, function (p) {
            return p.point
        }).reverse()
        challenge.players = players
        challenge.activities = acts
        dispatch({ type: FETCH_MY_CHALLENGES, payload: challenge, getData: true })
    } else {
        dispatch({ type: FETCH_MY_CHALLENGES, getData: false })
    }
}

export const fetchActivities = () => async dispatch => {
    var posts = []
    getPost()
    async function getPost() {
        await db.collection('posts').get()
            .then(function (snapShot) {
                snapShot.forEach(async (res) => {
                    var post = res.data()
                    posts.push(post)
                })
            })
        for (var i = 0; i < posts.length; i++) {
            await storageRef.child(posts[i].image).getDownloadURL()
                .then(function (url) {
                    posts[i].image = url
                })
            await db.collection('users').doc(posts[i].owner).get()
                .then(function (res) {
                    var profile = res.data()
                    posts[i].displayname = profile.displayname
                    posts[i].photoURL = profile.photoURL
                })
        }
        await ShowTime()

    }
    async function ShowTime() {

        posts = _.sortBy(posts, function (o) {
            return new Date(o.timestamp)
        }).reverse();

        dispatch({ type: FETCH_POST, payload: posts })
    }
}

export const fetchMyChallengeClean = () => dispatch => {
    dispatch({ type: FETCH_MY_CHALLENGES_CLEAN })
}

export const fetchJoinedChallenge = () => async dispatch => {
    var userId = firebase.auth().currentUser.uid
    var challenges = []
    const count = await contract.methods.getChallengeCount().call()
    for (var i = 0; i < count; i++) {
        const joined = await contract.methods.getJoinedChallenge(i, userId)
        if (joined) {
            var challenge = await contract.methods.challenges(i).call()
            const actCount = await contract.methods.getActivityCount(i).call()
            const playerCount = await contract.methods.getPlayerCountByChallenge(i).call()
            const owner = await contract.methods.getOwnerByChallenge(i).call()
            await db.collection('users').doc(owner).get().then(function (res) {
                const data = res.data()
                challenge.owner = data.displayname
            }).catch(() => {

            })
            challenge.playerCount = playerCount
            challenge.actCount = actCount
            challenge.index = i
            challenges.push(challenge)

        }
    }

    dispatch({ type: FETCH_JOINED, payload: challenges })
}

export const clearJoinedChallenge = () => dispatch => {
    dispatch({ type: CLEAR_JOINED })
}

export const fetchPlayers = () => async dispatch => {
    var players = []
    var ranks = []

    await db.collection('users').get().then(function (snapShot) {
        snapShot.forEach(function (res) {
            var player = res.data()
            player.uid = res.id
            players.push(player)
        })
    })

    await db.collection('rank').get().then((snapshot) => {
        snapshot.forEach((res) => {
            var dataRank = res.data()
            ranks.push(dataRank)
        })
    })

    for (var i = 0; i < players.length; i++) {
        const data = await contract.methods.getPlayer(players[i].uid).call()
        players[i].point = Number(data[1])
        players[i].exp = Number(data[2])
        players[i].challengeCount = data[3]

        for (var k = 0; k < ranks.length; k++) {
            if (ranks[k].rankStart <= players[i].exp && players[i].exp <= ranks[k].rankExp) {
                players[i].rankName = ranks[k].rankName
                players[i].rankExp = ranks[k].rankExp
                players[i].rankImage = ranks[k].rankImage
                players[i].rankStart = ranks[k].rankStart
            }
        }
    }
    players = _.orderBy(players, ['exp'], ['desc'])
    _.forEach(players, function (player, i) {
        player.rankNumber = i + 1
    })


    dispatch({ type: FETCH_PLAYERS, payload: players })
}

export const clearPlayers = () => dispatch => {
    dispatch({ type: CLEAR_PLAYERS })
}