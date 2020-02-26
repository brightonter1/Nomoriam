import {
    FETCH_FFEDS
} from './type'
import firebase from '../../api/firebase'
import history from '../../api/history'
const db = firebase.firestore()
const storageRef = firebase.storage().ref()

export const fetchFeeds = () => async dispatch => {
    var posts = []
    getPosts()
    
    async function getPosts() {
        db.collection('posts').get().then((snapshot) => {
            snapshot.forEach((res) => {
                var post = res.data()
                db.collection('users').doc(post.userId).get().then((profile) => {
                    var user = profile.data()
                    post.displayname = user.displayname
                    post.userPhoto = user.photo
                })
                storageRef.child(post.image).getDownloadURL().then((url) => {
                    post.image = url
                })
                posts.push(post)
            })
        })
        setTimeout(() => {
            dispatch({ type: FETCH_FFEDS, payload: posts, isFetch: true })
        }, 3000)
    }

}