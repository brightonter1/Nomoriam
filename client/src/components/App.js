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

    // return (
    //     <Router history={history}>
    //         <HomepageLayoutMockup>
    //             <Switch>
    //                 <Route path="/" exact component={HomeMockup} />
    //                 <Route path="/challenges" exact component={ChallnegeMockup} />
    //                 {/* <Route path="/challenges/:index" exact component={ChallengeDetailMock} /> */}
    //                 <Route path="/challenges/new" exact component={FormChallenge} />
    //                 <Route path="/account/profile" exact component={ProfileMockup} />
    //                 <Route path="/account/status" exact component={StatusMockup} />
    //                 <Route path="/hallofframe" exact component={LeaderBoardMock} />
    //             </Switch>
    //         </HomepageLayoutMockup>
    //     </Router>
    // )

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

    // if (props.isSignedIn === true) {
    //     return (
    //         <Router history={history}>
    //             <HomepageLayout>
    //                 <Switch>
    //                     <Route path="/" exact component={HomePage} />
    //                     <Route path="/challenges" exact component={ChallengePage} />
    //                     <Route path="/challenges/new" exact component={ChallengeForm} />
    //                     <Route path="/challenges/:index" exact component={ChallengeDetail} />
    //                     <Route path="/account/profile" exact component={ProfilePage} />
    //                     <Route path="/account/status" exact component={StatusPage} />
    //                     <Route path="/admin/manage/:index" exact component={ChallengeShow} />
    //                     <Route path="/account/status/:index/show" exact component={ShowDetail} />

    //                     {props.userInfo.roleAdmin && <Route path="/admin/manage" exact component={ManagePage} />}
    //                 </Switch>
    //             </HomepageLayout>
    //         </Router>
    //     )
    // } else if (props.isSignedIn === false) {
    //     return (
    //         <Router history={history}>
    //             <Switch>
    //                 <Route path="/" exact component={LoginPage} />
    //                 <Route path="/signup" exact component={SignUpPage} />
    //             </Switch>
    //         </Router>
    //     )
    // } else {
    //     return <MariamSpinner open={true} />
    // }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userInfo: state.auth.userInfo
    }
}

export default connect(mapStateToProps, { isSignIn })(App)