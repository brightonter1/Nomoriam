import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../api/history'
import { connect } from 'react-redux'
import HomepageLayout from './Layout/HomepageLayout'
import firebase from '../api/firebase'
import LoginPage from './Layout/LoginPage'
import SignUpPage from './Layout/SignUpPage'
import { isSignIn } from '../store/actions/authAction'
import MariamSpinner from './Layout/MariamSpinner'
import nChallengePage from './Challenge/nChallengePage'
import nFormChallenge from './Challenge/nFormChallenge'
import nStatusPage from './User/nStatusPage'
import NchallengeDetail from './Challenge/nChallengeDetail'
import nManagePage from './Admin/nManagePage'
import nChallengeShow from './Admin/nChallengeShow'
import NHomePage from './Home/nHomePage'
import NProfilePage from './User/nProfilePage'
import nLeaderboardPage from './Leaderboard/nLeaderboardPage'
const App = (props) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            return props.isSignIn()
        })
    }, [])

    if (props.isSignedIn === true) {
        return (
            <Router history={history}>
                <HomepageLayout>
                    <Switch>
                        <Route path="/" exact component={NHomePage} />
                        <Route path="/challenges" exact component={nChallengePage} />
                        <Route path="/challenges/new" exact component={nFormChallenge} />
                        <Route path="/challenges/:index" exact component={NchallengeDetail} />
                        <Route path="/account/profile" exact component={NProfilePage} />
                        <Route path="/hallofframe" exact component={nLeaderboardPage} />
                        <Route path="/account/status" exact component={nStatusPage} />
                        <Route path="/admin/manage/:index" exact component={nChallengeShow} />
                        <Route path="/account/status/:index/show" exact component={NchallengeDetail} />
                        {props.userInfo.roleAdmin && <Route path="/admin/manage" exact component={nManagePage} />}
                    </Switch>
                </HomepageLayout>
            </Router>
        )
    } else if (props.isSignedIn === false) {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/signup" exact component={SignUpPage} />
                </Switch>
            </Router>
        )
    } else {
        return <MariamSpinner open={true} />
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userInfo: state.auth.userInfo
    }
}

export default connect(mapStateToProps, { isSignIn })(App)