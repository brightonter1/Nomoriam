import React from 'react'
import { connect } from 'react-redux'
import { fetchActivityByOwner } from '../../store/actions/authAction'
import ActivityBar from './ActivityBar'
import Feed from './Feed'
import { fetchFeeds } from '../../store/actions/feedAction'

class HomePage extends React.Component {

    componentDidMount() {
        this.props.fetchFeeds()
        this.timer = setInterval(() => {
            this.props.fetchActivityByOwner(this.props.userId)
        }, 5000);
    }

    componentWillReceiveProps(prevProps, nextProps) {
        if (nextProps.myChallenge) {
            clearInterval(this.timer);
            this.timer = null
        }
    }

    render() {
        return (
            <div className="ui container" style={{ paddingTop: 80 }}>
                {
                    this.props.myChallenge ?
                        <ActivityBar myChallenge={this.props.myChallenge} userId={this.props.userId} />
                        :
                        <p>Loading...</p>
                }
                {
                    this.props.posts && <Feed posts={this.props.posts} />
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        myChallenge: state.auth.myChallenge,
        posts: state.feed.posts
    }
}

export default connect(mapStateToProps, { fetchActivityByOwner, fetchFeeds })(HomePage)