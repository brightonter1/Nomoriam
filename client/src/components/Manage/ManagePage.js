import React from 'react'
import { Header } from 'semantic-ui-react'
import ChallengeList from './ChallengeList'
import { connect } from 'react-redux'
import { fetchChallengesByApprove, approveChallenge } from '../../store/actions/challengeAction'

class ManagePage extends React.Component {

    componentDidMount() {
        this.props.fetchChallengesByApprove()
    }

    onSubmit = (challenge, activities) => {
        this.props.approveChallenge(challenge, activities)
    }

    constructor(props) {
        super(props)
        this.state = {
            percent: 0
        }
    }

    render() {
        return (
            <div className="ui container" style={{ paddingTop: 90 }}>
                <Header as="h2" style={{ paddingBottom: 30 }}>ManagerPage</Header>
                {
                    this.props.isFetch ? <ChallengeList
                        challenges={this.props.challengesApprove}
                        onSubmit={this.onSubmit}
                        isLoading={this.props.isApprove}
                    /> : null
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    var isApprove = state.challenge.isCompleted
    if (isApprove){
        isApprove = false
    }else{
        isApprove = true
    }

    return {
        challengesApprove: state.challenge.challengesApprove,
        isFetch: state.challenge.isFetchApprove,
        txHash: state.challenge.txHash,
        isApprove: isApprove
    }
}

export default connect(mapStateToProps, { fetchChallengesByApprove, approveChallenge })(ManagePage)