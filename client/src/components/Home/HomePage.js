import React from 'react'
import { connect } from 'react-redux'
import { fetchActivityByOwner } from '../../store/actions/authAction'
import ActivityBar from './ActivityBar'


class HomePage extends React.Component {


    componentWillReceiveProps(nextProps){
        this.props.fetchActivityByOwner(nextProps.userId)
    }

    render() {
        return (
            <div className="ui container" style={{ paddingTop: 80 }}>
                {
                    this.props.myChallenge ? 
                    <ActivityBar myChallenge={this.props.myChallenge} />
                    : 
                    <p>Loading...</p>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        myChallenge: state.auth.myChallenge
    }
}

export default connect(mapStateToProps, { fetchActivityByOwner })(HomePage)