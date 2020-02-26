import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchFeeds } from '../../store/actions/feedAction'
import PostShow from './PostShow'

const HomePage = props => {

    const { posts, userId } = props



    useEffect(() => {
        props.fetchFeeds()
    }, [posts])


    return (
        <div className="ui container" style={{ paddingTop: 80 }}>
            {
                posts ? <PostShow posts={posts} userId={userId} /> : "Loading..."
            }
        </div>
    )

}
const mapStateToProps = state => {
    return {
        posts: state.feed.posts,
        userId: state.auth.userId,
    }
}

export default connect(mapStateToProps, { fetchFeeds })(HomePage)