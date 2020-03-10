import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../api/history'
import { connect } from 'react-redux'
import HomepageLayout from './Layout/HomepageLayout'
import ChallengePage from './Challenge/ChallengePage'
import HomePage from './Home/HomePage'
import firebase from '../api/firebase'
import LoginPage from './Layout/LoginPage'
import SignUpPage from './Layout/SignUpPage'
import { isSignIn } from '../store/actions/authAction'
import MariamSpinner from './Layout/MariamSpinner'
import ChallengeForm from './Challenge/ChallengeForm'
import ProfilePage from './User/ProfilePage'
import StatusPage from './User/StatusPage'
import ManagePage from './Admin/ManagePage'
import ChallengeShow from './Admin/ChallengeShow'
import ChallengeDetail from './Challenge/ChallengeDetail'
import ShowDetail from './User/ShowDetail'
import Test from '../components/Home/Test'

const App = (props) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            return props.isSignIn()
        })
    }, [])

    // return (
    //     <Test />
    // )

    if (props.isSignedIn === true) {
        return (
            <Router history={history}>
                <HomepageLayout>
                    <div>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/challenges" exact component={ChallengePage} />
                            <Route path="/challenges/new" exact component={ChallengeForm} />
                            <Route path="/challenges/:index" exact component={ChallengeDetail} />
                            <Route path="/account/profile" exact component={ProfilePage} />
                            <Route path="/account/status" exact component={StatusPage} />
                            <Route path="/admin/manage/:index" exact component={ChallengeShow} />
                            <Route path="/account/status/:index/show" exact component={ShowDetail} />
                            
                            {props.userInfo.roleAdmin && <Route path="/admin/manage" exact component={ManagePage} />}
                        </Switch>
                    </div>
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
    console.log(state)
    return {
        isSignedIn: state.auth.isSignedIn,
        userInfo: state.auth.userInfo
    }
}

export default connect(mapStateToProps, { isSignIn })(App)